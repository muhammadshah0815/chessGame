const Game = require('../models/Game');

exports.createGame = async (req, res) => {
    const { player1, player2 } = req.body;
    try {
        const game = new Game({ players: [player1, player2], moves: [], board: initializeBoard() });
        await game.save();
        res.status(201).json({ gameId: game._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.makeMove = async (req, res) => {
    const { gameId, move } = req.body;
    try {
        const game = await Game.findById(gameId);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        const { start, end } = move;
        if (isValidMove(game.board, start, end)) {
            game.board[end.x][end.y] = game.board[start.x][start.y];
            game.board[start.x][start.y] = '';
            game.moves.push(move);
            await game.save();
            res.status(200).json({ message: 'Move made successfully' });
        } else {
            res.status(400).json({ message: 'Invalid move' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const initializeBoard = () => {
    return [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];
};
