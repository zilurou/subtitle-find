# 字幕查找工具 - Web 版使用说明

现在项目已经支持 Web 界面！可以通过浏览器进行可视化操作。

## 新增功能

### 🌐 Web 界面版本
- **可视化操作界面** - 通过浏览器进行操作，无需命令行
- **实时日志输出** - 执行过程中的所有日志都会实时显示在页面上
- **进度追踪** - 显示任务执行进度和状态
- **响应式设计** - 支持桌面和移动设备访问

### ✨ 界面特性
- **现代化设计** - 使用 Bootstrap 5 构建的美观界面
- **实时通信** - 基于 WebSocket 的实时日志推送
- **任务管理** - 支持异步任务执行和状态监控
- **用户友好** - 直观的操作界面和状态提示

## 使用方法

### 方法一：直接启动 Web 版本
```bash
# 编译项目
mvn clean compile

# 启动 Web 版本
mvn spring-boot:run -Dspring-boot.run.mainClass="com.subtitlefind.SubtitleFinderWebApplication"
```

### 方法二：通过命令行参数启动
```bash
# 使用 --web 参数启动 Web 版本
mvn exec:java -Dexec.mainClass="com.subtitlefind.SubtitleFinderApplication" -Dexec.args="--web"
```

### 方法三：通过交互式菜单启动
```bash
# 启动交互模式
mvn exec:java -Dexec.mainClass="com.subtitlefind.SubtitleFinderApplication"
# 然后选择选项 3: 启动 Web 界面版本
```

## Web 界面功能

### 🎯 主要功能
1. **目录输入** - 在界面中输入要处理的视频目录路径
2. **任务配置** - 选择是否包含子目录等选项
3. **实时执行** - 点击按钮开始执行，过程会实时显示
4. **日志查看** - 所有执行日志都会实时显示在右侧面板
5. **状态监控** - 显示任务执行状态和进度

### 📱 界面布局
- **左侧控制面板** - 输入参数和控制任务执行
- **右侧日志面板** - 实时显示执行过程和结果
- **状态指示器** - 显示当前任务状态
- **进度条** - 显示任务执行进度

## 访问地址
启动成功后，在浏览器中访问：
```
http://localhost:19251
```

## 技术架构

### 后端技术
- **Spring Boot3** - Web 框架
- **JDK17**
- **WebSocket** - 实时通信
- **REST API** - 接口服务

### 前端技术
- **Bootstrap 5** - UI 框架
- **STOMP.js** - WebSocket 客户端
- **原生 JavaScript** - 交互逻辑

## 原有功能保持不变

控制台版本的所有功能都保持不变，你仍然可以：

```bash
# 命令行模式
mvn exec:java -Dexec.mainClass="com.subtitlefind.SubtitleFinderApplication" -Dexec.args="C:\Videos"

# 交互式模式
mvn exec:java -Dexec.mainClass="com.subtitlefind.SubtitleFinderApplication"
```

现在你有三种使用方式：
1. **命令行模式** - 快速批处理
2. **交互式控制台** - 逐步操作
3. **Web 界面** - 可视化操作 ✨

推荐使用 Web 界面版本，因为它提供了更好的用户体验和实时反馈！