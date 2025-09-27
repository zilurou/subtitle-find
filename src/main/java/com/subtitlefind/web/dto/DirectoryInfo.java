package com.subtitlefind.web.dto;

import java.util.List;

/**
 * 目录信息DTO
 */
public class DirectoryInfo {
    private String path;
    private String name;
    private String parent;
    private boolean isDirectory;
    private List<DirectoryInfo> children;
    private long size;
    private String lastModified;

    public DirectoryInfo() {}

    public DirectoryInfo(String path, String name, boolean isDirectory) {
        this.path = path;
        this.name = name;
        this.isDirectory = isDirectory;
    }

    // Getters and Setters
    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public boolean isDirectory() {
        return isDirectory;
    }

    public void setDirectory(boolean directory) {
        isDirectory = directory;
    }

    public List<DirectoryInfo> getChildren() {
        return children;
    }

    public void setChildren(List<DirectoryInfo> children) {
        this.children = children;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getLastModified() {
        return lastModified;
    }

    public void setLastModified(String lastModified) {
        this.lastModified = lastModified;
    }
}