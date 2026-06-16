package com.subtitlefind.service.source;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.subtitlefind.model.SubtitleInfo;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * 迅雷字幕 API 源
 * 接口: https://api-shoulei-ssl.xunlei.com/oracle/subtitle?gcid=&cid=&name=xxx
 */
public class XunleiSource extends BaseHttpSource {

    private static final Logger logger = LoggerFactory.getLogger(XunleiSource.class);
    private static final String API_URL = "https://api-shoulei-ssl.xunlei.com/oracle/subtitle";
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String getName() { return "xunlei"; }

    @Override
    public String getDisplayName() { return "迅雷字幕API"; }

    @Override
    public List<SubtitleInfo> search(String keyword) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            String encodedName = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            String url = API_URL + "?gcid=&cid=&name=" + encodedName;

            Request request = new Request.Builder().url(url).get()
                .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
                .build();

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    logger.warn("[迅雷] 搜索请求失败，状态码: {}", response.code());
                    return subtitles;
                }
                String body = response.body() != null ? response.body().string() : "";
                logger.debug("[迅雷] 响应: {}", body.length() > 300 ? body.substring(0, 300) : body);
                return parseResults(body);
            }
        } catch (Exception e) {
            logger.error("[迅雷] 搜索异常: {}", e.getMessage());
        }
        return subtitles;
    }

    private List<SubtitleInfo> parseResults(String json) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            JsonNode root = objectMapper.readTree(json);

            // 迅雷 API 返回格式可能是多种结构，尝试常见格式
            JsonNode dataNode = root;
            if (root.has("data")) dataNode = root.get("data");
            if (root.has("result")) dataNode = root.get("result");
            if (root.has("subtitles")) dataNode = root.get("subtitles");
            if (root.has("list")) dataNode = root.get("list");

            if (dataNode == null || (!dataNode.isArray() && dataNode.size() == 0)) {
                logger.debug("[迅雷] 返回数据为空或格式不符合预期");
                return subtitles;
            }

            if (dataNode.isArray()) {
                int count = 0;
                for (JsonNode sub : dataNode) {
                    if (count >= 8) break;
                    SubtitleInfo info = parseSubtitleItem(sub);
                    if (info != null) {
                        subtitles.add(info);
                        count++;
                    }
                }
            } else {
                // 单个对象
                SubtitleInfo info = parseSubtitleItem(dataNode);
                if (info != null) subtitles.add(info);
            }
        } catch (Exception e) {
            logger.error("[迅雷] 解析异常: {}", e.getMessage());
        }
        return subtitles;
    }

    private SubtitleInfo parseSubtitleItem(JsonNode item) {
        try {
            // 尝试多种可能的字段名
            String title = getField(item, "name", "title", "filename", "show_name");
            String url = getField(item, "url", "download_url", "link", "subtitle_url", "srt_url");
            String lang = getField(item, "language", "lang", "sub_lang");
            if (lang == null || lang.trim().isEmpty()) lang = "zh-CN";

            if (url != null && !url.isEmpty()) {
                return new SubtitleInfo(
                    title != null ? title : "未知",
                    "", url, 0, 0, lang
                );
            }
        } catch (Exception e) {
            logger.debug("[迅雷] 解析字幕项异常: {}", e.getMessage());
        }
        return null;
    }

    private String getField(JsonNode node, String... names) {
        for (String name : names) {
            if (node.has(name) && !node.get(name).isNull()) {
                return node.get(name).asText();
            }
        }
        return null;
    }

    @Override
    public SubtitleInfo getDownloadUrl(SubtitleInfo subtitle) {
        // 迅雷 API 搜索结果可能直接包含下载链接
        if (subtitle.getDownloadUrl() != null && !subtitle.getDownloadUrl().isEmpty()) {
            return subtitle;
        }
        return subtitle;
    }
}
