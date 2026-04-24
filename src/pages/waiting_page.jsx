import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";

export default function WaitingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // TEMP: simulate match found
    const timer = setTimeout(() => {
      navigate("/game");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">

      {/* Icon */}
      <div className="bg-purple-600 p-6 rounded-full mb-6 animate-pulse shadow-lg">
        <BsFillPeopleFill size={40} />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-semibold mb-2">
        Waiting for Opponent...
      </h1>

      {/* Subtext */}
      <p className="text-gray-400 mb-8">
        We are finding the best match for you
      </p>

      {/* Loader dots */}
      <div className="flex gap-2 mb-8">
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Cancel Button */}
      <button
        onClick={() => navigate("/home")}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
      >
        Cancel
      </button>
    </div>
  );
}