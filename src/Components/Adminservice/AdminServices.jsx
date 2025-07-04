import React, { useState } from 'react';
import axios from 'axios';
import './AdminServices.css';
import AdminNavbar from '../Admin/Adim'; // Check that 'Adim' is correctly exported

const AdminServices = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleAddService = async () => {
    if (!title || !description || !price || images.length === 0) {
      return alert('Please fill in all fields and upload images');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    images.forEach((img) => formData.append('images', img));

    try {
      setLoading(true);
      await axios.post('https://sundayluxury.onrender.com/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTitle('');
      setDescription('');
      setPrice('');
      setImages([]);
      alert('Service added successfully!');
    } catch (error) {
      console.error('Error adding service:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="admin-services" id="add-service">
        <h2>Add New Service</h2>
        <div className="form-section">
          <input
            type="text"
            placeholder="Service Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Service Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="number"
            placeholder="Service Price (KES)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={handleAddService} disabled={loading}>
            {loading ? 'Adding...' : 'Add Service'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminServices;
