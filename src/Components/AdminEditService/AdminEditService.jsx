import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminEditService.css';
import AdminNavbar from '../Admin/Adim';

const AdminEditService = () => {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', price: '' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/services');
      setServices(res.data);
    } catch (err) {
      console.error('Failed to fetch services:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await axios.delete(`http://localhost:5000/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  const startEdit = (service) => {
    setEditingService(service._id);
    setForm({
      title: service.title,
      description: service.description,
      price: service.price || '',
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { title, description, price } = form;
    if (!title.trim() || !description.trim() || !price) {
      alert('All fields are required');
      return;
    }

    try {
      console.log("Updating service ID:", editingService);
      await axios.put(`http://localhost:5000/services/${editingService}`, {
        title,
        description,
        price: Number(price),
      });

      setEditingService(null);
      fetchServices();
    } catch (err) {
      console.error('Failed to update service:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-edit-container">
      <AdminNavbar />
      <h2>Manage Services</h2>
      {services.map((service) => (
        <div className="admin-service-card" key={service._id}>
          {editingService === service._id ? (
            <form className="edit-form" onSubmit={handleEditSubmit}>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
              />
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingService(null)}>Cancel</button>
            </form>
          ) : (
            <>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <p><strong>Price:</strong> KES {service.price}</p>
              <div className="image-preview">
                {service.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:5000${img}`}
                    alt="service"
                    className="thumb"
                  />
                ))}
              </div>
              <div className="action-buttons">
                <button onClick={() => startEdit(service)}>Edit</button>
                <button onClick={() => handleDelete(service._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminEditService;
