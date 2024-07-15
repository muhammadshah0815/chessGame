import React, { useContext } from 'react';
import Modal from '../Modal/Modal'; // Ensure this path is correct
import { GameContext } from '../../contexts/GameContext'; // Ensure this path is correct
import { Color } from '../../helpers/Constants'; // Ensure this path is correct

const GameOverModal = ({ show, setShow }) => {
  const { board, startNewGame } = useContext(GameContext);
  const winner = board.playerTurn === Color.BLACK ? "Black" : "White";
  const winnerKingImage = `assets/images/king_${board.playerTurn}.png`;

  return (
    <Modal show={show} className="game-over-modal">
      <img src={winnerKingImage} alt="King" />
      <h2>{winner} Won</h2>
      <button
        onClick={() => {
          startNewGame();
          setShow(false);
        }}
        className="new-game-button"
      >
        Start New Game
      </button>
    </Modal>
  );
};

export default GameOverModal;
