import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  MenuItem,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddQp = () => {
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!subject || !year || !semester || !file) {
      setError('Please fill in all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('subject', subject);
    formData.append('year', year);
    formData.append('semester', semester);
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/question-papers', formData);
      alert('Question paper added successfully!');
      setSubject('');
      setYear('');
      setSemester('');
      setFile(null);
    } catch (err) {
      console.error('Error uploading QP:', err);
      setError('Failed to add question paper.');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* AppBar with Home Icon */}
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <IconButton onClick={() => navigate('/dashboard')} color="primary">
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Centered Form */}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Paper sx={{ p: 4, width: 400 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Add Question Paper
          </Typography>

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Subject"
              fullWidth
              margin="normal"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <TextField
              label="Year"
              fullWidth
              margin="normal"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              type="number"
              inputProps={{ min: 2000, max: 2099 }}
            />

            <TextField
              label="Semester"
              select
              fullWidth
              margin="normal"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <MenuItem key={sem} value={sem}>
                  Semester {sem}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ my: 2 }}
            >
              Upload File
              <input
                type="file"
                hidden
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>

            <Button type="submit" variant="contained" fullWidth>
              Add
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddQp;
