import bgImage from "../assets/board.png";
import { FaRobot } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineLiveTv } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-no-repeat bg-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
     <div className="relative z-50">
  <Navbar />
</div>
      <div className="relative z-10 px-6 md:px-12 py-8">

        {/* 🔷 HERO */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Welcome to <span className="text-purple-500">ChessMaster</span>
          </h1>

          <p className="text-gray-400 mt-4">
            Choose your mode and start your chess journey
          </p>
        </div>

        {/* 🔷 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* AI */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 text-center">
            <div className="bg-purple-600 p-4 rounded-xl inline-block mb-4">
              <FaRobot className="text-white" size={28} />
            </div>

            <h2 className="text-xl font-semibold mb-2 text-white">
              Play Against Computer
            </h2>
            <p className="text-gray-400 mb-6">
              Challenge the AI in different difficulty levels
            </p>

            <button
              onClick={() => navigate("/game")}
              className="w-full bg-purple-600 text-white hover:bg-purple-700 py-3 rounded-lg"
            >
              Play Now
            </button>
          </div>

          {/* PLAYER */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 text-center">
            <div className="bg-green-600 p-4 rounded-xl inline-block mb-4">
              <BsFillPeopleFill className="text-white" size={28} />
            </div>

            <h2 className="text-xl font-semibold mb-2 text-white">
              Play Against Player
            </h2>
            <p className="text-gray-400 mb-6">
              Play real-time chess with players around the world
            </p>

            <button
              onClick={() => navigate("/game")}
              className="w-full text-white bg-green-600 hover:bg-green-700 py-3 rounded-lg"
            >
              Find Opponent
            </button>
          </div>

          {/* STREAM */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 text-center">
            <div className="bg-orange-500 p-4 rounded-xl inline-block mb-4">
              <MdOutlineLiveTv className="text-white" size={28} />
            </div>

            <h2 className="text-xl font-semibold mb-2 text-white">
              Watch Streaming Games
            </h2>
            <p className="text-gray-400 mb-6">
              Watch live games from top players and streamers
            </p>

            <button className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-white rounded-lg">
              Watch Now
            </button>
          </div>
        </div>

        {/* 🔷 FEATURES */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          <div className="bg-white/10 p-6 rounded-xl">
            <h3 className="text-purple-400 font-semibold">Improve Skills</h3>
            <p className="text-gray-400 text-sm">Practice daily</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <h3 className="text-green-400 font-semibold">Community</h3>
            <p className="text-gray-400 text-sm">Play worldwide</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <h3 className="text-blue-400 font-semibold">Progress</h3>
            <p className="text-gray-400 text-sm">Track your games</p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl">
            <h3 className="text-yellow-400 font-semibold">Fair Play</h3>
            <p className="text-gray-400 text-sm">Secure gameplay</p>
          </div>

        </div>
      </div>
    </div>
  );
}