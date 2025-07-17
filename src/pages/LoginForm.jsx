import React, { useState } from "react";
import "./LoginForm.css";
import { auth } from "../firebaseConfig"; // Ensure auth is correctly exported
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let userCredential;

      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const user = userCredential.user;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError("Authentication Failed: " + err.message);
    }
  };

  return (
    <div className="login-form-container">
      {/* Top Center Heading */}
      <h1 className="top-heading">🛕 Aaradhak</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isSignUp ? "Create Account" : "Login"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">
          {isSignUp ? "Sign Up" : "Login"}
        </button>

        <p className="toggle-mode">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
