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
 * 射手网(Assrt) 字幕源
 * 通过网页抓取获取字幕
 */
public class AssrtSource extends BaseHttpSource {

    private static final Logger logger = LoggerFactory.getLogger(AssrtSource.class);
    private static final String BASE_URL = "https://assrt.net";

    @Override
    public String getName() { return "assrt"; }

    @Override
    public String getDisplayName() { return "射手网(Assrt)"; }

    @Override
    public List<SubtitleInfo> search(String keyword) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
            String searchUrl = BASE_URL + "/sub/?searchword=" + encodedKeyword;

            Request request = new Request.Builder().url(searchUrl).get()
                .header("Referer", BASE_URL + "/")
                .build();

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    logger.warn("[Assrt] 搜索请求失败，状态码: {}", response.code());
                    return subtitles;
                }
                String html = decodeResponse(response);
                return parseResults(html);
            }
        } catch (Exception e) {
            logger.error("[Assrt] 搜索异常: {}", e.getMessage());
        }
        return subtitles;
    }

    private List<SubtitleInfo> parseResults(String html) {
        List<SubtitleInfo> subtitles = new ArrayList<>();
        try {
            Document doc = Jsoup.parse(html);
            Element intro = doc.selectFirst(".intro");
            Elements items = doc.select(".subitem, tr, [class*='result']");

            int count = 0;
            for (Element item : items) {
                if (count >= 8) break;
                Element link = item.selectFirst("a[href*='/sub/']");
                if (link == null) continue;

                String title = link.text().trim();
                String href = link.attr("href");
                if (title.isEmpty()) continue;

                // 只收集中文字幕
                String text = item.text().toLowerCase();
                if (text.contains("eng") && !text.contains("chs") && !text.contains("zh")) continue;

                subtitles.add(new SubtitleInfo(title, href.startsWith("/") ? href : "/" + href, null, 0, 0, "zh-CN"));
                count++;
            }

            if (subtitles.isEmpty() && intro != null) {
                Elements introRows = intro.select("tr, .item, [class*='result']");
                for (Element row : introRows) {
                    if (count >= 8) break;
                    Element link = row.selectFirst("a[href*='/sub/']");
                    if (link == null) continue;
                    String title = link.text().trim();
                    String href = link.attr("href");
                    if (!title.isEmpty()) {
                        subtitles.add(new SubtitleInfo(title, href, null, 0, 0, "zh-CN"));
                        count++;
                    }
                }
            }
        } catch (Exception e) {
            logger.error("[Assrt] 解析异常: {}", e.getMessage());
        }
        return subtitles;
    }

    @Override
    public SubtitleInfo getDownloadUrl(SubtitleInfo subtitle) {
        try {
            String detailUrl = BASE_URL + subtitle.getHref();
            Request request = new Request.Builder().url(detailUrl).get()
                .header("Referer", BASE_URL + "/")
                .build();

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) return subtitle;
                String html = decodeResponse(response);
                Document doc = Jsoup.parse(html);

                Element dl = doc.selectFirst("a[href*='download'], a[href*='/dl/'], .download a");
                if (dl != null) {
                    String href = dl.attr("href");
                    if (href != null && !href.isEmpty()) {
                        subtitle.setDownloadUrl(href.startsWith("http") ? href : BASE_URL + href);
                    }
                }
            }
        } catch (Exception e) {
            logger.error("[Assrt] 获取下载链接异常: {}", e.getMessage());
        }
        return subtitle;
    }
}
