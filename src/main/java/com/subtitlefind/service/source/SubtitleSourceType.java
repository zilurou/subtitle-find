package com.subtitlefind.service.source;

/**
 * 字幕源类型枚举
 */
public enum SubtitleSourceType {
    SUBTITLECAT("subtitlecat", "SubtitleCat", "https://subtitlecat.com"),
    ASSRT("assrt", "射手网(Assrt)", "https://assrt.net"),
    SUBHD("subhd", "SubHD", "https://subhd.tv"),
    OPENSUBTITLES("opensubtitles", "OpenSubtitles", "https://opensubtitles.org"),
    XUNLEI("xunlei", "迅雷字幕API", "https://api-shoulei-ssl.xunlei.com");

    private final String key;
    private final String displayName;
    private final String baseUrl;

    SubtitleSourceType(String key, String displayName, String baseUrl) {
        this.key = key;
        this.displayName = displayName;
        this.baseUrl = baseUrl;
    }

    public String getKey() { return key; }
    public String getDisplayName() { return displayName; }
    public String getBaseUrl() { return baseUrl; }

    public static SubtitleSourceType fromKey(String key) {
        for (SubtitleSourceType t : values()) {
            if (t.key.equalsIgnoreCase(key)) return t;
        }
        return null;
    }
}
