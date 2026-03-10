import { useState, useEffect } from 'react';
import { AppProviders } from './contexts/AppProviders';
import { PlayerView } from './components/PlayerView';
import { GMView } from './components/GMView';

function App() {
  const [activeTab, setActiveTab] = useState<'player' | 'gm'>(() => {
    return (localStorage.getItem('dnd_active_tab') as 'player' | 'gm') || 'player';
  });

  useEffect(() => {
    localStorage.setItem('dnd_active_tab', activeTab);
  }, [activeTab]);

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
            <span>不咕鸟 DND5R <span className="text-gray-500 text-sm ml-1 font-sans font-normal">v1.0</span></span>
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
