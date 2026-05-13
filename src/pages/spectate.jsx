import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useWatchSocket from "../hooks/watchhook";
import SpectateBoard from "../components/spectateboard";
import { Chess } from "chess.js";
import Navbar from "../components/navbar";
import bgImage from "../assets/board.png";

export default function Spectate() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [moveList, setMoveList] = useState([]);
  const [turn, setTurn] = useState("w");
  const [premove, setPremove] = useState({});
  const [king_colour, setKing_colour] = useState("p");

  const handleSocketMessage = (message) => {
    switch (message.type) {
      // 🔥 when we join the game, initialize the board and move list
      case "joined_game":
         console.log("joined game with fen:", message.store);
        const game = new Chess(message?.store?.fen);
        setChess(game);
        setBoard(game.board());
        setMoveList(message?.store?.moveslist || []);
        setPremove({
          prefrom: message?.store?.from,
          preto: message?.store?.to
        });
       // setKing_colour(message?.store?.ischeck ? message?.store?.turn : 'p');
        break;
        // 🔥 when a new move is made in the game, update the board and move list
      case "new_move":
        const move = message?.move

        setChess(prev => {
          const updated = new Chess(prev.fen());
          updated.move(move);
          setBoard(updated.board());
          return updated;
        });

        setMoveList(message.moveslist || []);
       // setKing_colour(message?.ischeck ? message?.turn : 'p');
        setPremove(
          {
            prefrom: message?.from,
            preto: message?.to
          }
        )
        break;

      default:
        break;
    }
  };

  const socketRef = useWatchSocket(handleSocketMessage);

  // 🔥 join game room
  useEffect(() => {
    const socket = socketRef.current;

    if (!socket) return;

    const joinGame = () => {
      socket.send(JSON.stringify({
        type: "join_game",
        gameId
      }));
    };

    if (socket.readyState === WebSocket.OPEN) {
      joinGame();
    } else {
      socket.addEventListener("open", joinGame);
    }

    return () => {
      socket.removeEventListener("open", joinGame);
    };
  }, [socketRef]);

  return (
    <div
      className="h-screen w-full relative text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover"
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 flex flex-col h-full">

        <Navbar />

        {/* 🔥 BACK BUTTON */}
        <div className="p-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-700 rounded"
          >
            ← Back
          </button>
        </div>

        <div className="flex flex-1">

          {/* BOARD */}
          <div className="flex-1 flex items-center justify-center">
            <SpectateBoard
              board={board}
              chess={chess}
              premove={premove}
              turn={turn}
              kingcolour={king_colour}
            />
          </div>

          {/* MOVES */}
          <div className="w-64 p-4 overflow-y-auto bg-black/40">
            <h2 className="text-purple-400 mb-2">Moves</h2>

            {moveList.map((move, i) => (
              <div key={i}>{move}</div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}