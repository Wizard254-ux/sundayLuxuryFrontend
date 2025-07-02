import React, { useEffect, useState } from 'react';
import './AdminAppointment.css';
import AdminNavbar from '../Admin/Adim';
import axios from 'axios';

const AdminAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);
  
  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/appointments');
      setAppointments(res.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/appointments/${id}`, { status: 'approved' });
      fetchAppointments();
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:5000/appointments/${id}`, { status: 'cancelled' });
      fetchAppointments();
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div className="admin-appointment-container">
      <AdminNavbar />
      <h2>Appointments</h2>

      <div className="appointment-table">
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td data-label="Client Name">{appt.name}</td>
                <td data-label="Phone">{appt.phone}</td>
                <td data-label="Service">{appt.service}</td>
                <td data-label="Date">{appt.date}</td>
                <td data-label="Time">{appt.time}</td>
                <td data-label="Status">
                  <span className={`status-tag ${appt.status}`}>
                    {appt.status}
                  </span>
                </td>
                <td data-label="Actions">
                  {appt.status === 'pending' && (
                    <>
                      <button className="approve-btn" onClick={() => handleApprove(appt._id)}>
                        Approve
                      </button>
                      <button className="cancel-btn" onClick={() => handleCancel(appt._id)}>
                        Cancel
                      </button>
                    </>
                  )}
                  {appt.status === 'approved' && (
                    <button className="cancel-btn" onClick={() => handleCancel(appt._id)}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr><td colSpan="7">No appointments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointment;
