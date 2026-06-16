package com.subtitlefind.service.source;

import com.subtitlefind.model.SubtitleInfo;
import com.subtitlefind.service.VideoFileScanner;
import okhttp3.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * SubtitleCat 字幕源
 */
public class SubtitleCatSource extends BaseHttpSource {

    private static final Logger logger = LoggerFactory.getLogger(SubtitleCatSource.class);
    private static final String BASE_URL = "https://subtitlecat.com";

    @Override
    public String getName() { return "subtitlecat"; }

    @Override
    public String getDisplayName() { return "SubtitleCat"; }

    @Override
    public List<SubtitleInfo> search(String keyword) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            String searchUrl = BASE_URL + "/index.php?search=" + encodedKeyword;

            Request request = new Request.Builder().url(searchUrl).get().build();
            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    logger.warn("[SubtitleCat] 搜索请求失败，状态码: {}", response.code());
                    return subtitles;
                }
                String html = decodeResponse(response);
                return parseResults(html, keyword);
            }
        } catch (Exception e) {
            logger.error("[SubtitleCat] 搜索异常: {}", e.getMessage());
        }
        return subtitles;
    }

    private List<SubtitleInfo> parseResults(String html, String keyword) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            Document doc = Jsoup.parse(html);
            Elements rows = doc.select("tr");

            int count = 0;
            for (Element row : rows) {
                if (count >= 8) break;
                Elements tds = row.select("td");
                if (tds.size() < 4) continue;

                Element titleLink = tds.get(0).select("a").first();
                if (titleLink == null) continue;

                String title = titleLink.text().trim();
                String href = titleLink.attr("href");
                if (title.isEmpty() || href.isEmpty()) continue;

                subtitles.add(new SubtitleInfo(title, href, null, 0, 0, "zh-CN"));
                count++;
            }
        } catch (Exception e) {
            logger.error("[SubtitleCat] 解析异常: {}", e.getMessage());
        }
        return subtitles;
    }

    @Override
    public SubtitleInfo getDownloadUrl(SubtitleInfo subtitle) {
        try {
            String detailUrl = BASE_URL + "/" + subtitle.getHref();
            Request request = new Request.Builder().url(detailUrl).get().build();

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) return subtitle;
                String html = decodeResponse(response);

                Document doc = Jsoup.parse(html);
                Element dl = doc.select("#download_zh-CN, #download_zh, .download-link, a[href*='download']").first();
                if (dl != null) {
                    String href = dl.attr("href");
                    if (href != null && !href.isEmpty()) {
                        subtitle.setDownloadUrl(href.startsWith("http") ? href : BASE_URL + href);
                    }
                }
            }
        } catch (Exception e) {
            logger.error("[SubtitleCat] 获取下载链接异常: {}", e.getMessage());
        }
        return subtitle;
    }
}
