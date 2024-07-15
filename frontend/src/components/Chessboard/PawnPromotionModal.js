import React, { useContext } from "react";
import Modal from "../Modal/Modal";

import { PieceType } from "../../helpers/Constants";
import { GameContext } from "../../contexts/GameContext";

const PawnPromotionModal = ({ show, setShow, onPawnPromotion }) => {
  const { board } = useContext(GameContext);
  const availablePieces = [PieceType.BISHOP, PieceType.KNIGHT, PieceType.QUEEN, PieceType.ROOK];

  return (
    <Modal className="pawn-promotion-modal" show={show}>
      <h2>Pawn Promotion</h2>
      <div className="pieces">
        {availablePieces.map((pieceType, index) => {
          return (
            <img
              src={`assets/images/${pieceType}_${board.playerTurn}.png`}
              alt={pieceType}
              key={index}
              onClick={() => {
                onPawnPromotion(pieceType);
                setShow(false);
              }}
            />
          );
        })}
      </div>
    </Modal>
  );
};

export default PawnPromotionModal;
