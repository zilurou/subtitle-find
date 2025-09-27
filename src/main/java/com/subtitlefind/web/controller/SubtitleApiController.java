package com.subtitlefind.web.controller;

import com.subtitlefind.service.SubtitleFinderService;
import com.subtitlefind.web.dto.ApiResponse;
import com.subtitlefind.web.dto.SubtitleSearchRequest;
import com.subtitlefind.web.service.LogWebSocketService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/search-subtitles")
    public ApiResponse<String> searchSubtitles(@RequestBody SubtitleSearchRequest request) {
        try {
            if (request.getDirectoryPath() == null || request.getDirectoryPath().trim().isEmpty()) {
                return ApiResponse.error("目录路径不能为空");
            }

            String taskId = UUID.randomUUID().toString();
            logger.info("开始字幕搜索任务，任务ID: {}, 目录: {}", taskId, request.getDirectoryPath());

            // 异步执行字幕搜索任务
            CompletableFuture.runAsync(() -> executeSubtitleSearch(taskId, request));

            return ApiResponse.success("任务已开始执行", taskId);

        } catch (Exception e) {
            logger.error("启动字幕搜索任务失败", e);
            return ApiResponse.error("启动任务失败: " + e.getMessage());
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
            logWebSocketService.sendLog(taskId, "INFO", "开始扫描目录: " + request.getDirectoryPath());

            // 创建字幕查找服务实例
            SubtitleFinderService subtitleFinder = new SubtitleFinderService();

            // 注入日志回调
            subtitleFinder.setLogCallback((level, message) ->
                logWebSocketService.sendLog(taskId, level, message));

            // 执行字幕查找
            subtitleFinder.findSubtitlesForDirectory(request.getDirectoryPath());

            logWebSocketService.sendLog(taskId, "INFO", "任务执行完成！");
            logWebSocketService.sendTaskComplete(taskId);

            // 关闭服务
            subtitleFinder.shutdown();

        } catch (Exception e) {
            logger.error("执行字幕搜索任务失败，任务ID: " + taskId, e);
            logWebSocketService.sendLog(taskId, "ERROR", "任务执行失败: " + e.getMessage());
            logWebSocketService.sendTaskComplete(taskId);
        }
    }
}