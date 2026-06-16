package com.subtitlefind.web.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * 字幕查找请求DTO
 */
public class SubtitleSearchRequest {
    private String directoryPath;
    private boolean recursive = true;

    // 新增: 字幕源选择
    private List<String> subtitleSources = new ArrayList<>();

    // 新增: 并发数
    private int concurrency = 5;

    // 新增: 限速 (毫秒)
    private int rateLimitMs = 500;

    // 新增: 模糊匹配阈值 (0.6 ~ 0.99)
    private double matchThreshold = 0.80;

    // 新增: 正则排除列表 (如 ["-(?i)c$", "-(?i)zh$"])
    private List<String> excludePatterns = new ArrayList<>();

    public SubtitleSearchRequest() {}

    public String getDirectoryPath() { return directoryPath; }
    public void setDirectoryPath(String directoryPath) { this.directoryPath = directoryPath; }

    public boolean isRecursive() { return recursive; }
    public void setRecursive(boolean recursive) { this.recursive = recursive; }

    public List<String> getSubtitleSources() { return subtitleSources; }
    public void setSubtitleSources(List<String> subtitleSources) { this.subtitleSources = subtitleSources; }

    public int getConcurrency() { return concurrency; }
    public void setConcurrency(int concurrency) { this.concurrency = concurrency; }

    public int getRateLimitMs() { return rateLimitMs; }
    public void setRateLimitMs(int rateLimitMs) { this.rateLimitMs = rateLimitMs; }

    public double getMatchThreshold() { return matchThreshold; }
    public void setMatchThreshold(double matchThreshold) { this.matchThreshold = matchThreshold; }

    public List<String> getExcludePatterns() { return excludePatterns; }
    public void setExcludePatterns(List<String> excludePatterns) { this.excludePatterns = excludePatterns; }

    @Override
    public String toString() {
        return "SubtitleSearchRequest{" +
                "directoryPath='" + directoryPath + '\'' +
                ", sources=" + subtitleSources +
                ", concurrency=" + concurrency +
                '}';
    }
}
