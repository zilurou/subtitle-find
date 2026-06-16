package com.subtitlefind.service;

import com.subtitlefind.model.SubtitleInfo;
import com.subtitlefind.service.source.SubtitleSource;
import com.subtitlefind.service.source.SubtitleSourceFactory;
import com.subtitlefind.web.service.LogWebSocketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.BiConsumer;

/**
 * 字幕查找主服务 - 多源并发版
 */
@Service
public class SubtitleFinderService {

    private static final Logger logger = LoggerFactory.getLogger(SubtitleFinderService.class);

    private final VideoFileScanner videoFileScanner;
    private final SubtitleDownloadService subtitleDownloader;
    private final SubtitleSourceFactory sourceFactory;

    @Autowired(required = false)
    @Lazy
    private LogWebSocketService logWebSocketService;

    private BiConsumer<String, String> logCallback;

    // 可配置参数
    private int concurrency = 5;
    private int rateLimitMs = 500;
    private double matchThreshold = 0.80;
    private List<String> subtitleSources = Arrays.asList("subtitlecat");
    private List<String> excludePatterns = new ArrayList<>();

    public SubtitleFinderService() {
        this.videoFileScanner = new VideoFileScanner();
        this.subtitleDownloader = new SubtitleDownloadService();
        this.sourceFactory = new SubtitleSourceFactory();
    }

    public void setLogCallback(BiConsumer<String, String> callback) {
        this.logCallback = callback;
    }

    public void setConcurrency(int concurrency) { this.concurrency = Math.max(1, Math.min(concurrency, 20)); }
    public void setRateLimitMs(int ms) { this.rateLimitMs = Math.max(0, ms); }
    public void setMatchThreshold(double t) { this.matchThreshold = Math.max(0.6, Math.min(t, 0.99)); }
    public void setSubtitleSources(List<String> sources) { this.subtitleSources = sources; }
    public void setExcludePatterns(List<String> patterns) { this.excludePatterns = patterns; }

    private void log(String level, String message) {
        if (logCallback != null) logCallback.accept(level, message);
        switch (level.toUpperCase()) {
            case "INFO" -> logger.info(message);
            case "WARN" -> logger.warn(message);
            case "ERROR" -> logger.error(message);
            case "DEBUG" -> logger.debug(message);
            default -> logger.info(message);
        }
    }

    /**
     * 为指定目录下的所有视频文件查找并下载字幕（并发版）
     */
    public void findSubtitlesForDirectory(String directoryPath) {
        log("INFO", "=== 开始字幕刮削任务 ===");
        log("INFO", "目录: " + directoryPath);
        log("INFO", "字幕源: " + String.join(", ", subtitleSources));
        log("INFO", "并发数: " + concurrency + " | 限速: " + rateLimitMs + "ms | 匹配阈值: " + matchThreshold);

        if (excludePatterns != null && !excludePatterns.isEmpty()) {
            log("INFO", "排除正则: " + excludePatterns);
        }

        try {
            List<VideoFileScanner.VideoFileInfo> videoFiles = videoFileScanner.scanVideoFiles(directoryPath);
            if (videoFiles.isEmpty()) {
                log("WARN", "未找到任何视频文件");
                return;
            }

            // 预处理：排除不需要处理的视频文件
            List<VideoFileScanner.VideoFileInfo> toProcess = new ArrayList<>();
            for (VideoFileScanner.VideoFileInfo vf : videoFiles) {
                if (FuzzyMatcher.shouldExclude(vf.getFileNameWithoutExtension(), excludePatterns)) {
                    log("INFO", "排除视频（命中排除规则）: " + vf.getFileName());
                    continue;
                }
                toProcess.add(vf);
            }

            if (toProcess.isEmpty()) {
                log("WARN", "所有视频文件都被排除规则过滤");
                return;
            }

            log("INFO", "找到 " + videoFiles.size() + " 个视频文件，" + toProcess.size() + " 个待处理");

            AtomicInteger processedCount = new AtomicInteger(0);
            AtomicInteger successCount = new AtomicInteger(0);
            int total = toProcess.size();

            ExecutorService executor = Executors.newFixedThreadPool(concurrency);
            List<Future<?>> futures = new ArrayList<>();

            for (VideoFileScanner.VideoFileInfo videoFile : toProcess) {
                futures.add(executor.submit(() -> {
                    int current = processedCount.incrementAndGet();
                    log("INFO", String.format("处理 (%d/%d): %s", current, total, videoFile.getFileName()));

                    try {
                        boolean ok = processVideoFile(videoFile);
                        if (ok) {
                            successCount.incrementAndGet();
                            log("INFO", "OK " + videoFile.getFileName());
                        } else {
                            log("WARN", "FAIL " + videoFile.getFileName());
                        }
                    } catch (Exception e) {
                        log("ERROR", "处理异常 " + videoFile.getFileName() + ": " + e.getMessage());
                    }

                    // 限速
                    if (rateLimitMs > 0) {
                        try { Thread.sleep(rateLimitMs); } catch (InterruptedException ignored) {}
                    }
                }));
            }

            // 等待全部完成
            for (Future<?> f : futures) {
                try { f.get(10, TimeUnit.MINUTES); } catch (Exception ignored) {}
            }

            executor.shutdown();
            try { executor.awaitTermination(30, TimeUnit.SECONDS); } catch (InterruptedException ignored) {}

            log("INFO", String.format("=== 任务完成 === 总: %d | 成功: %d | 失败: %d",
                total, successCount.get(), total - successCount.get()));

        } catch (Exception e) {
            log("ERROR", "查找字幕异常: " + e.getMessage());
        } finally {
            sourceFactory.closeAll();
        }
    }

    private boolean processVideoFile(VideoFileScanner.VideoFileInfo videoFile) {
        try {
            String videoFileName = videoFile.getFileNameWithoutExtension();
            String directory = videoFile.getDirectory();

            if (subtitleDownloader.subtitleExists(videoFileName, directory)) {
                log("INFO", "已有字幕，跳过: " + videoFileName);
                return true;
            }

            String cleanedName = VideoFileScanner.getCleanedFileNameForSearch(videoFileName);
            if (!cleanedName.equals(videoFileName)) {
                log("DEBUG", "清理文件名: " + videoFileName + " -> " + cleanedName);
            }

            // 获取字幕源实例
            List<SubtitleSource> sources = sourceFactory.getSources(subtitleSources);

            // 按顺序尝试每个字幕源
            for (SubtitleSource source : sources) {
                try {
                    List<SubtitleInfo> subtitles = source.search(cleanedName);
                    if (subtitles.isEmpty()) {
                        log("DEBUG", "[" + source.getName() + "] 无结果: " + cleanedName);
                        continue;
                    }

                    log("DEBUG", "[" + source.getName() + "] 找到 " + subtitles.size() + " 个候选");

                    // 过滤：模糊匹配
                    List<SubtitleInfo> matched = new ArrayList<>();
                    for (SubtitleInfo sub : subtitles) {
                        if (FuzzyMatcher.isFuzzyMatch(sub.getTitle(), cleanedName, matchThreshold)) {
                            matched.add(sub);
                        }
                    }
                    log("DEBUG", "[" + source.getName() + "] 模糊匹配后: " + matched.size() + " 个候选");

                    // 尝试下载
                    for (SubtitleInfo sub : matched) {
                        try {
                            SubtitleInfo withUrl = source.getDownloadUrl(sub);
                            if (withUrl.getDownloadUrl() != null && !withUrl.getDownloadUrl().isEmpty()) {
                                boolean ok = subtitleDownloader.downloadSubtitle(withUrl, videoFileName, directory);
                                if (ok) {
                                    log("INFO", "[" + source.getName() + "] 下载成功 " + sub.getTitle());
                                    return true;
                                }
                            }
                            Thread.sleep(300); // 小延迟
                        } catch (Exception e) {
                            log("DEBUG", "[" + source.getName() + "] 下载尝试失败: " + e.getMessage());
                        }
                    }
                } catch (Exception e) {
                    log("WARN", "[" + source.getName() + "] 源异常: " + e.getMessage());
                }
            }

            log("WARN", "所有源都未找到字幕: " + videoFileName);
            return false;

        } catch (Exception e) {
            log("ERROR", "处理失败: " + e.getMessage());
            return false;
        }
    }

    public void shutdown() {
        sourceFactory.closeAll();
    }
}
