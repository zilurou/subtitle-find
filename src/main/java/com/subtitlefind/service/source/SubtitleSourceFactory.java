package com.subtitlefind.service.source;

import java.util.*;

/**
 * 字幕源工厂
 * 根据配置的字幕源列表创建对应的源实例
 */
public class SubtitleSourceFactory {

    private final Map<String, SubtitleSource> sourceCache = new HashMap<>();

    /**
     * 获取字幕源实例（带缓存）
     */
    public SubtitleSource getSource(String sourceKey) {
        return sourceCache.computeIfAbsent(sourceKey, this::createSource);
    }

    /**
     * 根据配置列表获取全部字幕源
     */
    public List<SubtitleSource> getSources(List<String> sourceKeys) {
        List<SubtitleSource> sources = new ArrayList<>();
        if (sourceKeys == null || sourceKeys.isEmpty()) {
            // 默认只用 subtitlecat
            sources.add(getSource("subtitlecat"));
            return sources;
        }
        for (String key : sourceKeys) {
            sources.add(getSource(key));
        }
        return sources;
    }

    private SubtitleSource createSource(String key) {
        if (key == null) return new SubtitleCatSource();

        return switch (key.toLowerCase().trim()) {
            case "subtitlecat" -> new SubtitleCatSource();
            case "assrt" -> new AssrtSource();
            case "subhd" -> new SubHDSource();
            case "opensubtitles" -> new OpenSubtitlesSource();
            case "xunlei" -> new XunleiSource();
            default -> new SubtitleCatSource();
        };
    }

    public void closeAll() {
        for (SubtitleSource source : sourceCache.values()) {
            if (source instanceof BaseHttpSource) {
                ((BaseHttpSource) source).close();
            }
        }
        sourceCache.clear();
    }
}
