import { useState, useEffect } from 'react';
import { AppProviders } from './contexts/AppProviders';
import { PlayerView } from './components/PlayerView';
import { GMView } from './components/GMView';
import { WelcomeScreen } from './components/common/WelcomeScreen';
import { Home } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'player' | 'gm'>(() => {
    try {
      const saved = localStorage.getItem('dnd_active_tab');
      return (saved === 'player' || saved === 'gm') ? saved : 'player';
    } catch (e) {
      return 'player';
    }
  });

  const [hasEntered, setHasEntered] = useState(() => {
    try {
      return localStorage.getItem('dnd_has_entered_v1') === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('dnd_active_tab', activeTab);
  }, [activeTab]);

  const handleReturnHome = () => {
    localStorage.removeItem('dnd_has_entered_v1');
    setHasEntered(false);
  };

  if (!hasEntered) {
    return (
      <WelcomeScreen onEnter={(role: 'player' | 'gm') => {
        setActiveTab(role);
        localStorage.setItem('dnd_has_entered_v1', 'true');
        setHasEntered(true);
      }} />
    );
  }

  return (
    <AppProviders>
      <div className="h-screen bg-gray-900 text-gray-100 flex flex-col">
        {/* Top Header */}
        <header className="bg-gray-800 border-b border-gray-700 flex justify-between items-center px-4 py-3 shrink-0 shadow-md relative z-20">
          <div className="flex space-x-2">
            {activeTab === 'player' ? (
              <div className="flex items-center gap-2 px-4 py-1.5 font-bold rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                <span className="text-xl">🎭</span> 我的角色
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-1.5 font-bold rounded-lg border border-red-500/30 bg-red-500/10 text-red-400">
                <span className="text-xl">🛡️</span> 资源管理
              </div>
            )}
          </div>
          <div className="text-xl font-bold font-pixel text-gray-300 pb-3 flex flex-col items-end leading-tight">
            <div className="flex items-center gap-3">
              <button
                onClick={handleReturnHome}
                className="text-gray-400 hover:text-white transition-colors bg-gray-700/50 hover:bg-gray-700 p-1.5 rounded-lg flex items-center gap-1 text-sm font-sans"
                title="返回首页"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">返回首页</span>
              </button>
              <span>不咕鸟龙与地下城2024角色卡管理器</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden bg-gray-900 z-10 flex">
          {activeTab === 'player' && <PlayerView />}
          {activeTab === 'gm' && <GMView />}
        </div>
      </div>
    </AppProviders>
  );
}

export default App;
