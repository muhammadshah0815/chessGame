import { createContext, useState, useEffect } from 'react';
import { Board } from '../models/Board';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(() => {
    const savedGame = localStorage.getItem('chessGame');
    return savedGame ? Board.load(JSON.parse(savedGame)) : new Board();
  });

  useEffect(() => {
    const saveGame = () => {
      localStorage.setItem('chessGame', JSON.stringify(board.save()));
    };
    window.addEventListener('beforeunload', saveGame);
    return () => window.removeEventListener('beforeunload', saveGame);
  }, [board]);

  const startNewGame = () => {
    setBoard(new Board());
  };

  const saveCurrentGame = () => {
    localStorage.setItem('chessGame', JSON.stringify(board.save()));
  };

  return (
    <GameContext.Provider value={{ board, setBoard, startNewGame, saveCurrentGame }}>
      {children}
    </GameContext.Provider>
  );
};
