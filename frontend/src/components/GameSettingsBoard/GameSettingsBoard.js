import React, { useContext } from "react";
import "./GameSettingsBoard.css";
import { GameContext } from "../../contexts/GameContext";

const GameSettingsBoard = () => {
  const { startNewGame, saveCurrentGame } = useContext(GameContext);

  return (
    <div className="game-settings-board">
      <button className="btn" onClick={startNewGame}>
        Start New Game
      </button>
      <button className="btn" onClick={saveCurrentGame}>
        Save Game
      </button>
    </div>
  );
};

export default GameSettingsBoard;
