package com.subtitlefind.web.controller;

import com.subtitlefind.service.SubtitleFinderService;
import com.subtitlefind.web.dto.ApiResponse;
import com.subtitlefind.web.dto.DirectoryInfo;
import com.subtitlefind.web.dto.SubtitleSearchRequest;
import com.subtitlefind.web.service.FileSystemService;
import com.subtitlefind.web.service.LogWebSocketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

/**
 * 字幕查找API控制器
 */
@RestController
@RequestMapping("/api")
public class SubtitleApiController {

    private static final Logger logger = LoggerFactory.getLogger(SubtitleApiController.class);

    @Autowired
    private LogWebSocketService logWebSocketService;

    @Autowired
    private FileSystemService fileSystemService;

    @PostMapping("/search-subtitles")
    public ApiResponse<String> searchSubtitles(@RequestBody SubtitleSearchRequest request) {
        try {
            if (request.getDirectoryPath() == null || request.getDirectoryPath().trim().isEmpty()) {
                return ApiResponse.error("目录路径不能为空");
            }

            String taskId = UUID.randomUUID().toString();
            logger.info("开始字幕搜索任务，任务ID: {}, 目录: {}, 源: {}, 并发: {}",
                taskId, request.getDirectoryPath(), request.getSubtitleSources(), request.getConcurrency());

            CompletableFuture.runAsync(() -> executeSubtitleSearch(taskId, request));

            return ApiResponse.success("任务已开始执行", taskId);

        } catch (Exception e) {
            logger.error("启动字幕搜索任务失败", e);
            return ApiResponse.error("启动任务失败: " + e.getMessage());
        }
    }

    @GetMapping("/file-system/roots")
    public ApiResponse<List<DirectoryInfo>> getRootDirectories() {
        try {
            List<DirectoryInfo> roots = fileSystemService.getRootDirectories();
            return ApiResponse.success("获取根目录成功", roots);
        } catch (Exception e) {
            logger.error("获取根目录失败", e);
            return ApiResponse.error("获取根目录失败: " + e.getMessage());
        }
    }

    @GetMapping("/file-system/directory")
    public ApiResponse<DirectoryInfo> getDirectoryContents(@RequestParam("path") String path) {
        try {
            if (path == null || path.trim().isEmpty()) {
                return ApiResponse.error("目录路径不能为空");
            }
            DirectoryInfo directoryInfo = fileSystemService.getDirectoryContents(path.trim());
            return ApiResponse.success("获取目录内容成功", directoryInfo);
        } catch (Exception e) {
            logger.error("获取目录内容失败: " + path, e);
            return ApiResponse.error("获取目录内容失败: " + e.getMessage());
        }
    }

    @GetMapping("/file-system/validate")
    public ApiResponse<Boolean> validateDirectory(@RequestParam("path") String path) {
        try {
            boolean isValid = fileSystemService.isValidDirectory(path);
            return ApiResponse.success("目录验证完成", isValid);
        } catch (Exception e) {
            logger.error("验证目录失败: " + path, e);
            return ApiResponse.error("验证目录失败: " + e.getMessage());
        }
    }

    @GetMapping("/file-system/home")
    public ApiResponse<String> getUserHomeDirectory() {
        try {
            String homeDir = fileSystemService.getUserHomeDirectory();
            return ApiResponse.success("获取用户主目录成功", homeDir);
        } catch (Exception e) {
            logger.error("获取用户主目录失败", e);
            return ApiResponse.error("获取用户主目录失败: " + e.getMessage());
        }
    }

    @GetMapping("/health")
    public ApiResponse<String> health() {
        return ApiResponse.success("服务正常运行");
    }

    /**
     * 执行字幕搜索任务
     */
    private void executeSubtitleSearch(String taskId, SubtitleSearchRequest request) {
        try {
            logWebSocketService.sendLog(taskId, "INFO", "开始字幕刮削任务...");
            logWebSocketService.sendLog(taskId, "INFO", "目录: " + request.getDirectoryPath());
            logWebSocketService.sendLog(taskId, "INFO", "字幕源: " +
                (request.getSubtitleSources() != null && !request.getSubtitleSources().isEmpty()
                    ? String.join(", ", request.getSubtitleSources()) : "subtitlecat"));

            SubtitleFinderService finder = new SubtitleFinderService();

            // 设置配置
            if (request.getSubtitleSources() != null && !request.getSubtitleSources().isEmpty()) {
                finder.setSubtitleSources(request.getSubtitleSources());
            }
            if (request.getConcurrency() > 0) {
                finder.setConcurrency(request.getConcurrency());
            }
            if (request.getRateLimitMs() >= 0) {
                finder.setRateLimitMs(request.getRateLimitMs());
            }
            if (request.getMatchThreshold() > 0) {
                finder.setMatchThreshold(request.getMatchThreshold());
            }
            if (request.getExcludePatterns() != null) {
                finder.setExcludePatterns(request.getExcludePatterns());
            }

            finder.setLogCallback((level, message) ->
                logWebSocketService.sendLog(taskId, level, message));

            finder.findSubtitlesForDirectory(request.getDirectoryPath());

            logWebSocketService.sendLog(taskId, "INFO", "任务执行完成！");
            logWebSocketService.sendTaskComplete(taskId);

            finder.shutdown();

        } catch (Exception e) {
            logger.error("执行失败, taskId: " + taskId, e);
            logWebSocketService.sendLog(taskId, "ERROR", "任务失败: " + e.getMessage());
            logWebSocketService.sendTaskComplete(taskId);
        }
    }
}
