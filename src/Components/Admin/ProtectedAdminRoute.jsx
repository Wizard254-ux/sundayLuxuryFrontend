import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  console.log('found admin ',localStorage.getItem('isAdmin'))
  return isAdmin ? children : <Navigate to="/admin" replace />;
};

export default ProtectedAdminRoute;
