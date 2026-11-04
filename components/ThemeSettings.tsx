import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function ThemeSettings() {
    const [theme, setTheme] = useLocalStorage<string>('easy-cc-theme', 'dark');
    useEffect(() => {
        document.documentElement.dataset.theme = theme === 'adventure' ? 'adventure' : 'dark';
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'adventure' ? '#f5e7c9' : '#10141b');
    }, [theme]);
    return <button type="button" className="theme-toggle" title={theme === 'adventure' ? '切换深色主题' : '切换明亮主题'} aria-label={theme === 'adventure' ? '切换深色主题' : '切换明亮主题'} onClick={() => setTheme(theme === 'adventure' ? 'dark' : 'adventure')}>{theme === 'adventure' ? '☾' : '☀'}</button>;
}
