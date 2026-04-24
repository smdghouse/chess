import { FaChessKnight } from "react-icons/fa";

export default function ConnectingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">

      {/* Icon */}
      <div className="bg-purple-600 p-6 rounded-full mb-6 animate-pulse shadow-lg">
        <FaChessKnight size={40} />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-semibold mb-2">
        Connecting to Server...
      </h1>

      {/* Subtext */}
      <p className="text-gray-400 mb-8">
        Setting up your game environment
      </p>

      {/* Loader */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-300"></div>
      </div>

    </div>
  );
}