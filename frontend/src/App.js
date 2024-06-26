import React, { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
    const [gameId, setGameId] = useState(null);
    const [userId, setUserId] = useState('');

    const createGame = async () => {
        const response = await fetch('http://localhost:5000/api/games/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ player1: userId, player2: 'opponentId' })
        });
        const data = await response.json();
        setGameId(data.gameId);
    };

    return (
        <div>
            <h1>Chess Game</h1>
            {userId ? (
                <>
                    {gameId ? (
                        <ChessBoard gameId={gameId} userId={userId} />
                    ) : (
                        <button onClick={createGame}>Create Game</button>
                    )}
                </>
            ) : (
                <>
                    <Login setUserId={setUserId} />
                    <Register />
                </>
            )}
        </div>
    );
};

export default App;
