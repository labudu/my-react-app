import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import bcrypt from "bcryptjs";

export default function AuthPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    login: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(true); // true = реєстрація, false = вхід
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Реєстрація нового користувача
  const registerUser = async () => {
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const { error } = await supabase.from("user_site").insert([
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.login,
        password: hashedPassword,
      },
    ]);

    if (error) throw new Error(error.message);
  };

  // Логін користувача
  const loginUser = async () => {
    const { data, error } = await supabase
      .from("user_site")
      .select("*")
      .eq("email", formData.login)
      .single();

    if (error || !data) throw new Error("Користувача не знайдено");

    const passwordMatch = await bcrypt.compare(formData.password, data.password);
    if (!passwordMatch) throw new Error("Невірний пароль");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        await registerUser();
      } else {
        await loginUser();
      }
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  const inputVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 via-cyan-400 to-emerald-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 border border-white/30"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          SES Tracker — {isRegister ? "Реєстрація" : "Вхід"}
        </h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <motion.input
                custom={0}
                variants={inputVariant}
                initial="hidden"
                animate="visible"
                type="text"
                name="firstName"
                placeholder="Ім’я"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/80 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <motion.input
                custom={1}
                variants={inputVariant}
                initial="hidden"
                animate="visible"
                type="text"
                name="lastName"
                placeholder="Прізвище"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/80 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </>
          )}

          <motion.input
            custom={2}
            variants={inputVariant}
            initial="hidden"
            animate="visible"
            type="text"
            name="login"
            placeholder="Логін або Email"
            value={formData.login}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/80 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <motion.input
            custom={3}
            variants={inputVariant}
            initial="hidden"
            animate="visible"
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/80 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300"
          >
            {isRegister ? "Зареєструватися" : "Увійти"}
          </motion.button>
        </form>

        <p className="text-center text-white mt-4">
          {isRegister ? "Вже є акаунт?" : "Ще немає акаунту?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="underline text-yellow-300"
          >
            {isRegister ? "Увійти" : "Зареєструватися"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
