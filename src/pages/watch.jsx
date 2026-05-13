import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/board.png";
import useWatchSocket from "../hooks/watchhook";
import Navbar from "../components/navbar";
export default function LiveGames() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const handleSocketMessage = (message) => {
    if (message.type === "gamelist") {
      setGames(message.games)
    }
    if (message.type === "new_gameid") {
      setGames(prev => [...prev, message.gameId])
    }
  }
  const socketRef = useWatchSocket(handleSocketMessage)
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const sendJoin = () => {
      socket.send(JSON.stringify({ type: "listclients" }));
    };

    if (socket.readyState === WebSocket.OPEN) {
      sendJoin();
    } else {
      socket.addEventListener("open", sendJoin);
    }

    return () => {
      socket.removeEventListener("open", sendJoin);
    };
  }, [socketRef]);
  return (
    <div
      className="min-h-screen w-full bg-no-repeat bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <Navbar />
      {/* SAME OVERLAY */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 px-6 md:px-12 py-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">
            Live <span className="text-purple-500">Games</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Watch players battle in real-time
          </p>
        </div>

        {/* GAMES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {games.length === 0 && (
            <p className="text-gray-400 text-center col-span-full">
              No live games right now
            </p>
          )}

          {games.map((game) => (
            <div
              key={game}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 cursor-pointer hover:bg-white/20 transition"
            >
              <h2 className="text-lg font-semibold text-white mb-2">
                {game}
              </h2>

              <p className="text-gray-400 text-sm mb-4">
                Live match in progress
              </p>

              <button
                onClick={() => navigate(`/watch/${game}`)}
                className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-white">
                Watch Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}