import { useState } from 'react';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ListEditorScreen } from './screens/ListEditorScreen';
import { ReflectionScreen } from './screens/ReflectionScreen';
import { CompletionScreen } from './screens/CompletionScreen';
import { loadData, saveList as saveListToStorage, saveUserName, markNightReflected } from './lib/storage';
import { getWeekStart, toISODate } from './lib/dateUtils';
import type { AppData } from './lib/types';

type Screen = 'login' | 'home' | 'list' | 'reflect' | 'complete';

function App() {
  const [data, setData] = useState<AppData>(() => loadData());
  const [screen, setScreen] = useState<Screen>(() => (data.userName ? 'home' : 'login'));

  const today = new Date();
  const weekStart = getWeekStart(today);
  const weekStartISO = toISODate(weekStart);
  const weekList = data.lists[weekStartISO];

  const lastWeekStart = new Date(weekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);
  const lastWeekList = data.lists[toISODate(lastWeekStart)];

  function handleContinue(name: string) {
    const next = saveUserName(data, name);
    setData(next);
    setScreen('home');
  }

  function handleSaveList(items: string[]) {
    const next = saveListToStorage(data, { weekStart: weekStartISO, items });
    setData(next);
    setScreen('home');
  }

  function handleCompleteReflection() {
    const next = markNightReflected(data, weekStartISO, toISODate(today));
    setData(next);
    setScreen('complete');
  }

  if (screen === 'login') {
    return <LoginScreen onContinue={handleContinue} />;
  }

  if (screen === 'list') {
    return (
      <ListEditorScreen
        today={today}
        initialItems={weekList?.items ?? []}
        lastWeekItems={lastWeekList?.items}
        onSave={handleSaveList}
      />
    );
  }

  if (screen === 'reflect') {
    return (
      <ReflectionScreen
        items={(weekList?.items ?? []).filter((item) => item.trim().length > 0)}
        onComplete={handleCompleteReflection}
        onExit={() => setScreen('home')}
      />
    );
  }

  if (screen === 'complete') {
    return <CompletionScreen onDone={() => setScreen('home')} />;
  }

  return (
    <HomeScreen
      userName={data.userName}
      today={today}
      weekStart={weekStart}
      weekList={weekList}
      reflectedISO={data.reflectedNights[weekStartISO] ?? []}
      onGoToList={() => setScreen('list')}
      onReflect={() => setScreen('reflect')}
    />
  );
}

export default App;
