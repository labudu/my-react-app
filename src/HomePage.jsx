import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white/20 backdrop-blur-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white">SES Tracker</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Вийти
        </button>
      </header>

      {/* Main content */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-grow flex flex-col items-center justify-center text-center p-4"
      >
        <h2 className="text-4xl font-bold text-white mb-4">
          Вітаємо у системі відстеження СЕС!
        </h2>
        <p className="text-lg text-white/90 max-w-xl">
          Тут ви зможете керувати своїми проєктами, відстежувати об'єкти,
          переглядати статистику та аналізувати дані.
        </p>
      </motion.main>
    </div>
  );
}
