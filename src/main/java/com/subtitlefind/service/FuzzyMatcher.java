package com.subtitlefind.service;

import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * 模糊匹配工具类
 * 支持 Levenshtein 距离匹配、正则排除、文件名语言标签识别
 */
public class FuzzyMatcher {

    // 常见的文件名语言标签
    private static final Pattern LANG_TAG_PATTERN = Pattern.compile(
        "(?i)[\\.\\-_](?:chs|cht|zh|cn|tc|sc|chi|chinese|简中|繁中|简体|繁体|中文|en|eng|english|英文|ja|jpn|japanese|日文|ko|kor|korean|韩文)"
    );

    // 常见的视频质量/来源后缀
    private static final Pattern QUALITY_SUFFIX = Pattern.compile(
        "(?i)[\\.\\-_](?:4k|BD|bd|1080p|720p|2160p|HDR|UHD|REMUX|BluRay|WEB-DL|WEBRip|BDRip|HDTV|DVDRip|AMZN|NF|DSNP|HMAX|ATVP|Hulu)$"
    );

    /**
     * 从文件名中提取语言标签
     * 例如 "Movie.2024.1080p.chs.mp4" -> "chs"
     */
    public static String extractLanguageTag(String fileName) {
        if (fileName == null) return null;
        var matcher = LANG_TAG_PATTERN.matcher(fileName);
        return matcher.find() ? matcher.group().replaceAll("[\\.\\-_]", "") : null;
    }

    /**
     * 判断语言标签是否表示中文
     */
    public static boolean isChineseLanguageTag(String tag) {
        if (tag == null) return false;
        return tag.matches("(?i)(chs|cht|zh|cn|tc|sc|chi|chinese|简中|繁中|简体|繁体|中文)");
    }

    /**
     * 清理文件名：去除质量后缀、语言标签、特殊字符
     */
    public static String cleanFileName(String fileName) {
        if (fileName == null || fileName.trim().isEmpty()) return "";
        String cleaned = fileName.trim();
        // 去除扩展名
        int dotIdx = cleaned.lastIndexOf('.');
        if (dotIdx > 0) cleaned = cleaned.substring(0, dotIdx);
        // 去除质量后缀
        cleaned = QUALITY_SUFFIX.matcher(cleaned).replaceAll("");
        // 统一分隔符
        cleaned = cleaned.replaceAll("[._\\-]+", " ");
        // 去除多余空格
        cleaned = cleaned.replaceAll("\\s+", " ").trim();
        return cleaned;
    }

    /**
     * 应用正则排除规则
     * @param fileName 文件名
     * @param excludePatterns 排除正则列表
     * @return 如果命中任一排除规则返回 true
     */
    public static boolean shouldExclude(String fileName, List<String> excludePatterns) {
        if (excludePatterns == null || excludePatterns.isEmpty()) return false;
        return excludePatterns.stream().anyMatch(pattern -> {
            try {
                return Pattern.compile(pattern, Pattern.CASE_INSENSITIVE)
                        .matcher(fileName).find();
            } catch (Exception e) {
                return false;
            }
        });
    }

    /**
     * 计算 Levenshtein 编辑距离
     */
    public static int levenshteinDistance(String a, String b) {
        if (a == null || b == null) return Integer.MAX_VALUE;
        int[][] dp = new int[a.length() + 1][b.length() + 1];
        for (int i = 0; i <= a.length(); i++) dp[i][0] = i;
        for (int j = 0; j <= b.length(); j++) dp[0][j] = j;
        for (int i = 1; i <= a.length(); i++) {
            for (int j = 1; j <= b.length(); j++) {
                int cost = a.charAt(i - 1) == b.charAt(j - 1) ? 0 : 1;
                dp[i][j] = Math.min(Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1), dp[i][j - 1] + cost);
            }
        }
        return dp[a.length()][b.length()];
    }

    /**
     * 计算 Jaro-Winkler 相似度 (0.0 ~ 1.0)
     */
    public static double jaroWinkler(String s1, String s2) {
        if (s1 == null || s2 == null) return 0.0;
        if (s1.equals(s2)) return 1.0;

        int[] mtp = matches(s1, s2);
        int m = mtp[0];
        if (m == 0) return 0.0;

        double j = ((double) m / s1.length() + (double) m / s2.length() + (double) (m - mtp[1]) / m) / 3.0;

        // Winkler adjustment
        int prefixLen = 0;
        for (int i = 0; i < Math.min(4, Math.min(s1.length(), s2.length())); i++) {
            if (s1.charAt(i) == s2.charAt(i)) prefixLen++;
            else break;
        }
        return j + 0.1 * prefixLen * (1.0 - j);
    }

    private static int[] matches(String s1, String s2) {
        String max, min;
        if (s1.length() > s2.length()) { max = s1; min = s2; }
        else { max = s2; min = s1; }

        int range = Math.max(max.length() / 2 - 1, 0);
        int[] matchIndexes = new int[min.length()];
        Arrays.fill(matchIndexes, -1);
        boolean[] matchFlags = new boolean[max.length()];
        int matches = 0;

        for (int i = 0; i < min.length(); i++) {
            char c = min.charAt(i);
            for (int j = Math.max(i - range, 0), end = Math.min(i + range + 1, max.length()); j < end; j++) {
                if (!matchFlags[j] && c == max.charAt(j)) {
                    matchIndexes[i] = j;
                    matchFlags[j] = true;
                    matches++;
                    break;
                }
            }
        }

        // Count transpositions
        int transpositions = 0;
        int k = 0;
        char[] ms1 = new char[matches];
        char[] ms2 = new char[matches];
        for (int i = 0; i < min.length(); i++) {
            if (matchIndexes[i] != -1) {
                ms1[k] = min.charAt(i);
                k++;
            }
        }
        k = 0;
        for (int i = 0; i < max.length(); i++) {
            if (matchFlags[i]) {
                ms2[k] = max.charAt(i);
                k++;
            }
        }
        for (int i = 0; i < matches; i++) {
            if (ms1[i] != ms2[i]) transpositions++;
        }
        return new int[]{matches, transpositions / 2};
    }

    /**
     * 综合匹配判断：模糊匹配 + 包含匹配
     * @param subtitleTitle 字幕标题
     * @param searchKeyword 搜索关键词
     * @param threshold Jaro-Winkler 阈值 (推荐 0.85)
     * @return 是否匹配
     */
    public static boolean isFuzzyMatch(String subtitleTitle, String searchKeyword, double threshold) {
        if (subtitleTitle == null || searchKeyword == null) return false;

        String cleanSub = cleanFileName(subtitleTitle).toLowerCase();
        String cleanKw = cleanFileName(searchKeyword).toLowerCase();

        if (cleanSub.isEmpty() || cleanKw.isEmpty()) return false;

        // 1. 包含匹配（最快）
        if (cleanSub.contains(cleanKw) || cleanKw.contains(cleanSub)) return true;

        // 2. Jaro-Winkler 模糊匹配
        double score = jaroWinkler(cleanSub, cleanKw);
        if (score >= threshold) return true;

        // 3. 分词后逐词匹配
        String[] subWords = cleanSub.split("\\s+");
        String[] kwWords = cleanKw.split("\\s+");

        int matchCount = 0;
        for (String kw : kwWords) {
            if (kw.length() < 2) continue;
            for (String sw : subWords) {
                if (sw.length() < 2) continue;
                if (sw.contains(kw) || kw.contains(sw) || jaroWinkler(sw, kw) >= threshold) {
                    matchCount++;
                    break;
                }
            }
        }

        int meaningfulWords = (int) Arrays.stream(kwWords).filter(w -> w.length() >= 2).count();
        return meaningfulWords > 0 && (double) matchCount / meaningfulWords >= 0.67;
    }

    /**
     * 默认阈值的模糊匹配
     */
    public static boolean isFuzzyMatch(String subtitleTitle, String searchKeyword) {
        return isFuzzyMatch(subtitleTitle, searchKeyword, 0.85);
    }
}
