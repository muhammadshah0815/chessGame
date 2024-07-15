import Chessboard from "../../components/Chessboard/Chessboard";
import GameSettingsBoard from "../../components/GameSettingsBoard/GameSettingsBoard";
import Header from "../../components/Header/Header";
import "./ChessGame.css";


const ChessGame = () => {
  return (
    <div className="chess-game-page">
      <Header />
      <div className="chess-game">
        <Chessboard />
        <GameSettingsBoard />
      </div>
    </div>
  );
};

export default ChessGame;
