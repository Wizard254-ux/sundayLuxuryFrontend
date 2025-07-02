// frontend/components/LoginRegister.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/register', form);
      setMessage(res.data.message || 'Registered successfully');
      setIsLogin(true);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email: form.email,
        password: form.password
      });

      localStorage.setItem('token', res.data.token);
      setMessage('');
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className={`auth-box ${isLogin ? 'show-login' : 'show-register'}`}>
          <div className="auth-tabs">
            <button onClick={() => { setIsLogin(true); setMessage(''); }} className={isLogin ? 'active' : ''}>Login</button>
            <button onClick={() => { setIsLogin(false); setMessage(''); }} className={!isLogin ? 'active' : ''}>Register</button>
          </div>

          {message && <div className="auth-message">{message}</div>}

          <div className="auth-panels">
            {/* Login Form */}
            <div className="auth-panel login-panel">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />

                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required />

                <button type="submit" className="auth-btn login-btn">Log In</button>
              </form>
            </div>

            {/* Register Form */}
            <div className="auth-panel register-panel">
              <h2>Register</h2>
              <form onSubmit={handleRegister}>
                <label>Full Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />

                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required />

                <button type="submit" className="auth-btn register-btn">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
