package com.subtitlefind.web.service;

import com.subtitlefind.web.dto.DirectoryInfo;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 文件系统浏览服务
 */
@Service
public class FileSystemService {

    private static final DateTimeFormatter DATE_FORMATTER =
        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").withZone(ZoneId.systemDefault());

    /**
     * 获取系统根目录列表
     */
    public List<DirectoryInfo> getRootDirectories() {
        List<DirectoryInfo> roots = new ArrayList<>();

        // Windows系统 - 获取所有盘符
        if (System.getProperty("os.name").toLowerCase().contains("win")) {
            File[] drives = File.listRoots();
            for (File drive : drives) {
                if (drive.exists() && drive.canRead()) {
                    DirectoryInfo info = new DirectoryInfo();
                    info.setPath(drive.getAbsolutePath());
                    info.setName(drive.getAbsolutePath());
                    info.setDirectory(true);
                    info.setParent(null);
                    roots.add(info);
                }
            }
        } else {
            // Unix/Linux系统 - 从根目录开始
            DirectoryInfo root = new DirectoryInfo();
            root.setPath("/");
            root.setName("/");
            root.setDirectory(true);
            root.setParent(null);
            roots.add(root);
        }

        return roots;
    }

    /**
     * 获取指定目录的内容
     */
    public DirectoryInfo getDirectoryContents(String directoryPath) {
        try {
            // 处理空路径或null
            if (directoryPath == null || directoryPath.trim().isEmpty()) {
                throw new IllegalArgumentException("目录路径不能为空");
            }

            // 处理Windows根目录路径（如 C:\ 变成 C:/）
            String normalizedPath = directoryPath.trim();

            Path path = Paths.get(normalizedPath);

            if (!Files.exists(path)) {
                throw new IllegalArgumentException("目录不存在: " + normalizedPath);
            }

            if (!Files.isDirectory(path)) {
                throw new IllegalArgumentException("路径不是目录: " + normalizedPath);
            }

            if (!Files.isReadable(path)) {
                throw new IllegalArgumentException("目录不可读: " + normalizedPath);
            }

            DirectoryInfo directoryInfo = new DirectoryInfo();
            directoryInfo.setPath(path.toAbsolutePath().toString());

            // 处理根目录名称显示
            String displayName;
            if (path.getFileName() != null) {
                displayName = path.getFileName().toString();
            } else {
                // 对于根目录，显示完整路径
                displayName = path.toAbsolutePath().toString();
            }
            directoryInfo.setName(displayName);
            directoryInfo.setDirectory(true);

            // 设置父目录
            if (path.getParent() != null) {
                directoryInfo.setParent(path.getParent().toAbsolutePath().toString());
            }

            // 获取子目录和文件
            List<DirectoryInfo> children = new ArrayList<>();
            try {
                children = Files.list(path)
                    .filter(p -> {
                        try {
                            return Files.isReadable(p) && !Files.isHidden(p);
                        } catch (Exception e) {
                            // 如果无法访问某个文件/目录，跳过它
                            return false;
                        }
                    })
                    .map(this::pathToDirectoryInfo)
                    .filter(info -> info != null)
                    .sorted((a, b) -> {
                        // 目录优先，然后按名称排序
                        if (a.isDirectory() != b.isDirectory()) {
                            return a.isDirectory() ? -1 : 1;
                        }
                        return a.getName().compareToIgnoreCase(b.getName());
                    })
                    .collect(Collectors.toList());
            } catch (Exception e) {
                // 如果无法列出目录内容，返回空列表
                children = new ArrayList<>();
            }

            directoryInfo.setChildren(children);
            return directoryInfo;

        } catch (IllegalArgumentException e) {
            // 重新抛出参数异常，保持原始错误信息
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("读取目录失败: " + e.getMessage(), e);
        }
    }

    /**
     * 验证目录路径是否有效
     */
    public boolean isValidDirectory(String directoryPath) {
        try {
            Path path = Paths.get(directoryPath);
            return Files.exists(path) && Files.isDirectory(path) && Files.isReadable(path);
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * 获取用户主目录
     */
    public String getUserHomeDirectory() {
        return System.getProperty("user.home");
    }

    /**
     * 将Path转换为DirectoryInfo
     */
    private DirectoryInfo pathToDirectoryInfo(Path path) {
        try {
            DirectoryInfo info = new DirectoryInfo();
            info.setPath(path.toAbsolutePath().toString());
            info.setName(path.getFileName().toString());
            info.setDirectory(Files.isDirectory(path));

            // 设置文件大小（只对文件有效）
            if (!Files.isDirectory(path)) {
                info.setSize(Files.size(path));
            }

            // 设置最后修改时间
            Instant lastModified = Files.getLastModifiedTime(path).toInstant();
            info.setLastModified(DATE_FORMATTER.format(lastModified));

            return info;
        } catch (Exception e) {
            // 如果无法读取文件信息，返回null
            return null;
        }
    }
}