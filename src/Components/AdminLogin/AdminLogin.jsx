import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/admin/login', form);
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminEmail', res.data.admin.email);
      navigate('/admin-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h2>Admin Login</h2>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default AdminLogin;
