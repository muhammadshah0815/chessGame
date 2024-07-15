import React, { useState, useEffect, useRef } from "react";
import Tile from "../Tile/Tile";
import { GRID_CENTER, GRID_SIZE } from "../../helpers/Constants";
import { GameContext } from "../../contexts/GameContext";
import { useContext } from "react";
import "./Chessboard.css";
import PawnPromotionModal from "./PawnPromotionModal";
import GameOverModal from "./GameOverModal";
import StartNewGameModal from "./StartNewGameModal";
import { Pawn } from "../../models/Pawn"; // Import Pawn

const Chessboard = () => {
  const chessboardRef = useRef(null);
  const chessboardWrapperRef = useRef(null);
  const [activeChessPiece, setActiveChessPiece] = useState(null);
  const [activePiecePos, setActivePiecePos] = useState({ x: -1, y: -1 });
  const {
    board,
    setBoard,
    deleteGameOnFinish,
    showGameOverModal,
    setShowGameOverModal,
    startNewGame,
  } = useContext(GameContext);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [showPawnPromotionModal, setShowPawnPromotionModal] = useState(false);
  const [promotionPiecePosition, setPromotionPiecePosition] = useState({ x: -1, y: -1 });

  useEffect(() => {
    startNewGame();
  }, [startNewGame]); // Ensure this useEffect runs only once

  const boardElements = [];
  for (let j = 7; j >= 0; j--) {
    for (let i = 0; i <= 7; i++) {
      const piece = board.getPieceAt({ x: i, y: j });
      const image = piece ? piece.image : undefined;
      const withinReachOfActivePiece = possibleMoves.some(
        (pos) => pos.x === i && pos.y === j
      );
      const hasEnemyPiece = piece && piece.color !== board.playerTurn;
      boardElements.push(
        <Tile
          key={`${i}-${j}`}
          number={i + j}
          image={image}
          withinReachOfActivePiece={withinReachOfActivePiece}
          hasEnemyPiece={hasEnemyPiece}
        />
      );
    }
  }

  const updateChessPieceLocation = (element, posX, posY) => {
    const chessboard = chessboardRef.current;
    const chessboardWrapper = chessboardWrapperRef.current;
    if (chessboard && chessboardWrapper && element && element.classList.contains("chess-piece")) {
      const minX = -30;
      const minY = -30;
      const maxX = chessboard.clientWidth - 75;
      const maxY = chessboard.clientHeight - 80;
      const pieceLeftPosition = posX - GRID_CENTER - chessboardWrapper.offsetLeft;
      const pieceTopPosition = posY - GRID_CENTER - chessboardWrapper.offsetTop;
      element.style.position = "absolute";
      element.style.zIndex = "10";

      if (
        pieceLeftPosition < minX ||
        pieceLeftPosition > maxX ||
        pieceTopPosition < minY ||
        pieceTopPosition > maxY
      ) {
        const event = new MouseEvent("mouseup", {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        chessboard.dispatchEvent(event);
        setActiveChessPiece(null);
        return;
      }
      element.style.top = `${pieceTopPosition}px`;
      element.style.left = `${pieceLeftPosition}px`;
    }
  };

  const calculateCurrentPos = (mouseX, mouseY) => {
    const chessboardWrapper = chessboardWrapperRef.current;
    if (chessboardWrapper) {
      const x = Math.floor((mouseX - chessboardWrapper.offsetLeft) / GRID_SIZE);
      const y = Math.abs(Math.ceil((mouseY - chessboardWrapper.offsetTop - 800) / GRID_SIZE));
      return { x, y };
    }
    return { x: 0, y: 0 };
  };

  const grabPiece = (e) => {
    const grabbedElement = e.target;
    if (!grabbedElement.classList.contains("chess-piece")) return;
    const currentPiecePos = calculateCurrentPos(e.pageX, e.pageY);
    setActivePiecePos(currentPiecePos);
    setActiveChessPiece(grabbedElement);
    const currentPiece = board.getPieceAt(currentPiecePos);
    if (currentPiece) {
      const possibleMoves = currentPiece.getPossibleMoves(board);
      setPossibleMoves(possibleMoves);
    }
    updateChessPieceLocation(grabbedElement, e.pageX, e.pageY);
  };

  const movePiece = (e) => {
    if (activeChessPiece) updateChessPieceLocation(activeChessPiece, e.pageX, e.pageY);
  };

  const dropPiece = (e) => {
    activeChessPiece?.style.removeProperty("z-index");
    const destPos = calculateCurrentPos(e.pageX, e.pageY);
    const currentPiece = board.getPieceAt(activePiecePos);
    if (currentPiece) {
      const isValidMove = currentPiece.isValidMove(destPos, board);
      if (isValidMove) {
        board.movePiece(activePiecePos, destPos);
        if (board.isGameOver()) {
          cleanUp();
          deleteGameOnFinish();
          setShowGameOverModal(true);
          return;
        }
        if (board.isPawnPromotionAllowed(currentPiece, destPos)) {
          cleanUp();
          setPromotionPiecePosition(destPos);
          setShowPawnPromotionModal(true);
          return;
        }
        board.togglePlayerTurn();
        setBoard(board.clone());
      } else {
        if (activeChessPiece) {
          activeChessPiece.style.position = "relative";
          activeChessPiece.style.removeProperty("top");
          activeChessPiece.style.removeProperty("left");
        }
      }
    }
    cleanUp();
  };

  const cleanUp = () => {
    setPossibleMoves([]);
    setActivePiecePos({ x: -1, y: -1 });
    setActiveChessPiece(null);
  };

  const onPawnPromotion = (pieceType) => {
    const piece = board.getPieceAt(promotionPiecePosition);
    if (piece && piece instanceof Pawn) {
      board.promotePawn(piece, pieceType);
      board.togglePlayerTurn();
      setBoard(board.clone());
      setPromotionPiecePosition({ x: -1, y: -1 });
    }
  };

  return (
    <div className="chessboard-wrapper" ref={chessboardWrapperRef}>
      <PawnPromotionModal
        show={showPawnPromotionModal}
        setShow={setShowPawnPromotionModal}
        onPawnPromotion={onPawnPromotion}
      />
      <GameOverModal show={showGameOverModal} setShow={setShowGameOverModal} />
      <StartNewGameModal />
      <div
        onMouseUp={(e) => dropPiece(e)}
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        ref={chessboardRef}
        id="chessboard"
      >
        {boardElements}
      </div>
    </div>
  );
};

export default Chessboard;
