import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chessboard from 'chessboardjsx';

const socket = io('http://localhost:5000');

const ChessBoard = ({ gameId, userId }) => {
    const [position, setPosition] = useState({
        'r': ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        'p': ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        '-': ['-', '-', '-', '-', '-', '-', '-', '-'],
        'P': ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        'R': ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    });

    useEffect(() => {
        socket.emit('join', { gameId, userId });

        socket.on('move', (data) => {
            if (data.gameId === gameId) {
                const newPosition = { ...position };
                newPosition[data.end.y][data.end.x] = newPosition[data.start.y][data.start.x];
                newPosition[data.start.y][data.start.x] = '-';
                setPosition(newPosition);
            }
        });

        return () => {
            socket.off('move');
        };
    }, [gameId, userId, position]);

    const onDrop = ({ sourceSquare, targetSquare }) => {
        const [startX, startY] = [sourceSquare.charCodeAt(0) - 97, 8 - parseInt(sourceSquare[1])];
        const [endX, endY] = [targetSquare.charCodeAt(0) - 97, 8 - parseInt(targetSquare[1])];

        const move = { start: { x: startX, y: startY }, end: { x: endX, y: endY } };
        socket.emit('move', { gameId, move, userId });

        const newPosition = { ...position };
        newPosition[endY][endX] = newPosition[startY][startX];
        newPosition[startY][startX] = '-';
        setPosition(newPosition);
    };

    return <Chessboard position={position} onDrop={onDrop} />;
};

export default ChessBoard;
