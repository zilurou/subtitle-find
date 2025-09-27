# Docker 部署说明

## 快速开始

### 1. 构建应用JAR包

首先需要在本地构建JAR包：
```bash
mvn clean package -DskipTests
```

### 2. 使用 docker-compose（推荐）

```bash
# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止容器
docker-compose down
```

### 3. 手动构建和运行

```bash
# 构建镜像
docker build -t subtitle-scraper:latest .

# 运行容器
docker run -d \
  --name subtitle-scraper \
  -p 19251:19251 \
  -v /path/to/your/videos:/app/videos:ro \
  -v ./logs:/app/logs \
  subtitle-scraper:latest
```

## 配置说明

### 端口
- 默认端口：19251
- 可通过环境变量 `SERVER_PORT` 修改

### 卷挂载
- `/app/videos`: 视频文件目录（只读）
- `/app/logs`: 应用日志目录
- `/app/subtitles`: 字幕输出目录

### 环境变量
- `SPRING_PROFILES_ACTIVE`: Spring 配置文件（默认：prod）
- `TZ`: 时区设置（默认：Asia/Shanghai）
- `JAVA_OPTS`: JVM 参数（默认：-Xmx512m -Xms256m）

## 访问应用

启动后访问：http://localhost:19251

## 注意事项

1. 首次启动可能需要几分钟来下载依赖
2. 确保映射的视频目录路径正确
3. 应用会在容器内以非root用户运行，确保目录权限正确

## 故障排除

```bash
# 查看容器状态
docker ps

# 查看应用日志
docker logs subtitle-scraper

# 进入容器调试
docker exec -it subtitle-scraper /bin/bash
```