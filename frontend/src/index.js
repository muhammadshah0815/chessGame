import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GameProvider } from './contexts/GameContext'; // Ensure this path is correct

ReactDOM.render(
  <GameProvider>
    <App />
  </GameProvider>,
  document.getElementById('root')
);
