package com.subtitlefind.service.source;

import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeUnit;

/**
 * HTTP 字幕源基类
 * 提供共用的 OkHttpClient 和编码处理
 */
public abstract class BaseHttpSource implements SubtitleSource {

    private static final Logger logger = LoggerFactory.getLogger(BaseHttpSource.class);

    protected final OkHttpClient httpClient;

    public BaseHttpSource() {
        this.httpClient = new OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(60, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .addInterceptor(chain -> {
                Request original = chain.request();
                Request req = original.newBuilder()
                    .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
                    .header("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")
                    .header("Accept-Language", "zh-CN,zh;q=0.9,en;q=0.5")
                    .header("Connection", "keep-alive")
                    .build();
                return chain.proceed(req);
            })
            .build();
    }

    /**
     * 解码 HTTP 响应
     */
    protected String decodeResponse(Response response) throws IOException {
        if (response.body() == null) return "";

        byte[] bytes = response.body().bytes();
        String contentType = response.header("Content-Type");
        Charset charset = StandardCharsets.UTF_8;

        if (contentType != null && contentType.toLowerCase().contains("charset=")) {
            String[] parts = contentType.toLowerCase().split("charset=");
            if (parts.length > 1) {
                try {
                    charset = Charset.forName(parts[1].split(";")[0].trim());
                } catch (Exception ignored) {}
            }
        }

        String content = new String(bytes, charset);

        // UTF-8 乱码检测，尝试 GBK
        if (charset == StandardCharsets.UTF_8 && containsGarbled(content)) {
            try {
                content = new String(bytes, Charset.forName("GBK"));
            } catch (Exception ignored) {}
        }

        return content;
    }

    private boolean containsGarbled(String text) {
        if (text == null || text.isEmpty()) return false;
        long qCount = text.chars().filter(ch -> ch == '?' || ch == 65533).count();
        return qCount > text.length() * 0.1;
    }

    /**
     * 关闭 HTTP 客户端
     */
    public void close() {
        if (httpClient != null) {
            httpClient.dispatcher().executorService().shutdown();
            httpClient.connectionPool().evictAll();
        }
    }
}
