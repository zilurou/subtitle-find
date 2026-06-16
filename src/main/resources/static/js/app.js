// 字幕查找工具 v2.0 - JavaScript

class SubtitleFinderApp {
    constructor() {
        this.stompClient = null;
        this.currentTaskId = null;
        this.isConnected = false;
        this.directoryBrowser = null;
        this.currentSubscription = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSliderListeners();
        this.connectWebSocket();
        this.showWelcomeMessage();
        this.initDirectoryBrowser();
    }

    setupEventListeners() {
        document.getElementById('searchForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.startSubtitleSearch();
        });

        document.getElementById('clearLogBtn').addEventListener('click', () => this.clearLogs());
        document.getElementById('scrollToBottomBtn').addEventListener('click', () => this.scrollToBottom());
        document.getElementById('browseDirectoryBtn').addEventListener('click', () => this.openDirectoryBrowser());
        this.setupAutoScroll();
    }

    setupSliderListeners() {
        const sliders = [
            { id: 'concurrency', displayId: 'concurrencyValue' },
            { id: 'rateLimit', displayId: 'rateLimitValue', suffix: 'ms' },
            { id: 'matchThreshold', displayId: 'thresholdValue', transform: v => (v / 100).toFixed(2) }
        ];

        sliders.forEach(s => {
            const el = document.getElementById(s.id);
            const display = document.getElementById(s.displayId);
            if (el && display) {
                const update = () => {
                    const val = s.transform ? s.transform(el.value) : el.value;
                    display.textContent = val + (s.suffix || '');
                };
                el.addEventListener('input', update);
                update();
            }
        });
    }

    connectWebSocket() {
        const socket = new SockJS('/ws');
        this.stompClient = new StompJs.Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log('STOMP:', str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.stompClient.onConnect = () => {
            console.log('WebSocket 已连接');
            this.isConnected = true;
            this.updateConnectionStatus(true);
        };

        this.stompClient.onDisconnect = () => {
            console.log('WebSocket 断开');
            this.isConnected = false;
            this.updateConnectionStatus(false);
        };

        this.stompClient.onStompError = (frame) => {
            console.error('STOMP 错误:', frame.headers['message']);
            this.showNotification('连接错误', 'WebSocket 连接异常', 'danger');
        };

        this.stompClient.activate();
    }

    updateConnectionStatus(connected) {
        const alert = document.getElementById('statusAlert');
        const text = document.getElementById('statusText');
        alert.style.display = 'block';
        if (connected) {
            alert.className = 'alert alert-success';
            text.textContent = 'WebSocket 已连接';
        } else {
            alert.className = 'alert alert-warning';
            text.textContent = 'WebSocket 连接断开';
        }
    }

    // 采集表单中的所有配置
    gatherConfig() {
        // 选中的字幕源
        const sources = [];
        document.querySelectorAll('.source-check:checked').forEach(cb => {
            sources.push(cb.value);
        });
        if (sources.length === 0) sources.push('subtitlecat');

        // 正则排除
        const excludeRaw = document.getElementById('excludePatterns').value.trim();
        const excludes = excludeRaw ? excludeRaw.split('\n').map(s => s.trim()).filter(s => s.length > 0) : [];

        return {
            directoryPath: document.getElementById('directoryPath').value.trim(),
            recursive: document.getElementById('recursive').checked,
            subtitleSources: sources,
            concurrency: parseInt(document.getElementById('concurrency').value),
            rateLimitMs: parseInt(document.getElementById('rateLimit').value),
            matchThreshold: parseFloat((document.getElementById('matchThreshold').value / 100).toFixed(2)),
            excludePatterns: excludes
        };
    }

    async startSubtitleSearch() {
        const config = this.gatherConfig();
        const startBtn = document.getElementById('startBtn');

        if (!config.directoryPath) {
            this.showNotification('输入错误', '请输入视频目录路径', 'warning');
            return;
        }
        if (config.subtitleSources.length === 0) {
            this.showNotification('输入错误', '请至少选择一个字幕源', 'warning');
            return;
        }

        this.setFormEnabled(false);
        startBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>正在启动...';

        try {
            const response = await fetch('/api/search-subtitles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });

            const result = await response.json();

            if (result.success) {
                this.currentTaskId = result.data;
                this.subscribeToTaskLogs(this.currentTaskId);
                this.updateStatus('running', '任务执行中...');
                this.showProgress(0, 100, '任务已启动');
                this.showNotification('任务启动',
                    '字幕源: ' + config.subtitleSources.join(', ') + ' | 并发: ' + config.concurrency,
                    'success');
            } else {
                throw new Error(result.message || '启动失败');
            }
        } catch (error) {
            console.error('启动失败:', error);
            this.addLogEntry('ERROR', '启动任务失败: ' + error.message);
            this.showNotification('错误', '启动失败: ' + error.message, 'danger');
            this.setFormEnabled(true);
            startBtn.innerHTML = '<i class="bi bi-play-circle me-2"></i>开始查找字幕';
        }
    }

    subscribeToTaskLogs(taskId) {
        if (!this.isConnected || !this.stompClient) return;
        if (this.currentSubscription) {
            this.currentSubscription.unsubscribe();
            this.currentSubscription = null;
        }
        this.currentSubscription = this.stompClient.subscribe(`/topic/logs/${taskId}`, (msg) => {
            const data = JSON.parse(msg.body);
            this.handleLogMessage(data);
        });
    }

    handleLogMessage(data) {
        switch (data.type) {
            case 'log': this.addLogEntry(data.level, data.message, data.timestamp); break;
            case 'progress': this.showProgress(data.current, data.total, data.message); break;
            case 'complete': this.handleTaskComplete(); break;
            case 'error': this.handleTaskError(data.message); break;
        }
    }

    addLogEntry(level, message, timestamp) {
        const container = document.getElementById('logContainer');
        const entry = document.createElement('div');
        const now = timestamp || new Date().toLocaleString('zh-CN', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });

        entry.className = `log-entry log-${level.toLowerCase()} fade-in-up`;
        entry.innerHTML = `
            <span class="log-timestamp">[${now}]</span>
            <span class="log-level log-level-${level.toLowerCase()}">[${level}]</span>
            <span class="log-message">${this.escapeHtml(message)}</span>
        `;
        container.appendChild(entry);
        setTimeout(() => this.scrollToBottom(), 100);
        this.limitLogEntries();
    }

    showProgress(current, total, message) {
        const container = document.getElementById('progressContainer');
        const bar = document.getElementById('progressBar');
        const text = document.getElementById('progressText');
        const pct = total > 0 ? Math.round((current / total) * 100) : 0;
        container.style.display = 'block';
        bar.style.width = pct + '%';
        bar.setAttribute('aria-valuenow', pct);
        bar.textContent = pct + '%';
        text.textContent = message || `${current} / ${total}`;
    }

    handleTaskComplete() {
        this.updateStatus('success', '任务执行完成');
        this.setFormEnabled(true);
        this.showNotification('任务完成', '字幕搜索任务已完成', 'success');
        document.getElementById('startBtn').innerHTML = '<i class="bi bi-play-circle me-2"></i>开始查找字幕';
        if (this.currentSubscription) { this.currentSubscription.unsubscribe(); this.currentSubscription = null; }
        setTimeout(() => { document.getElementById('progressContainer').style.display = 'none'; }, 3000);
    }

    handleTaskError(message) {
        this.updateStatus('error', '任务执行失败');
        this.setFormEnabled(true);
        this.addLogEntry('ERROR', message);
        this.showNotification('任务失败', message, 'danger');
        document.getElementById('startBtn').innerHTML = '<i class="bi bi-play-circle me-2"></i>开始查找字幕';
        if (this.currentSubscription) { this.currentSubscription.unsubscribe(); this.currentSubscription = null; }
    }

    updateStatus(status, message) {
        const alert = document.getElementById('statusAlert');
        const text = document.getElementById('statusText');
        const spinner = document.getElementById('statusSpinner');
        alert.style.display = 'block';
        switch (status) {
            case 'running': alert.className = 'alert alert-info'; spinner.style.display = 'inline-block'; break;
            case 'success': alert.className = 'alert alert-success'; spinner.style.display = 'none'; break;
            case 'error': alert.className = 'alert alert-danger'; spinner.style.display = 'none'; break;
        }
        text.textContent = message;
    }

    setFormEnabled(enabled) {
        document.querySelectorAll('#searchForm input, #searchForm button, #searchForm textarea').forEach(el => {
            if (el.id === 'clearLogBtn' || el.id === 'scrollToBottomBtn') return;
            el.disabled = !enabled;
        });
    }

    clearLogs() {
        document.getElementById('logContainer').innerHTML = '';
        this.showWelcomeMessage();
    }

    scrollToBottom() {
        const c = document.getElementById('logContainer');
        c.scrollTop = c.scrollHeight;
    }

    setupAutoScroll() {
        const c = document.getElementById('logContainer');
        let userScroll = false;
        c.addEventListener('scroll', () => {
            const d = c.scrollHeight - c.clientHeight - c.scrollTop;
            userScroll = d > 50;
        });
        new MutationObserver(() => { if (!userScroll) this.scrollToBottom(); }).observe(c, { childList: true });
    }

    limitLogEntries(max = 1000) {
        const entries = document.getElementById('logContainer').querySelectorAll('.log-entry');
        if (entries.length > max) {
            for (let i = 0; i < entries.length - max; i++) entries[i].remove();
        }
    }

    showNotification(title, message, type = 'info') {
        const toast = document.getElementById('notificationToast');
        document.getElementById('toastTitle').textContent = title;
        document.getElementById('toastBody').textContent = message;
        toast.className = `toast show bg-${type}`;
        if (type === 'danger' || type === 'dark') toast.classList.add('text-white');
        new bootstrap.Toast(toast, { delay: 5000 }).show();
    }

    showWelcomeMessage() {
        const now = new Date().toLocaleString('zh-CN');
        this.addLogEntry('INFO', '欢迎使用字幕刮削器 v2.0！', now);
        this.addLogEntry('INFO', '选择字幕源、设定参数后，输入目录路径点击"开始查找字幕"', now);
    }

    initDirectoryBrowser() { this.directoryBrowser = new DirectoryBrowser(); }
    openDirectoryBrowser() { this.directoryBrowser.open(); }

    escapeHtml(text) {
        const d = document.createElement('div');
        d.textContent = text;
        return d.innerHTML;
    }
}

// 目录浏览器（保持不变）
class DirectoryBrowser {
    constructor() {
        this.modal = null;
        this.currentPath = '';
        this.selectedPath = '';
        this.init();
    }

    init() {
        this.modal = new bootstrap.Modal(document.getElementById('directoryBrowserModal'));
        this.setupListeners();
    }

    setupListeners() {
        document.getElementById('selectDirectoryBtn').addEventListener('click', () => this.selectDirectory());
        document.getElementById('homeDirectoryBtn').addEventListener('click', () => this.loadHomeDirectory());
        document.getElementById('refreshDirectoryBtn').addEventListener('click', () => this.refreshCurrentDirectory());
        document.getElementById('directoryBreadcrumb').addEventListener('click', (e) => {
            if (e.target.tagName === 'A') { e.preventDefault(); this.loadDirectory(e.target.getAttribute('data-path')); }
        });
    }

    async open() { this.modal.show(); await this.loadRootDirectories(); }

    async loadRootDirectories() {
        try {
            this.showLoading();
            const res = await (await fetch('/api/file-system/roots')).json();
            if (res.success) { this.displayDirectories(res.data, ''); this.updateBreadcrumb(''); this.updateCurrentPath(''); this.currentPath = ''; }
            else this.showError('获取根目录失败: ' + res.message);
        } catch (e) { this.showError('加载失败: ' + e.message); }
    }

    async loadDirectory(path) {
        try {
            this.showLoading();
            if (!path || path === '' || path === 'ROOT') { await this.loadRootDirectories(); return; }
            const res = await (await fetch(`/api/file-system/directory?path=${encodeURIComponent(path)}`)).json();
            if (res.success) {
                const info = res.data;
                this.displayDirectories(info.children || [], info.path);
                this.updateBreadcrumb(info.path);
                this.updateCurrentPath(info.path);
                this.currentPath = info.path;
            } else this.showError('获取目录内容失败: ' + (res.message || '未知错误'));
        } catch (e) { this.showError('加载失败: ' + e.message); }
    }

    async loadHomeDirectory() {
        try {
            const res = await (await fetch('/api/file-system/home')).json();
            if (res.success) await this.loadDirectory(res.data);
            else this.showError('获取主目录失败: ' + res.message);
        } catch (e) { this.showError('失败: ' + e.message); }
    }

    refreshCurrentDirectory() { this.currentPath ? this.loadDirectory(this.currentPath) : this.loadRootDirectories(); }

    displayDirectories(items, parentPath) {
        const c = document.getElementById('directoryList');
        if (!items || items.length === 0) {
            c.innerHTML = '<div class="directory-empty"><div class="empty-icon"><i class="bi bi-folder-x"></i></div><p>此目录为空</p></div>';
            return;
        }
        const dirs = items.filter(i => i.directory);
        if (dirs.length === 0) {
            c.innerHTML = '<div class="directory-empty"><div class="empty-icon"><i class="bi bi-folder-x"></i></div><p>没有子目录</p></div>';
            return;
        }
        let h = '';
        if (parentPath && parentPath !== '') {
            const pp = this.getParentPath(parentPath);
            h += `<div class="directory-item" data-path="${this.esc(pp)}" data-action="navigate"><div class="item-icon"><i class="bi bi-arrow-up"></i></div><div class="item-info"><div class="item-name">.. 返回上级</div></div></div>`;
        }
        dirs.forEach(d => {
            h += `<div class="directory-item" data-path="${this.esc(d.path)}"><div class="item-icon folder"><i class="bi bi-folder-fill"></i></div><div class="item-info"><div class="item-name">${this.esc(d.name)}</div>${d.lastModified ? `<div class="item-details"><span class="item-date">${d.lastModified}</span></div>` : ''}</div></div>`;
        });
        c.innerHTML = h;
        c.querySelectorAll('.directory-item').forEach(el => {
            el.addEventListener('click', () => {
                const path = el.getAttribute('data-path');
                if (el.getAttribute('data-action') === 'navigate') this.loadDirectory(path);
                else this.selectItem(el, path);
            });
            el.addEventListener('dblclick', () => this.loadDirectory(el.getAttribute('data-path')));
        });
    }

    selectItem(el, path) {
        document.querySelectorAll('.directory-item.selected').forEach(i => i.classList.remove('selected'));
        el.classList.add('selected');
        this.selectedPath = path;
        document.getElementById('selectDirectoryBtn').disabled = false;
    }

    selectDirectory() {
        if (this.selectedPath) {
            document.getElementById('directoryPath').value = this.selectedPath;
            this.modal.hide();
            window.subtitleApp.showNotification('目录已选择', '已选择: ' + this.selectedPath, 'success');
        }
    }

    updateBreadcrumb(path) {
        const bc = document.getElementById('directoryBreadcrumb');
        if (!path || path === '') { bc.innerHTML = '<li class="breadcrumb-item active"><i class="bi bi-house"></i> 根目录</li>'; return; }
        let h = '<li class="breadcrumb-item"><a href="#" class="text-decoration-none" data-path=""><i class="bi bi-house"></i> 根目录</a></li>';
        const parts = this.splitPath(path);
        let cur = '';
        parts.forEach((p, i) => {
            cur = this.joinPath(cur, p);
            h += i === parts.length - 1
                ? `<li class="breadcrumb-item active">${this.esc(p)}</li>`
                : `<li class="breadcrumb-item"><a href="#" class="text-decoration-none" data-path="${cur}">${this.esc(p)}</a></li>`;
        });
        bc.innerHTML = h;
    }

    updateCurrentPath(path) {
        document.getElementById('currentDirectoryPath').value = path || '根目录';
        document.getElementById('selectDirectoryBtn').disabled = !path;
        this.selectedPath = path || '';
    }

    showLoading() { document.getElementById('directoryList').innerHTML = '<div class="directory-loading"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>'; }
    showError(msg) { document.getElementById('directoryList').innerHTML = `<div class="directory-error"><i class="bi bi-exclamation-triangle"></i><p>${this.esc(msg)}</p><button class="btn btn-sm btn-outline-danger" onclick="window.subtitleApp.directoryBrowser.refreshCurrentDirectory()">重试</button></div>`; }

    getParentPath(path) {
        if (!path) return '';
        const sep = path.includes('/') ? '/' : '\\';
        const parts = path.split(sep); parts.pop();
        const result = parts.join(sep);
        return result.match(/^[A-Z]:$/i) ? '' : result;
    }

    splitPath(path) { if (!path) return []; return path.split(path.includes('/') ? '/' : '\\').filter(p => p !== ''); }
    joinPath(base, part) { if (!base) return part; return base + (base.includes('/') ? '/' : '\\') + part; }
    esc(text) { const d = document.createElement('div'); d.textContent = text; return d.innerHTML; }
}

document.addEventListener('DOMContentLoaded', () => { window.subtitleApp = new SubtitleFinderApp(); });
