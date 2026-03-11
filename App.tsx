import { useState, useEffect } from 'react';
import { AppProviders } from './contexts/AppProviders';
import { PlayerView } from './components/PlayerView';
import { GMView } from './components/GMView';
import { RoomView } from './components/RoomView';
import { WelcomeScreen } from './components/common/WelcomeScreen';
import { Home } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'player' | 'gm' | 'room'>(() => {
    return (localStorage.getItem('dnd_active_tab') as 'player' | 'gm' | 'room') || 'player';
  });

  const [hasEntered, setHasEntered] = useState(() => {
    return localStorage.getItem('dnd_has_entered_v1') === 'true';
  });

  const [hasUnlockedRoom, setHasUnlockedRoom] = useState(() => {
    return localStorage.getItem('dnd_room_unlocked') === 'true';
  });

  const [roomPasswordInput, setRoomPasswordInput] = useState('');
  const [roomPasswordError, setRoomPasswordError] = useState(false);

  useEffect(() => {
    localStorage.setItem('dnd_active_tab', activeTab);
  }, [activeTab]);

  const handleReturnHome = () => {
    localStorage.removeItem('dnd_has_entered_v1');
    setHasEntered(false);
  };

  const handleRoomUnlock = () => {
    if (roomPasswordInput === '261751459') {
      localStorage.setItem('dnd_room_unlocked', 'true');
      setHasUnlockedRoom(true);
      setRoomPasswordError(false);
    } else {
      setRoomPasswordError(true);
    }
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
            <button
              onClick={() => setActiveTab('room')}
              className={`px-6 py-3 font-bold rounded-t-lg transition-colors duration-200 border-x border-t ${activeTab === 'room'
                ? 'bg-gray-900 text-yellow-400 border-gray-700 border-b-transparent relative top-[1px]'
                : 'bg-gray-800 text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-700'
                }`}
            >
              <span className="mr-2">🏰</span> 房间
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
          {activeTab === 'player' && <PlayerView />}
          {activeTab === 'gm' && <GMView />}

          {activeTab === 'room' && (
            hasUnlockedRoom ? (
              <RoomView />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-stone-900">
                <div className="bg-stone-800 p-8 rounded-xl shadow-2xl border border-stone-700 max-w-sm w-full animate-in fade-in zoom-in duration-300">
                  <h2 className="text-2xl font-bold text-white mb-2 text-center">进入跑团室</h2>
                  <p className="text-stone-400 text-sm text-center mb-6">请输入房间通行暗号以解锁功能</p>

                  <div className="space-y-4">
                    <input
                      type="password"
                      value={roomPasswordInput}
                      onChange={(e) => {
                        setRoomPasswordInput(e.target.value);
                        setRoomPasswordError(false);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleRoomUnlock()}
                      placeholder="输入密码"
                      className={`w-full p-3 bg-stone-900 border rounded-lg text-white font-mono text-center tracking-widest focus:outline-none focus:ring-2 ${roomPasswordError ? 'border-red-500 focus:ring-red-500' : 'border-stone-600 focus:ring-yellow-500'}`}
                    />
                    {roomPasswordError && (
                      <p className="text-red-400 text-xs text-center animate-pulse">密码不正确，请联系作者获取</p>
                    )}
                    {!roomPasswordError && (
                      <p className="text-stone-500 text-xs text-center">提示：不咕鸟trpg创想产品设计部群号</p>
                    )}
                    <button
                      onClick={handleRoomUnlock}
                      className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-stone-900 font-bold rounded-lg transition-colors shadow-lg"
                    >
                      解锁房间
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </AppProviders>
  );
}

export default App;
