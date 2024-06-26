const clients = new Map();

const setupWebSocket = (wss) => {
    wss.on('connection', (ws) => {
        ws.on('message', async (message) => {
            const data = JSON.parse(message);
            if (data.type === 'join') {
                clients.set(data.userId, ws);
            } else if (data.type === 'move') {
                const game = await Game.findById(data.gameId);
                if (game && isValidMove(game.board, data.start, data.end)) {
                    game.board[data.end.y][data.end.x] = game.board[data.start.y][data.start.x];
                    game.board[data.start.y][data.start.x] = '';
                    game.moves.push({ start: data.start, end: data.end });
                    await game.save();
                    broadcastMove(game, data.start, data.end);
                }
            }
        });
    });
};

const broadcastMove = (game, start, end) => {
    game.players.forEach((playerId) => {
        const client = clients.get(playerId);
        if (client) {
            client.send(JSON.stringify({ type: 'move', gameId: game._id, start, end }));
        }
    });
};

module.exports = { setupWebSocket };
