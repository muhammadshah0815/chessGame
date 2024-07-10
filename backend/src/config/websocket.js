const socketIo = require('socket.io');

const initWebSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('New WebSocket connection: ', socket.id);

        socket.on('disconnect', () => {
            console.log('WebSocket disconnected: ', socket.id);
        });

        socket.on('joinGame', ({ gameId }) => {
            socket.join(gameId);
            console.log(`Socket ${socket.id} joined game ${gameId}`);
        });

        socket.on('makeMove', (move) => {
            console.log(`Move made in game ${move.gameId} by socket ${socket.id}`);
            socket.to(move.gameId).emit('gameMove', move);
        });
    });
};

module.exports = initWebSocket;
