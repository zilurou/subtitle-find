package com.subtitlefind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 字幕查找工具 Web 应用主入口
 */
@SpringBootApplication
public class SubtitleFinderWebApplication {

    public static void main(String[] args) {
        // 设置系统属性
        System.setProperty("file.encoding", "UTF-8");
        System.setProperty("server.port", "19251");

        // 启动 Spring Boot 应用
        SpringApplication app = new SpringApplication(SubtitleFinderWebApplication.class);

        // 设置默认配置
        app.setDefaultProperties(java.util.Map.of(
            "server.port", "19251",
            "logging.level.com.subtitlefind", "INFO",
            "spring.thymeleaf.cache", "false"
        ));

        System.out.println("=================================");
        System.out.println("   字幕查找工具 Web 版启动中...");
        System.out.println("=================================");
        System.out.println();

        try {
            app.run(args);
            System.out.println();
            System.out.println("=================================");
            System.out.println("   Web 界面已启动！");
            System.out.println("   访问地址: http://localhost:19251");
            System.out.println("=================================");
        } catch (Exception e) {
            System.err.println("启动失败: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }
}