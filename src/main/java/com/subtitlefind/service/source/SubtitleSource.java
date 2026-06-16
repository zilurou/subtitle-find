package com.subtitlefind.service.source;

import com.subtitlefind.model.SubtitleInfo;
import java.util.List;

/**
 * 字幕源接口
 * 所有字幕源必须实现此接口
 */
public interface SubtitleSource {

    /**
     * 字幕源唯一标识
     */
    String getName();

    /**
     * 字幕源显示名称（用于前端展示）
     */
    String getDisplayName();

    /**
     * 搜索字幕
     * @param keyword 搜索关键词
     * @return 字幕信息列表
     */
    List<SubtitleInfo> search(String keyword);

    /**
     * 获取字幕下载链接
     * @param subtitle 字幕信息（包含 href）
     * @return 补充了下载链接的字幕信息
     */
    SubtitleInfo getDownloadUrl(SubtitleInfo subtitle);

    /**
     * 该字幕源是否可用
     */
    default boolean isAvailable() { return true; }
}
