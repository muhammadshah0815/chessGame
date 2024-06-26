# Chess Game

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Game Rules and Logic](#game-rules-and-logic)
- [To-Do List](#to-do-list)

## Introduction
This is a React-based chess game application that allows two players to play chess. The game supports basic chess rules, including pawn promotion, check, and checkmate detection. The user interface is built using React components, and the game logic is implemented in JavaScript.

## Features
- Play chess with a friend locally.
- Drag and drop functionality for moving pieces.
- Automatic pawn promotion to queen.
- Detection of check and checkmate.
- Display of captured pieces.
- Turn-based play with turn indication.

## Installation
To run this project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the project directory:**
    ```bash
    cd chessGame
    ```

3. **Install dependencies for both frontend and backend:**
    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

4. **Start the backend server:**
    ```bash
    cd backend
    npm start
    ```

5. **Start the frontend development server:**
    ```bash
    cd frontend
    npm start
    ```

## Usage
Once the development server is running, open your browser and navigate to `http://localhost:3000` to start playing the game.

## Project Structure
The project is divided into two main parts: the frontend and the backend.

### Frontend
The frontend is built with React and contains the following key files and directories:
- `src/components/ChessBoard.js`: The main component that handles the game logic and rendering of the chessboard.
- `src/components/ChessBoard.css`: The stylesheet for the chessboard and pieces.
- `public/images`: Directory containing the SVG files for the chess pieces.

### Backend
The backend is built with Node.js and Express.js. It is currently used to serve the frontend and can be extended to handle more complex game logic or player authentication in the future.

## Game Rules and Logic
The game currently supports the following rules and logic:

1. **Piece Movement**:
   - All standard chess piece movements are supported.
   - The game detects valid moves and highlights them.

2. **Pawn Promotion**:
   - Pawns are automatically promoted to queens when they reach the opposite end of the board.

3. **Check and Checkmate**:
   - The game detects check and checkmate situations and restricts moves that would leave the king in check.

4. **Captured Pieces**:
   - Captured pieces are displayed next to the board, indicating which player has captured which pieces.

## To-Do List
The following features and improvements are planned for future implementation:

1. **Enhanced Drag and Drop**:
   - Ensure pieces do not become transparent or leave a copy behind when dragged.

2. **Castling**:
   - Implement the castling move with proper checks.

3. **Winner Detection**:
   - Display a message when a player wins or if the game ends in a draw.

4. **Project Directory Structure**:
   - Refactor the code to separate logic and UI components for better organization.

5. **Threefold Repetition Rule**:
   - Implement the rule to detect and handle threefold repetition draws.

6. **Fifty-Move Rule**:
   - Implement the rule to detect and handle draws based on fifty moves without capture or pawn movement.

7. **Pawn Promotion Choice**:
   - Provide a UI for players to choose the piece when a pawn is promoted.

## Contributing
Contributions are welcome! Please fork the repository and submit pull requests for any features, bug fixes, or improvements.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.