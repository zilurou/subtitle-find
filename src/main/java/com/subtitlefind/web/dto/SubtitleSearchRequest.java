package com.subtitlefind.web.dto;

/**
 * 字幕查找请求DTO
 */
public class SubtitleSearchRequest {
    private String directoryPath;
    private boolean recursive = true;

    public SubtitleSearchRequest() {}

    public SubtitleSearchRequest(String directoryPath, boolean recursive) {
        this.directoryPath = directoryPath;
        this.recursive = recursive;
    }

    public String getDirectoryPath() {
        return directoryPath;
    }

    public void setDirectoryPath(String directoryPath) {
        this.directoryPath = directoryPath;
    }

    public boolean isRecursive() {
        return recursive;
    }

    public void setRecursive(boolean recursive) {
        this.recursive = recursive;
    }

    @Override
    public String toString() {
        return "SubtitleSearchRequest{" +
                "directoryPath='" + directoryPath + '\'' +
                ", recursive=" + recursive +
                '}';
    }
}