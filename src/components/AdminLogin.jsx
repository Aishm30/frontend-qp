import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      if (res.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: 400,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>

        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
