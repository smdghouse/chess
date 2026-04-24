import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Profile", path: "/profile" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "History", path: "/history" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <div className="relative z-50 flex justify-between items-center px-6 py-4 bg-black/30 backdrop-blur-md text-white border-b border-white/10">

        {/* LOGO */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          Chess<span className="text-purple-500">Master</span>
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-gray-300">
          {navItems.map((item) => (
            <span
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer pb-1 transition ${
                location.pathname === item.path
                  ? "text-purple-400 border-b-2 border-purple-500"
                  : "hover:text-white"
              }`}
            >
              {item.name}
            </span>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* USER */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              M
            </div>
            <span className="text-sm">User</span>
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* 🔥 MOBILE SLIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] bg-[#0B1220] z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* CLOSE */}
        <div className="flex justify-end p-4">
          <button
            className="text-2xl text-white"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col gap-6 px-6 text-gray-300 text-lg">
          {navItems.map((item) => (
            <span
              key={item.name}
              onClick={() => {
                navigate(item.path);
                setMenuOpen(false);
              }}
              className={`cursor-pointer ${
                location.pathname === item.path
                  ? "text-purple-400"
                  : "hover:text-white"
              }`}
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
}