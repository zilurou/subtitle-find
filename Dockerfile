# 基于Java运行时镜像
FROM eclipse-temurin:17-jre

# 设置工作目录
WORKDIR /app

# 复制JAR文件（需要先在本地构建）
COPY target/subtitle-find-*.jar app.jar

# 暴露端口
EXPOSE 19251

# 设置 JVM 参数
ENV JAVA_OPTS="-Xmx512m -Xms256m -Dserver.port=19251"

# 启动应用
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]