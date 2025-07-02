import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminStatistic.css';
import AdminNavbar from '../Admin/Adim';
import axios from 'axios';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminStatistic = () => {
  const navigate = useNavigate();
  const user = { role: 'admin' };

  const [stats, setStats] = useState({
    totalAppointments: 0,
    approved: 0,
    pending: 0,
    cancelled: 0,
    totalClients: 0,
  });

  useEffect(() => {
    if (user.role !== 'admin') {
      alert('Access Denied. Admins only.');
      navigate('/');
      return;
    }

    // Fetch live stats from backend
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch statistics:', err);
      }
    };

    fetchStats();
  }, [navigate, user.role]);

  const data = {
    labels: ['Approved', 'Pending', 'Cancelled', 'Clients'],
    datasets: [
      {
        label: 'Count',
        data: [stats.approved, stats.pending, stats.cancelled, stats.totalClients],
        backgroundColor: ['#4caf50', '#ffc107', '#f44336', '#2196f3'],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Appointment & Client Stats' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="admin-statistic-container">
      <AdminNavbar />

      <h2 className="title">📊 Admin Dashboard</h2>

      <div className="stat-grid">
        <div className="stat-card">Total Appointments: <span>{stats.totalAppointments}</span></div>
        <div className="stat-card">Approved: <span>{stats.approved}</span></div>
        <div className="stat-card">Pending: <span>{stats.pending}</span></div>
        <div className="stat-card">Cancelled: <span>{stats.cancelled}</span></div>
        <div className="stat-card">Total Clients: <span>{stats.totalClients}</span></div>
      </div>

      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AdminStatistic;
