export const GRID_SIZE = 100;
export const GRID_CENTER = 50;

export const PieceType = {
  PAWN: "pawn",
  BISHOP: "bishop",
  KNIGHT: "knight",
  ROOK: "rook",
  QUEEN: "queen",
  KING: "king",
};

export const Color = {
  BLACK: "b",
  WHITE: "w",
};

export const intialChessPieces = () => {
  const pieces = [];
  for (let p = 0; p < 2; p++) {
    const color = p === 0 ? Color.BLACK : Color.WHITE;
    const type = color === Color.BLACK ? "b" : "w";
    const y = p === 0 ? 7 : 0;

    pieces.push(
      {
        image: `assets/images/rook_${type}.png`,
        position: { x: 0, y: y },
        type: PieceType.ROOK,
        color: color,
      },
      {
        image: `assets/images/rook_${type}.png`,
        position: { x: 7, y: y },
        type: PieceType.ROOK,
        color: color,
      },
      {
        image: `assets/images/knight_${type}.png`,
        position: { x: 1, y: y },
        type: PieceType.KNIGHT,
        color: color,
      },
      {
        image: `assets/images/knight_${type}.png`,
        position: { x: 6, y: y },
        type: PieceType.KNIGHT,
        color: color,
      },
      {
        image: `assets/images/bishop_${type}.png`,
        position: { x: 2, y: y },
        type: PieceType.BISHOP,
        color: color,
      },
      {
        image: `assets/images/bishop_${type}.png`,
        position: { x: 5, y: y },
        type: PieceType.BISHOP,
        color: color,
      },
      {
        image: `assets/images/queen_${type}.png`,
        position: { x: 3, y: y },
        type: PieceType.QUEEN,
        color: color,
      },
      {
        image: `assets/images/king_${type}.png`,
        position: { x: 4, y: y },
        type: PieceType.KING,
        color: color,
      }
    );
  }

  for (let i = 0; i < 8; i++) {
    pieces.push({
      image: "assets/images/pawn_b.png",
      position: { x: i, y: 6 },
      type: PieceType.PAWN,
      color: Color.BLACK,
    });
  }

  for (let i = 0; i < 8; i++) {
    pieces.push({
      image: "assets/images/pawn_w.png",
      position: { x: i, y: 1 },
      type: PieceType.PAWN,
      color: Color.WHITE,
    });
  }

  return pieces;
};

export const PieceCharachteristics = (type, color, position) => ({
  type,
  color,
  position,
});

export const BoardState = (pieces) => {
  const state = [];
  for (let i = 0; i < 8; i++) {
    state.push([]);
    for (let j = 0; j < 8; j++) {
      state[i].push(undefined);
    }
  }
  pieces.forEach((piece) => {
    state[piece.position.x][piece.position.y] = piece;
  });
  return state;
};
