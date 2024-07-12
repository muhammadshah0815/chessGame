const express = require('express');
const Game = require('../models/Game');

const router = express.Router();

router.get('/new', async (req, res) => {
  try {
    const game = new Game();
    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/move/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });

    const { startRow, startCol, endRow, endCol } = req.body;
    const piece = game.board[startRow][startCol];
    game.board[startRow][startCol] = '';
    game.board[endRow][endCol] = piece;

    // Update taken pieces
    if (game.board[endRow][endCol] !== '') {
      if (piece === piece.toUpperCase()) {
        game.blackTaken.push(game.board[endRow][endCol]);
      } else {
        game.whiteTaken.push(game.board[endRow][endCol]);
      }
    }

    // Update turn
    game.turn = game.turn === 'white' ? 'black' : 'white';

    // Update moved state for king and rooks
    if (piece.toLowerCase() === 'k') {
      game.kingMoved[game.turn === 'white' ? 'black' : 'white'] = true;
    }
    if (piece.toLowerCase() === 'r') {
      if (startCol === 0) game.rookMoved[game.turn === 'white' ? 'black' : 'white'].queenside = true;
      if (startCol === 7) game.rookMoved[game.turn === 'white' ? 'black' : 'white'].kingside = true;
    }

    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
