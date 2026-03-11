import { useState, useEffect } from 'react';
import { AppProviders } from './contexts/AppProviders';
import { PlayerView } from './components/PlayerView';
import { GMView } from './components/GMView';
import { WelcomeScreen } from './components/common/WelcomeScreen';
import { Home } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'player' | 'gm'>(() => {
    return (localStorage.getItem('dnd_active_tab') as 'player' | 'gm') || 'player';
  });

  const [hasEntered, setHasEntered] = useState(() => {
    return localStorage.getItem('dnd_has_entered_v1') === 'true';
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
      <WelcomeScreen onEnter={() => {
        localStorage.setItem('dnd_has_entered_v1', 'true');
        setHasEntered(true);
      }} />
    );
  }

  return (
    <AppProviders>
      <div className="h-screen bg-gray-900 text-gray-100 flex flex-col">
        {/* Top Tab Switcher */}
        <header className="bg-gray-800 border-b border-gray-700 flex justify-between items-end px-4 pt-4 shrink-0 shadow-md relative z-20">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('player')}
              className={`px-6 py-3 font-bold rounded-t-lg transition-colors duration-200 border-x border-t ${activeTab === 'player'
                ? 'bg-gray-900 text-indigo-400 border-gray-700 border-b-transparent relative top-[1px]'
                : 'bg-gray-800 text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-700'
                }`}
            >
              <span className="mr-2">🎭</span> 玩家端
            </button>
            <button
              onClick={() => setActiveTab('gm')}
              className={`px-6 py-3 font-bold rounded-t-lg transition-colors duration-200 border-x border-t ${activeTab === 'gm'
                ? 'bg-gray-900 text-red-400 border-gray-700 border-b-transparent relative top-[1px]'
                : 'bg-gray-800 text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-700'
                }`}
            >
              <span className="mr-2">🛡️</span> 主持人端
            </button>
          </div>
          <div className="text-xl font-bold font-serif text-gray-300 pb-3 flex flex-col items-end leading-tight">
            <div className="flex items-center gap-3">
              <button
                onClick={handleReturnHome}
                className="text-gray-400 hover:text-white transition-colors bg-gray-700/50 hover:bg-gray-700 p-1.5 rounded-lg flex items-center gap-1 text-sm font-sans"
                title="返回首页"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">返回首页</span>
              </button>
              <span>不咕鸟 DND5R <span className="text-gray-500 text-sm ml-1 font-sans font-normal">v1.0</span></span>
            </div>
            <span className="text-xs text-gray-500 font-sans tracking-widest mt-1">TRPG CAMPAIGN TOOL</span>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden bg-gray-900 z-10 flex">
          {activeTab === 'player' ? <PlayerView /> : <GMView />}
        </div>
      </div>
    </AppProviders>
  );
}

export default App;
