import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import "./Home.css"; // 👉 Make sure this file exists

function Home() {
  return (
    <div className="home-background">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">🛕 Aaradhana</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      {/* Animated Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="welcome-section"
      >
        <h2 className="welcome-title">Welcome to Temple Tour Planner</h2>
        <p className="welcome-subtitle">Plan your next spiritual journey with ease ✨</p>
      </motion.div>

      {/* Login Form */}
      <div className="login-box">
        <LoginForm />
      </div>
    </div>
  );
}

export default Home;
