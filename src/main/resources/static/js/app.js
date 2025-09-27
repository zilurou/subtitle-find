// 字幕查找工具 - JavaScript 交互功能

class SubtitleFinderApp {
    constructor() {
        this.stompClient = null;
        this.currentTaskId = null;
        this.isConnected = false;
        this.directoryBrowser = null;
        this.currentSubscription = null;  // 跟踪当前订阅
        this.init();
    }

    // 初始化应用
    init() {
        this.setupEventListeners();
        this.connectWebSocket();
        this.showWelcomeMessage();
        this.initDirectoryBrowser();
    }

    // 设置事件监听器
    setupEventListeners() {
        // 表单提交
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.startSubtitleSearch();
        });

        // 清空日志按钮
        document.getElementById('clearLogBtn').addEventListener('click', () => {
            this.clearLogs();
        });

        // 滚动到底部按钮
        document.getElementById('scrollToBottomBtn').addEventListener('click', () => {
            this.scrollToBottom();
        });

        // 浏览目录按钮
        document.getElementById('browseDirectoryBtn').addEventListener('click', () => {
            this.openDirectoryBrowser();
        });

        // 自动滚动到新日志
        this.setupAutoScroll();
    }

    // 连接 WebSocket
    connectWebSocket() {
        const socket = new SockJS('/ws');
        this.stompClient = new StompJs.Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log('STOMP Debug:', str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.stompClient.onConnect = () => {
            console.log('WebSocket 连接成功');
            this.isConnected = true;
            this.updateConnectionStatus(true);
        };

        this.stompClient.onDisconnect = () => {
            console.log('WebSocket 连接断开');
            this.isConnected = false;
            this.updateConnectionStatus(false);
        };

        this.stompClient.onStompError = (frame) => {
            console.error('STOMP 错误:', frame.headers['message']);
            this.showNotification('连接错误', 'WebSocket 连接发生错误', 'danger');
        };

        this.stompClient.activate();
    }

    // 更新连接状态
    updateConnectionStatus(connected) {
        const statusAlert = document.getElementById('statusAlert');
        const statusText = document.getElementById('statusText');

        if (connected) {
            statusAlert.className = 'alert alert-success';
            statusText.textContent = 'WebSocket 已连接';
        } else {
            statusAlert.className = 'alert alert-warning';
            statusText.textContent = 'WebSocket 连接断开';
        }

        statusAlert.style.display = 'block';
    }

    // 开始字幕搜索
    async startSubtitleSearch() {
        const form = document.getElementById('searchForm');
        const formData = new FormData(form);
        const startBtn = document.getElementById('startBtn');

        // 验证输入
        const directoryPath = formData.get('directoryPath');
        if (!directoryPath || directoryPath.trim() === '') {
            this.showNotification('输入错误', '请输入视频目录路径', 'warning');
            return;
        }

        // 禁用表单
        this.setFormEnabled(false);
        startBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>正在启动...';

        try {
            const response = await fetch('/api/search-subtitles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    directoryPath: directoryPath.trim(),
                    recursive: formData.get('recursive') === 'on'
                })
            });

            const result = await response.json();

            if (result.success) {
                this.currentTaskId = result.data;
                this.subscribeToTaskLogs(this.currentTaskId);
                this.updateStatus('running', '任务执行中...');
                this.showProgress(0, 100, '任务已启动');
                this.showNotification('任务启动', '字幕搜索任务已开始执行', 'success');
            } else {
                throw new Error(result.message || '启动任务失败');
            }

        } catch (error) {
            console.error('启动任务失败:', error);
            this.addLogEntry('ERROR', '启动任务失败: ' + error.message);
            this.showNotification('错误', '启动任务失败: ' + error.message, 'danger');
            this.setFormEnabled(true);
            startBtn.innerHTML = '<i class="bi bi-play-circle me-2"></i>开始查找字幕';
        }
    }

    // 订阅任务日志
    subscribeToTaskLogs(taskId) {
        if (!this.isConnected || !this.stompClient) {
            console.error('WebSocket 未连接，无法订阅日志');
            return;
        }

        // 取消之前的订阅
        if (this.currentSubscription) {
            console.log('取消之前的订阅');
            this.currentSubscription.unsubscribe();
            this.currentSubscription = null;
        }

        // 创建新订阅
        console.log('订阅任务日志:', taskId);
        this.currentSubscription = this.stompClient.subscribe(`/topic/logs/${taskId}`, (message) => {
            const data = JSON.parse(message.body);
            this.handleLogMessage(data);
        });
    }

    // 处理日志消息
    handleLogMessage(data) {
        switch (data.type) {
            case 'log':
                this.addLogEntry(data.level, data.message, data.timestamp);
                break;
            case 'progress':
                this.showProgress(data.current, data.total, data.message);
                break;
            case 'complete':
                this.handleTaskComplete();
                break;
            case 'error':
                this.handleTaskError(data.message);
                break;
        }
    }

    // 添加日志条目
    addLogEntry(level, message, timestamp = null) {
        const logContainer = document.getElementById('logContainer');
        const logEntry = document.createElement('div');

        const now = timestamp || new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        logEntry.className = `log-entry log-${level.toLowerCase()} fade-in-up`;
        logEntry.innerHTML = `
            <span class="log-timestamp">[${now}]</span>
            <span class="log-level log-level-${level.toLowerCase()}">[${level}]</span>
            <span class="log-message">${this.escapeHtml(message)}</span>
        `;

        logContainer.appendChild(logEntry);

        // 自动滚动到底部
        setTimeout(() => this.scrollToBottom(), 100);

        // 限制日志条目数量
        this.limitLogEntries();
    }

    // 显示进度
    showProgress(current, total, message) {
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');

        const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

        progressContainer.style.display = 'block';
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
        progressBar.textContent = `${percentage}%`;
        progressText.textContent = message || `${current} / ${total}`;
    }

    // 处理任务完成
    handleTaskComplete() {
        this.updateStatus('success', '任务执行完成');
        this.setFormEnabled(true);
        this.showNotification('任务完成', '字幕搜索任务已完成', 'success');

        const startBtn = document.getElementById('startBtn');
        startBtn.innerHTML = '<i class="bi bi-play-circle me-2"></i>开始查找字幕';

        // 清理订阅
        if (this.currentSubscription) {
            console.log('任务完成，取消订阅');
            this.currentSubscription.unsubscribe();
            this.currentSubscription = null;
        }

        // 隐藏进度条
        setTimeout(() => {
            document.getElementById('progressContainer').style.display = 'none';
        }, 3000);
    }

    // 处理任务错误
    handleTaskError(message) {
        this.updateStatus('error', '任务执行失败');
        this.setFormEnabled(true);
        this.addLogEntry('ERROR', message);
        this.showNotification('任务失败', message, 'danger');

        const startBtn = document.getElementById('startBtn');
        startBtn.innerHTML = '<i class="bi bi-play-circle me-2"></i>开始查找字幕';

        // 清理订阅
        if (this.currentSubscription) {
            console.log('任务失败，取消订阅');
            this.currentSubscription.unsubscribe();
            this.currentSubscription = null;
        }
    }

    // 更新状态
    updateStatus(status, message) {
        const statusAlert = document.getElementById('statusAlert');
        const statusText = document.getElementById('statusText');
        const statusSpinner = document.getElementById('statusSpinner');

        statusAlert.style.display = 'block';

        switch (status) {
            case 'running':
                statusAlert.className = 'alert alert-info';
                statusSpinner.style.display = 'inline-block';
                break;
            case 'success':
                statusAlert.className = 'alert alert-success';
                statusSpinner.style.display = 'none';
                break;
            case 'error':
                statusAlert.className = 'alert alert-danger';
                statusSpinner.style.display = 'none';
                break;
        }

        statusText.textContent = message;
    }

    // 设置表单启用状态
    setFormEnabled(enabled) {
        const form = document.getElementById('searchForm');
        const inputs = form.querySelectorAll('input, button');

        inputs.forEach(input => {
            input.disabled = !enabled;
        });
    }

    // 清空日志
    clearLogs() {
        const logContainer = document.getElementById('logContainer');
        logContainer.innerHTML = '';
        this.showWelcomeMessage();
    }

    // 滚动到底部
    scrollToBottom() {
        const logContainer = document.getElementById('logContainer');
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    // 设置自动滚动
    setupAutoScroll() {
        const logContainer = document.getElementById('logContainer');
        let isUserScrolling = false;

        logContainer.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = logContainer;
            isUserScrolling = scrollTop < scrollHeight - clientHeight - 50;
        });

        // 监听新日志条目
        const observer = new MutationObserver(() => {
            if (!isUserScrolling) {
                this.scrollToBottom();
            }
        });

        observer.observe(logContainer, { childList: true });
    }

    // 限制日志条目数量
    limitLogEntries(maxEntries = 1000) {
        const logContainer = document.getElementById('logContainer');
        const entries = logContainer.querySelectorAll('.log-entry');

        if (entries.length > maxEntries) {
            const entriesToRemove = entries.length - maxEntries;
            for (let i = 0; i < entriesToRemove; i++) {
                entries[i].remove();
            }
        }
    }

    // 显示通知
    showNotification(title, message, type = 'info') {
        const toastElement = document.getElementById('notificationToast');
        const toastTitle = document.getElementById('toastTitle');
        const toastBody = document.getElementById('toastBody');

        toastTitle.textContent = title;
        toastBody.textContent = message;

        // 设置Toast样式
        toastElement.className = `toast show bg-${type}`;
        if (type === 'danger' || type === 'dark') {
            toastElement.classList.add('text-white');
        }

        const toast = new bootstrap.Toast(toastElement, { delay: 5000 });
        toast.show();
    }

    // 显示欢迎消息
    showWelcomeMessage() {
        const now = new Date().toLocaleString('zh-CN');
        this.addLogEntry('INFO', '欢迎使用字幕刮削器 Web 版！', now);
        this.addLogEntry('INFO', '请在左侧输入视频目录路径，然后点击"开始查找字幕"按钮。', now);
    }

    // 初始化目录浏览器
    initDirectoryBrowser() {
        this.directoryBrowser = new DirectoryBrowser();
    }

    // 打开目录浏览器
    openDirectoryBrowser() {
        this.directoryBrowser.open();
    }

    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 目录浏览器类
class DirectoryBrowser {
    constructor() {
        this.modal = null;
        this.currentPath = '';
        this.selectedPath = '';
        this.init();
    }

    init() {
        this.modal = new bootstrap.Modal(document.getElementById('directoryBrowserModal'));
        this.setupEventListeners();
    }

    setupEventListeners() {
        // 选择目录按钮
        document.getElementById('selectDirectoryBtn').addEventListener('click', () => {
            this.selectDirectory();
        });

        // 用户主目录按钮
        document.getElementById('homeDirectoryBtn').addEventListener('click', () => {
            this.loadHomeDirectory();
        });

        // 刷新按钮
        document.getElementById('refreshDirectoryBtn').addEventListener('click', () => {
            this.refreshCurrentDirectory();
        });

        // 面包屑导航点击
        document.getElementById('directoryBreadcrumb').addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const path = e.target.getAttribute('data-path');
                this.loadDirectory(path);
            }
        });
    }

    async open() {
        this.modal.show();
        await this.loadRootDirectories();
    }

    async loadRootDirectories() {
        try {
            this.showLoading();
            const response = await fetch('/api/file-system/roots');
            const result = await response.json();

            if (result.success) {
                this.displayDirectories(result.data, '');
                this.updateBreadcrumb('');
                this.updateCurrentPath('');
                this.currentPath = '';  // 重置当前路径为空，表示在根目录
            } else {
                this.showError('获取根目录失败: ' + result.message);
            }
        } catch (error) {
            this.showError('加载根目录失败: ' + error.message);
        }
    }

    async loadDirectory(path) {
        try {
            this.showLoading();

            // 调试信息
            console.log('Loading directory:', path);

            // 如果路径为空或者为根目录标识，加载根目录
            if (!path || path === '' || path === 'ROOT') {
                await this.loadRootDirectories();
                return;
            }

            const response = await fetch(`/api/file-system/directory?path=${encodeURIComponent(path)}`);

            // 检查响应状态
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();

            console.log('Directory response:', result);

            if (result.success) {
                const directoryInfo = result.data;
                this.displayDirectories(directoryInfo.children || [], directoryInfo.path);
                this.updateBreadcrumb(directoryInfo.path);
                this.updateCurrentPath(directoryInfo.path);
                this.currentPath = directoryInfo.path;
            } else {
                this.showError('获取目录内容失败: ' + (result.message || '未知错误'));
            }
        } catch (error) {
            console.error('Load directory error:', error);
            this.showError('加载目录失败: ' + error.message);
        }
    }

    async loadHomeDirectory() {
        try {
            const response = await fetch('/api/file-system/home');
            const result = await response.json();

            if (result.success) {
                await this.loadDirectory(result.data);
            } else {
                this.showError('获取用户主目录失败: ' + result.message);
            }
        } catch (error) {
            this.showError('获取用户主目录失败: ' + error.message);
        }
    }

    refreshCurrentDirectory() {
        if (this.currentPath) {
            this.loadDirectory(this.currentPath);
        } else {
            this.loadRootDirectories();
        }
    }

    displayDirectories(items, parentPath) {
        const container = document.getElementById('directoryList');

        if (!items || items.length === 0) {
            container.innerHTML = `
                <div class="directory-empty">
                    <div class="empty-icon">
                        <i class="bi bi-folder-x"></i>
                    </div>
                    <p>此目录为空或无可访问的子目录</p>
                </div>
            `;
            return;
        }

        // 过滤只显示目录
        const directories = items.filter(item => item.directory);

        if (directories.length === 0) {
            container.innerHTML = `
                <div class="directory-empty">
                    <div class="empty-icon">
                        <i class="bi bi-folder-x"></i>
                    </div>
                    <p>此目录下没有子目录</p>
                </div>
            `;
            return;
        }

        let html = '';

        // 如果不是根目录，添加返回上级目录选项
        if (parentPath && parentPath !== '') {
            const parentDir = this.getParentPath(parentPath);
            html += `
                <div class="directory-item" data-path="${parentDir}" data-action="navigate">
                    <div class="item-icon">
                        <i class="bi bi-arrow-up"></i>
                    </div>
                    <div class="item-info">
                        <div class="item-name">.. (返回上级目录)</div>
                    </div>
                </div>
            `;
        }

        // 添加目录列表
        directories.forEach(item => {
            html += `
                <div class="directory-item" data-path="${item.path}">
                    <div class="item-icon folder">
                        <i class="bi bi-folder-fill"></i>
                    </div>
                    <div class="item-info">
                        <div class="item-name">${this.escapeHtml(item.name)}</div>
                        <div class="item-details">
                            ${item.lastModified ? `<span class="item-date">${item.lastModified}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;

        // 添加点击事件
        container.querySelectorAll('.directory-item').forEach(item => {
            item.addEventListener('click', () => {
                const path = item.getAttribute('data-path');
                const action = item.getAttribute('data-action');

                if (action === 'navigate') {
                    this.loadDirectory(path);
                } else {
                    this.selectItem(item, path);
                }
            });

            item.addEventListener('dblclick', () => {
                const path = item.getAttribute('data-path');
                this.loadDirectory(path);
            });
        });
    }

    selectItem(element, path) {
        // 移除之前的选中状态
        document.querySelectorAll('.directory-item.selected').forEach(item => {
            item.classList.remove('selected');
        });

        // 选中当前项
        element.classList.add('selected');
        this.selectedPath = path;

        // 启用选择按钮
        document.getElementById('selectDirectoryBtn').disabled = false;
    }

    selectDirectory() {
        if (this.selectedPath) {
            // 将选中的路径填入输入框
            document.getElementById('directoryPath').value = this.selectedPath;
            this.modal.hide();

            // 显示通知
            window.subtitleApp.showNotification('目录已选择', `已选择目录: ${this.selectedPath}`, 'success');
        }
    }

    updateBreadcrumb(path) {
        const breadcrumb = document.getElementById('directoryBreadcrumb');
        let html = '';

        if (!path || path === '') {
            html = `
                <li class="breadcrumb-item active">
                    <i class="bi bi-house"></i> 根目录
                </li>
            `;
        } else {
            // 添加根目录
            html += `
                <li class="breadcrumb-item">
                    <a href="#" class="text-decoration-none" data-path="">
                        <i class="bi bi-house"></i> 根目录
                    </a>
                </li>
            `;

            // 拆分路径并创建面包屑
            const parts = this.splitPath(path);
            let currentPath = '';

            parts.forEach((part, index) => {
                if (part) {
                    currentPath = this.joinPath(currentPath, part);
                    const isLast = index === parts.length - 1;

                    if (isLast) {
                        html += `
                            <li class="breadcrumb-item active">
                                ${this.escapeHtml(part)}
                            </li>
                        `;
                    } else {
                        html += `
                            <li class="breadcrumb-item">
                                <a href="#" class="text-decoration-none" data-path="${currentPath}">
                                    ${this.escapeHtml(part)}
                                </a>
                            </li>
                        `;
                    }
                }
            });
        }

        breadcrumb.innerHTML = html;
    }

    updateCurrentPath(path) {
        document.getElementById('currentDirectoryPath').value = path || '根目录';
        document.getElementById('selectDirectoryBtn').disabled = !path;
        this.selectedPath = path || '';
    }

    showLoading() {
        const container = document.getElementById('directoryList');
        container.innerHTML = `
            <div class="directory-loading">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">加载中...</span>
                </div>
            </div>
        `;
    }

    showError(message) {
        const container = document.getElementById('directoryList');
        container.innerHTML = `
            <div class="directory-error">
                <i class="bi bi-exclamation-triangle"></i>
                <p>${this.escapeHtml(message)}</p>
                <button class="btn btn-sm btn-outline-danger" onclick="window.subtitleApp.directoryBrowser.refreshCurrentDirectory()">
                    重试
                </button>
            </div>
        `;
    }

    // 工具方法
    getParentPath(path) {
        if (!path) return '';

        const separator = path.includes('/') ? '/' : '\\';
        const parts = path.split(separator);
        parts.pop();

        const result = parts.join(separator);

        // 如果是Windows系统的驱动器根目录（如 C:），返回空字符串表示回到根目录列表
        if (result.match(/^[A-Z]:$/i)) {
            return '';
        }

        return result;
    }

    splitPath(path) {
        if (!path) return [];
        const separator = path.includes('/') ? '/' : '\\';
        return path.split(separator).filter(part => part !== '');
    }

    joinPath(base, part) {
        if (!base) return part;
        const separator = base.includes('/') ? '/' : '\\';
        return base + separator + part;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 当页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.subtitleApp = new SubtitleFinderApp();
});