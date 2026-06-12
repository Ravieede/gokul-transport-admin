// src/components/AuthForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 added for redirect
import { registerUser, loginUser } from '../api';
import '../App.css';

const AuthForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate(); // 👈 initialize navigation

  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
    setMessage('');
    setError('');
  }, [isLoginView]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      if (isLoginView) {
        if (!email || !password) throw new Error("Please fill in all login details.");
        const response = await loginUser(email, password);
        setMessage("Login Successful! Redirecting...");
        setTimeout(() => {
          onLoginSuccess?.(response.user); // optional callback
          navigate('/home');               // 👈 redirect to Home.js
        }, 1500);
      } else {
        if (!name || !email || !password) throw new Error("Please fill in all registration details.");
        await registerUser(name, email, password);
        setMessage("Registration successful! Please login.");
        setTimeout(() => setIsLoginView(true), 2000);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <img src="/images/Gokul.png" alt="Gokul Logo" className="company-logo" />
      </div>

      <div className="gokul-brand">
        <h1 className="gokul-title">Gokul Transport</h1>
      </div>

      <h1 className="auth-title">
        {isLoginView ? 'Welcome Back!' : 'Create an Account'}
      </h1>

      <p className="auth-subtitle">
        {isLoginView ? 'Login to continue.' : 'Get started with us today!'}
      </p>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLoginView && (
          <div className="auth-field">
            <label htmlFor="name" className="auth-label">Name</label>
            <input
              id="name"
              className="auth-input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="auth-field">
          <label htmlFor="email" className="auth-label">Email Address</label>
          <input
            id="email"
            className="auth-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-field">
          <label htmlFor="password" className="auth-label">Password</label>
          <input
            id="password"
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-button" type="submit">
          {isLoginView ? 'Login' : 'Register'}
        </button>
      </form>

      {message && <div className="auth-message success">{message}</div>}
      {error && <div className="auth-message error">{error}</div>}

      <div className="auth-toggle">
        {isLoginView ? "Don't have an account?" : "Already have an account?"}
        <button onClick={() => setIsLoginView(!isLoginView)} className="auth-switch">
          {isLoginView ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
