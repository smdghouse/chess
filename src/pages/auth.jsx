import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import bgImage from "../assets/board.png";
import { FaRobot } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineLiveTv } from "react-icons/md";
import { Navigate } from "react-router-dom";



export default function Auth() {
  const token = localStorage.getItem("token");

if (token) {
  return <Navigate to="/home" />;
}
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    userName: "",
    emailorusername: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlelogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        emailorusername: form.emailorusername,
        password: form.password,
      });

      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userid", res.data.userid);
      navigate("/home");
    } catch (error) {
      const message =
        error.response?.data?.message || "something went wrong";
      toast.error(message);
    }
  };

  const handlesignup = async () => {
    try {
      const res = await api.post("/auth/register", {
        userName: form.userName,
        email: form.email,
        password: form.password,
      });

      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userid", res.data.userid);
      navigate("/home");
    } catch (error) {
      const message =
        error.response?.data?.message || "something went wrong";
      toast.error(message);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">

        {/* LEFT SIDE */}
        <div className="max-w-lg text-center md:text-left">

          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            Think. Plan.
          </h1>

          <h1 className="text-5xl md:text-6xl font-bold text-purple-500 mb-6">
            ChessMaster
          </h1>

          <p className="text-gray-300 text-lg mb-10">
           Join ChessMaster and challenge players, compete in real-time, and improve your chess skills every day.
          </p>

          {/* FEATURE CARDS */}
          <div className="flex gap-6 justify-center md:justify-start">

            {/* PLAY ONLINE */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
               <BsFillPeopleFill size={28} className="text-purple-500" />
              </div>
              <p className="mt-2 text-sm text-gray-300">Play Online</p>
              <span className="text-xs text-gray-500">
                Challenge players worldwide
              </span>
            </div>

            {/* PLAY VS AI */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
                <FaRobot size={28} className="text-purple-500" />
              </div>
              <p className="mt-2 text-sm text-gray-300">Play vs AI</p>
              <span className="text-xs text-gray-500">
                Improve with different levels
              </span>
            </div>

            {/* WATCH GAMES */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
                <MdOutlineLiveTv size={28} className="text-purple-500" />
              </div>
              <p className="mt-2 text-sm text-gray-300">Watch Games</p>
              <span className="text-xs text-gray-500">
                Learn from top players
              </span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE (AUTH CARD) */}
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-xl shadow-2xl">

          <h2 className="text-2xl font-semibold mb-6 text-center">
            {isSignup ? "Register" : "Login"}
          </h2>

          {isSignup && (
            <input
              name="userName"
              placeholder="Username"
              className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20 outline-none"
              onChange={handlechange}
            />
          )}

          {isSignup ? (
            <input
              name="email"
              placeholder="Email"
              className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20 outline-none"
              onChange={handlechange}
            />
          ) : (
            <input
              name="emailorusername"
              placeholder="Email or Username"
              className="w-full p-3 mb-3 rounded bg-white/10 border border-white/20 outline-none"
              onChange={handlechange}
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded bg-white/10 border border-white/20 outline-none"
            onChange={handlechange}
          />

          <button
            onClick={isSignup ? handlesignup : handlelogin}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg mb-4 transition font-semibold"
          >
            {isSignup ? "Register" : "Login"}
          </button>

          <div className="text-center text-gray-400 mb-3">
            or
          </div>

          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm text-purple-400 hover:underline w-full text-center"
          >
            {isSignup
              ? "Already have account? Login"
              : "Create account"}
          </button>
        </div>
      </div>
    </div>
  );
}