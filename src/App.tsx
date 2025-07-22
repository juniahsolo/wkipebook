import React from 'react';
import { useState } from 'react';
import { GlobalMap } from './components/GlobalMap';
import { SplashScreen } from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="w-full h-screen">
      <GlobalMap />
    </div>
  );
}

export default App;