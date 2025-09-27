package com.subtitlefind;

import com.subtitlefind.service.SubtitleFinderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Scanner;

/**
 * 字幕查找工具主程序入口 - 控制台版本
 */
public class SubtitleFinderApplication {

    private static final Logger logger = LoggerFactory.getLogger(SubtitleFinderApplication.class);

    public static void main(String[] args) {
        logger.info("字幕查找工具启动 (控制台版本)");

        // 检查是否要启动 Web 版本
        if (args.length > 0 && "--web".equals(args[0])) {
            System.out.println("启动 Web 版本...");
            SubtitleFinderWebApplication.main(java.util.Arrays.copyOfRange(args, 1, args.length));
            return;
        }

        SubtitleFinderService subtitleFinder = new SubtitleFinderService();

        try {
            if (args.length > 0) {
                // 命令行模式
                String directoryPath = args[0];
                logger.info("命令行模式，处理目录: {}", directoryPath);
                subtitleFinder.findSubtitlesForDirectory(directoryPath);
            } else {
                // 交互模式
                runInteractiveMode(subtitleFinder);
            }
        } catch (Exception e) {
            logger.error("程序执行过程中发生错误: {}", e.getMessage(), e);
        } finally {
            // 确保资源被正确释放
            subtitleFinder.shutdown();
            logger.info("程序结束");
        }
    }

    /**
     * 运行交互模式
     */
    private static void runInteractiveMode(SubtitleFinderService subtitleFinder) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=================================");
        System.out.println("     字幕查找工具 v1.0");
        System.out.println("=================================");
        System.out.println();

        while (true) {
            System.out.println("请选择操作：");
            System.out.println("1. 为目录中的所有视频文件查找字幕");
            System.out.println("2. 为单个视频文件查找字幕");
            System.out.println("3. 启动 Web 界面版本");
            System.out.println("4. 退出程序");
            System.out.print("请输入选项 (1-4): ");

            String choice = scanner.nextLine().trim();

            switch (choice) {
                case "1":
                    handleDirectoryMode(scanner, subtitleFinder);
                    break;
                case "2":
                    handleSingleFileMode(scanner, subtitleFinder);
                    break;
                case "3":
                    handleWebMode();
                    return;
                case "4":
                    System.out.println("正在退出程序...");
                    return;
                default:
                    System.out.println("无效选项，请重新输入！");
                    break;
            }

            System.out.println();
        }
    }

    /**
     * 处理目录模式
     */
    private static void handleDirectoryMode(Scanner scanner, SubtitleFinderService subtitleFinder) {
        System.out.print("请输入视频文件目录路径: ");
        String directoryPath = scanner.nextLine().trim();

        if (directoryPath.isEmpty()) {
            System.out.println("目录路径不能为空！");
            return;
        }

        // 处理Windows路径中的引号
        if (directoryPath.startsWith("\"") && directoryPath.endsWith("\"")) {
            directoryPath = directoryPath.substring(1, directoryPath.length() - 1);
        }

        System.out.println("开始为目录中的视频文件查找字幕...");
        System.out.println("目录: " + directoryPath);
        System.out.println("注意: 程序会递归搜索子目录中的所有视频文件");
        System.out.println();

        try {
            subtitleFinder.findSubtitlesForDirectory(directoryPath);
            System.out.println("任务完成！");
        } catch (Exception e) {
            System.err.println("处理过程中发生错误: " + e.getMessage());
            logger.error("处理目录时发生错误", e);
        }
    }

    /**
     * 处理单文件模式
     */
    private static void handleSingleFileMode(Scanner scanner, SubtitleFinderService subtitleFinder) {
        System.out.print("请输入视频文件完整路径: ");
        String filePath = scanner.nextLine().trim();

        if (filePath.isEmpty()) {
            System.out.println("文件路径不能为空！");
            return;
        }

        // 处理Windows路径中的引号
        if (filePath.startsWith("\"") && filePath.endsWith("\"")) {
            filePath = filePath.substring(1, filePath.length() - 1);
        }

        System.out.println("开始为视频文件查找字幕...");
        System.out.println("文件: " + filePath);
        System.out.println();

        try {
            boolean success = subtitleFinder.findSubtitleForSingleFile(filePath);
            if (success) {
                System.out.println("字幕下载成功！");
            } else {
                System.out.println("未能找到或下载字幕。");
            }
        } catch (Exception e) {
            System.err.println("处理过程中发生错误: " + e.getMessage());
            logger.error("处理单文件时发生错误", e);
        }
    }

    /**
     * 处理Web模式
     */
    private static void handleWebMode() {
        System.out.println("正在启动 Web 界面版本...");
        System.out.println("启动完成后，请在浏览器中访问: http://localhost:8080");
        System.out.println();

        try {
            SubtitleFinderWebApplication.main(new String[]{});
        } catch (Exception e) {
            System.err.println("启动 Web 版本失败: " + e.getMessage());
            logger.error("启动 Web 版本失败", e);
        }
    }
}