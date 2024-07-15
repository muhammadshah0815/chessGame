import { Pawn } from './Pawn';
import { Rook } from './Rook';
import { Knight } from './Knight';
import { Bishop } from './Bishop';
import { Queen } from './Queen';
import { King } from './King';
import { Color, PieceType } from '../helpers/Constants';

export class Board {
  constructor() {
    this._boardState = this.initializeEmptyBoard();
    this._fallenPieces = [];
    this.playerTurn = Color.WHITE;
    this.populateInitialPositions();
  }

  initializeEmptyBoard() {
    return Array.from({ length: 8 }, () => Array(8).fill(null));
  }

  populateInitialPositions() {
    const setup = [
      { class: Rook, positions: [[0, 0], [7, 0], [0, 7], [7, 7]] },
      { class: Knight, positions: [[1, 0], [6, 0], [1, 7], [6, 7]] },
      { class: Bishop, positions: [[2, 0], [5, 0], [2, 7], [5, 7]] },
      { class: Queen, positions: [[3, 0], [3, 7]] },
      { class: King, positions: [[4, 0], [4, 7]] }
    ];
    setup.forEach(({ class: PieceClass, positions }) => {
      positions.forEach(([x, y]) => {
        const color = y === 0 ? Color.WHITE : Color.BLACK;
        this._boardState[x][y] = new PieceClass({ x, y }, color);
      });
    });
    for (let i = 0; i < 8; i++) {
      this._boardState[i][1] = new Pawn({ x: i, y: 1 }, Color.WHITE);
      this._boardState[i][6] = new Pawn({ x: i, y: 6 }, Color.BLACK);
    }
  }

  save() {
    return {
      boardState: this._boardState.map(row => row.map(piece => piece ? piece.save() : null)),
      fallenPieces: this._fallenPieces.map(piece => piece.save()),
      playerTurn: this.playerTurn
    };
  }

  static load(data) {
    const board = new Board();
    board._boardState = data.boardState.map(row => row.map(piece => piece ? Piece.load(piece) : null));
    board._fallenPieces = data.fallenPieces.map(piece => Piece.load(piece));
    board.playerTurn = data.playerTurn;
    return board;
  }

  getPieceAt(position) {
    return this.isTileValid(position) ? this._boardState[position.x][position.y] : undefined;
  }

  isGameOver() {
    const kings = this._fallenPieces.filter(piece => piece instanceof King);
    return kings.length > 0;
  }

  resetBoard() {
    this._boardState = this.initializeEmptyBoard();
    this._fallenPieces = [];
    this.playerTurn = Color.WHITE;
    this.populateInitialPositions();
  }

  movePiece(src, dest) {
    const piece = this.getPieceAt(src);
    const destPiece = this.getPieceAt(dest);
    if (destPiece) {
      this._fallenPieces.push(destPiece);
    }
    if (!piece) {
      throw new Error("No piece found at source position");
    }
    this._boardState[src.x][src.y] = null;
    this._boardState[dest.x][dest.y] = piece;
    piece.position = dest;
  }

  isTileOccupied(pos) {
    return !!this.getPieceAt(pos);
  }

  isTileOccupiedByOpponent(pos, pieceColor) {
    const piece = this.getPieceAt(pos);
    return !!piece && piece.color !== pieceColor;
  }

  isTileValid(pos) {
    return pos.x >= 0 && pos.x < 8 && pos.y >= 0 && pos.y < 8;
  }

  createPieceByType(type, position, color) {
    switch (type) {
      case PieceType.PAWN:
        return new Pawn(position, color);
      case PieceType.ROOK:
        return new Rook(position, color);
      case PieceType.KNIGHT:
        return new Knight(position, color);
      case PieceType.BISHOP:
        return new Bishop(position, color);
      case PieceType.QUEEN:
        return new Queen(position, color);
      case PieceType.KING:
        return new King(position, color);
      default:
        throw new Error("Unknown piece type: " + type);
    }
  }

  clone() {
    const boardState = this._boardState.map(row => row.map(piece => piece ? piece.clone() : null));
    const fallenPieces = this._fallenPieces.map(piece => piece.clone());
    return new Board(null, boardState, fallenPieces, this.playerTurn);
  }
}
