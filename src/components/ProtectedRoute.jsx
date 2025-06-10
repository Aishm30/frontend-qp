// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // No token, redirect to login
    return <Navigate to="/" replace />;
  }

  try {
    // Decode token to check role (you can use jwt-decode or a simple decode if token is simple)
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== 'admin') {
      // Not an admin
      return <Navigate to="/" replace />;
    }
  } catch (error) {
    // Invalid token
    return <Navigate to="/" replace />;
  }

  // Token exists and user is admin
  return children;
};

export default ProtectedRoute;
