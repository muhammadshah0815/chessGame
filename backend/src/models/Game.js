const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  board: {
    type: Array,
    default: [
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ]
  },
  turn: {
    type: String,
    default: 'white'
  },
  enPassant: {
    type: Object,
    default: null
  },
  kingMoved: {
    type: Object,
    default: { white: false, black: false }
  },
  rookMoved: {
    type: Object,
    default: {
      white: { queenside: false, kingside: false },
      black: { queenside: false, kingside: false }
    }
  },
  whiteTaken: {
    type: Array,
    default: []
  },
  blackTaken: {
    type: Array,
    default: []
  },
  winner: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Game', gameSchema);
