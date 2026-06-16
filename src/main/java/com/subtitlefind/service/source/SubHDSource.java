package com.subtitlefind.service.source;

import com.subtitlefind.model.SubtitleInfo;
import okhttp3.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

/**
 * SubHD 字幕源
 */
public class SubHDSource extends BaseHttpSource {

    private static final Logger logger = LoggerFactory.getLogger(SubHDSource.class);
    private static final String BASE_URL = "https://subhd.tv";

    @Override
    public String getName() { return "subhd"; }

    @Override
    public String getDisplayName() { return "SubHD"; }

    @Override
    public List<SubtitleInfo> search(String keyword) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            String searchUrl = BASE_URL + "/search/" + encodedKeyword;

            Request request = new Request.Builder().url(searchUrl).get()
                .header("Referer", BASE_URL + "/")
                .header("X-Requested-With", "XMLHttpRequest")
                .build();

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    logger.warn("[SubHD] 搜索请求失败，状态码: {}", response.code());
                    return subtitles;
                }
                String html = decodeResponse(response);
                return parseResults(html);
            }
        } catch (Exception e) {
            logger.error("[SubHD] 搜索异常: {}", e.getMessage());
        }
        return subtitles;
    }

    private List<SubtitleInfo> parseResults(String html) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            Document doc = Jsoup.parse(html);
            Elements items = doc.select(".search-result-item, .subtitle-item, [class*='result'], tr");

            int count = 0;
            for (Element item : items) {
                if (count >= 8) break;
                Element link = item.selectFirst("a[href*='/a/'], a[href*='/d/'], a[href*='/subtitle/']");
                if (link == null) link = item.selectFirst("a[href]");
                if (link == null) continue;

                String title = link.text().trim();
                String href = link.attr("href");
                if (title.isEmpty() || href.startsWith("#")) continue;

                subtitles.add(new SubtitleInfo(title, href, null, 0, 0, "zh-CN"));
                count++;
            }
        } catch (Exception e) {
            logger.error("[SubHD] 解析异常: {}", e.getMessage());
        }
        return subtitles;
    }

    @Override
    public SubtitleInfo getDownloadUrl(SubtitleInfo subtitle) {
        try {
            String detailUrl = subtitle.getHref().startsWith("http") ? subtitle.getHref() : BASE_URL + subtitle.getHref();
            Request request = new Request.Builder().url(detailUrl).get()
                .header("Referer", BASE_URL + "/")
                .build();

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) return subtitle;
                String html = decodeResponse(response);
                Document doc = Jsoup.parse(html);

                Element dl = doc.selectFirst("a[href*='download'], a[href*='/download/'], a[href*='.srt'], a[href*='.ass'], a[href*='.zip']");
                if (dl != null) {
                    String href = dl.attr("href");
                    if (href != null && !href.isEmpty()) {
                        subtitle.setDownloadUrl(href.startsWith("http") ? href : BASE_URL + href);
                    }
                }
            }
        } catch (Exception e) {
            logger.error("[SubHD] 获取下载链接异常: {}", e.getMessage());
        }
        return subtitle;
    }
}
