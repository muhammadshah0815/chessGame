import React from 'react';
import { GameProvider } from './contexts/GameContext';
import Chessboard from './components/Chessboard/Chessboard';

const App = () => {
  return (
    <GameProvider>
      <div className="App">
        <Chessboard />
      </div>
    </GameProvider>
  );
};

export default App;
