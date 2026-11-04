import { Component, type ReactNode } from 'react';

export class AppErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
    state: { error: Error | null } = { error: null };
    static getDerivedStateFromError(error: Error) { return { error }; }
    render() {
        if (!this.state.error) return this.props.children;
        return <section role="alert" style={{ padding: 24, overflow: 'auto', background: '#fff9ef', color: '#302922', minHeight: '100vh' }}>
            <h1>页面运行出错</h1><p>角色和本地资料仍保存在原位置。请将下方错误内容发给开发者定位。</p>
            <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{this.state.error.message}</pre>
            <button type="button" onClick={() => window.location.reload()}>重新加载页面</button>
            <details><summary>错误详情</summary><pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>{this.state.error.stack}</pre></details>
        </section>;
    }
}
