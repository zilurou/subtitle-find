package com.subtitlefind.service.source;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.subtitlefind.model.SubtitleInfo;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

/**
 * OpenSubtitles REST API 字幕源
 * 使用 opensubtitles.org 的 API
 */
public class OpenSubtitlesSource extends BaseHttpSource {

    private static final Logger logger = LoggerFactory.getLogger(OpenSubtitlesSource.class);
    private static final String API_URL = "https://rest.opensubtitles.org/search";
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String getName() { return "opensubtitles"; }

    @Override
    public String getDisplayName() { return "OpenSubtitles"; }

    @Override
    public List<SubtitleInfo> search(String keyword) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            String url = API_URL + "/query-" + java.net.URLEncoder.encode(keyword, "UTF-8")
                       + "/sublanguageid-chi";

            Request request = new Request.Builder().url(url).get()
                .header("User-Agent", "SubtitleFind v2.0")
                .build();

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    logger.warn("[OpenSubtitles] 搜索请求失败，状态码: {}", response.code());
                    return subtitles;
                }
                String body = response.body() != null ? response.body().string() : "";
                return parseResults(body);
            }
        } catch (Exception e) {
            logger.error("[OpenSubtitles] 搜索异常: {}", e.getMessage());
        }
        return subtitles;
    }

    private List<SubtitleInfo> parseResults(String json) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            JsonNode root = objectMapper.readTree(json);
            if (!root.isArray()) return subtitles;

            int count = 0;
            for (JsonNode node : root) {
                if (count >= 8) break;
                String title = node.has("MovieName") ? node.get("MovieName").asText() : "";
                String release = node.has("MovieReleaseName") ? node.get("MovieReleaseName").asText() : "";
                String displayTitle = title.isEmpty() ? release : title;
                if (release.isEmpty()) displayTitle = title;

                String downloadUrl = node.has("SubDownloadLink") ? node.get("SubDownloadLink").asText() : "";
                String zipUrl = node.has("ZipDownloadLink") ? node.get("ZipDownloadLink").asText() : "";
                String dl = downloadUrl.isEmpty() ? zipUrl : downloadUrl;

                String id = node.has("IDSubtitleFile") ? node.get("IDSubtitleFile").asText() : "";

                String lang = node.has("LanguageName") ? node.get("LanguageName").asText() : "zh-CN";

                if (!dl.isEmpty()) {
                    SubtitleInfo info = new SubtitleInfo(displayTitle, id, dl, 0, 0, lang);
                    subtitles.add(info);
                    count++;
                }
            }
        } catch (Exception e) {
            logger.error("[OpenSubtitles] 解析异常: {}", e.getMessage());
        }
        return subtitles;
    }

    @Override
    public SubtitleInfo getDownloadUrl(SubtitleInfo subtitle) {
        // OpenSubtitles API 的搜索结果已经包含下载链接
        return subtitle;
    }
}
