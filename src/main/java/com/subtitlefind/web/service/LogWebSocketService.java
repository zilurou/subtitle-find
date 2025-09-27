package com.subtitlefind.web.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

/**
 * WebSocket日志服务
 */
@Service
public class LogWebSocketService {

    private static final Logger logger = LoggerFactory.getLogger(LogWebSocketService.class);
    private static final DateTimeFormatter TIMESTAMP_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    /**
     * 发送日志消息
     *
     * @param taskId 任务ID
     * @param level 日志级别
     * @param message 日志消息
     */
    public void sendLog(String taskId, String level, String message) {
        try {
            Map<String, Object> logMessage = new HashMap<>();
            logMessage.put("taskId", taskId);
            logMessage.put("level", level);
            logMessage.put("message", message);
            logMessage.put("timestamp", LocalDateTime.now().format(TIMESTAMP_FORMATTER));
            logMessage.put("type", "log");

            messagingTemplate.convertAndSend("/topic/logs/" + taskId, logMessage);
            logger.debug("发送日志消息: {}", message);

        } catch (Exception e) {
            logger.error("发送WebSocket日志消息失败", e);
        }
    }

    /**
     * 发送进度更新
     *
     * @param taskId 任务ID
     * @param current 当前进度
     * @param total 总进度
     * @param message 进度消息
     */
    public void sendProgress(String taskId, int current, int total, String message) {
        try {
            Map<String, Object> progressMessage = new HashMap<>();
            progressMessage.put("taskId", taskId);
            progressMessage.put("current", current);
            progressMessage.put("total", total);
            progressMessage.put("message", message);
            progressMessage.put("timestamp", LocalDateTime.now().format(TIMESTAMP_FORMATTER));
            progressMessage.put("type", "progress");

            messagingTemplate.convertAndSend("/topic/logs/" + taskId, progressMessage);
            logger.debug("发送进度更新: {}/{} - {}", current, total, message);

        } catch (Exception e) {
            logger.error("发送WebSocket进度消息失败", e);
        }
    }

    /**
     * 发送任务完成消息
     *
     * @param taskId 任务ID
     */
    public void sendTaskComplete(String taskId) {
        try {
            Map<String, Object> completeMessage = new HashMap<>();
            completeMessage.put("taskId", taskId);
            completeMessage.put("message", "任务执行完成");
            completeMessage.put("timestamp", LocalDateTime.now().format(TIMESTAMP_FORMATTER));
            completeMessage.put("type", "complete");

            messagingTemplate.convertAndSend("/topic/logs/" + taskId, completeMessage);
            logger.info("任务完成: {}", taskId);

        } catch (Exception e) {
            logger.error("发送WebSocket任务完成消息失败", e);
        }
    }

    /**
     * 发送错误消息
     *
     * @param taskId 任务ID
     * @param error 错误信息
     */
    public void sendError(String taskId, String error) {
        try {
            Map<String, Object> errorMessage = new HashMap<>();
            errorMessage.put("taskId", taskId);
            errorMessage.put("message", error);
            errorMessage.put("timestamp", LocalDateTime.now().format(TIMESTAMP_FORMATTER));
            errorMessage.put("type", "error");

            messagingTemplate.convertAndSend("/topic/logs/" + taskId, errorMessage);
            logger.error("任务错误 {}: {}", taskId, error);

        } catch (Exception e) {
            logger.error("发送WebSocket错误消息失败", e);
        }
    }
}