import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSettings.css';

const AdminSettings = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) {
      setCurrentEmail(storedEmail);
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/admin/update', {
        currentEmail,
        currentPassword,
        newEmail,
        newPassword,
      });

      setMessage(res.data.message);

      // If email was updated, update it in localStorage
      if (newEmail) {
        localStorage.setItem('adminEmail', newEmail);
      }

      // Clear form
      setCurrentPassword('');
      setNewEmail('');
      setNewPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="admin-settings">
      <h2>Update Admin Credentials</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleUpdate}>
        <input
          type="email"
          placeholder="Current Email"
          value={currentEmail}
          onChange={(e) => setCurrentEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="New Email (optional)"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password (optional)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Update Credentials</button>
      </form>
    </div>
  );
};

export default AdminSettings;
