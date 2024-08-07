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
    game.turn = game.turn === 'white' ? 'black' : 'white';

    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
