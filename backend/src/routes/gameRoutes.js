const express = require('express');
const { createGame, makeMove } = require('../controllers/gameController');
const router = express.Router();

router.post('/create', createGame);
router.post('/move', makeMove);

module.exports = router;
