import { PieceType, Color } from '../helpers/Constants';

export class Piece {
  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  save() {
    return {
      type: this.constructor.name,
      position: this.position,
      color: this.color
    };
  }

  static load(data) {
    const { type, position, color } = data;
    switch (type) {
      case 'Pawn': {
        const { Pawn } = require('./Pawn');
        return new Pawn(position, color);
      }
      case 'Rook': {
        const { Rook } = require('./Rook');
        return new Rook(position, color);
      }
      case 'Knight': {
        const { Knight } = require('./Knight');
        return new Knight(position, color);
      }
      case 'Bishop': {
        const { Bishop } = require('./Bishop');
        return new Bishop(position, color);
      }
      case 'Queen': {
        const { Queen } = require('./Queen');
        return new Queen(position, color);
      }
      case 'King': {
        const { King } = require('./King');
        return new King(position, color);
      }
      default:
        throw new Error(`Unknown piece type: ${type}`);
    }
  }
}
