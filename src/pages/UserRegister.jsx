import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Container, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setSubmitError('');
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Email is invalid';
    }
    if (!formData.password) errs.password = 'Password is required';
    if (!formData.confirmPassword) errs.confirmPassword = 'Confirm Password is required';
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      // ✅ Redirect immediately after successful registration
      navigate('/login');
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>User Registration</Typography>

      {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth label="Name *" name="name" value={formData.name} onChange={handleChange}
          margin="normal" error={!!errors.name} helperText={errors.name}
        />
        <TextField
          fullWidth label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange}
          margin="normal" error={!!errors.email} helperText={errors.email}
        />
        <TextField
          fullWidth label="Password *" name="password" type="password" value={formData.password} onChange={handleChange}
          margin="normal" error={!!errors.password} helperText={errors.password}
        />
        <TextField
          fullWidth label="Confirm Password *" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange}
          margin="normal" error={!!errors.confirmPassword} helperText={errors.confirmPassword}
        />

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default UserRegister;
