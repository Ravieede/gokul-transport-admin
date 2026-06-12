// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import Drivers from './components/Drivers';
import Vehicles from './components/Vehicles';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import { getDrivers, getVehicles } from './api';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const d = await getDrivers();
        const v = await getVehicles();
        setDrivers(d);
        setVehicles(v);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleLoginSuccess = (loggedInUser) => setUser(loggedInUser);
  const handleLogout = () => setUser(null);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="app-main-container">
        {user && <Dashboard user={user} onLogout={handleLogout} />}

        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/home" /> : <AuthForm onLoginSuccess={handleLoginSuccess} />
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home drivers={drivers} vehicles={vehicles} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/drivers"
            element={
              <ProtectedRoute>
                <Drivers />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <Vehicles />
              </ProtectedRoute>
            }
          />

          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />

          <Route
            path="/aboutus"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contactus"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
