# 多阶段构建 - 字幕刮削器 v2.0
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests -B

# 运行阶段
FROM eclipse-temurin:17-jre

WORKDIR /app

# 复制构建产物
COPY --from=builder /build/target/subtitle-find-*.jar app.jar

EXPOSE 19251

ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV TZ=Asia/Shanghai

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD java -cp app.jar org.springframework.boot.loader.JarLauncher --health-check 2>/dev/null || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=19251 -jar app.jar"]
