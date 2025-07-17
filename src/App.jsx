// React and Router Imports
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Page Components
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/DashBoard";
import TopTemples from "./pages/TopTemples";
import PlanTour from "./pages/PlanTour";
import Bookings from "./pages/Bookings";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import PrivateRoute from "./pages/PrivateRoute";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import TempleDetails from "./pages/TempleDetails";

// Styles
import "./App.css";

function App() {
  const location = useLocation();

  // Hide Navbar and Footer on Login page
  const isLoginPage = location.pathname === "/";
  const showNavbar = !isLoginPage;
  const showFooter = !isLoginPage;

  return (
    <div className="app-container">
      {/* Show Navbar on all routes except Login */}
      {showNavbar && <Navbar />}

      <main className="main-content">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/top-temples"
            element={
              <PrivateRoute>
                <TopTemples />
              </PrivateRoute>
            }
          />
          <Route
            path="/plan-tour"
            element={
              <PrivateRoute>
                <PlanTour />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <PrivateRoute>
                <Bookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/temples/:slug"
            element={
              <PrivateRoute>
                <TempleDetails />
              </PrivateRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Show Footer on all routes except Login */}
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
