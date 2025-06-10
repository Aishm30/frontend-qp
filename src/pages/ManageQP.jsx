import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  Container,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HomeIcon from '@mui/icons-material/Home';

const ManageQP = () => {
  const [groupedQPs, setGroupedQPs] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all question papers grouped by subject
  const fetchData = async () => {
    try {
      setError('');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/question-papers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admintoken')}`
        }
      });

      const grouped = {};
      res.data.forEach((qp) => {
        if (!grouped[qp.subject]) {
          grouped[qp.subject] = [];
        }
        grouped[qp.subject].push(qp);
      });

      // Sort each subject's QPs by year and semester
      Object.keys(grouped).forEach((subject) => {
        grouped[subject].sort((a, b) => {
          const yearDiff = a.year - b.year;
          return yearDiff !== 0 ? yearDiff : a.semester - b.semester;
        });
      });

      setGroupedQPs(grouped);
    } catch (err) {
      console.error('Error fetching question papers:', err);
      setError('Failed to load question papers.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete question paper and refresh list
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question paper?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/question-papers/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admintoken')}`
        }
      });
      fetchData();
    } catch (err) {
      console.error('Error deleting question paper:', err);
      alert('Failed to delete question paper');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Top AppBar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Manage Question Papers
          </Typography>
          <Tooltip title="Go to Home">
            <IconButton onClick={() => navigate('/admin-dashboard')} color="primary">
              <HomeIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <Container maxWidth="xl" sx={{ py: 5 }}>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        {Object.keys(groupedQPs).length === 0 ? (
          <Typography>No question papers found.</Typography>
        ) : (
          Object.keys(groupedQPs).map((subject) => (
            <Box key={subject} sx={{ mb: 5 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
                {subject}
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                {groupedQPs[subject].map((qp) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={qp._id}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Year: {qp.year} | Semester: {qp.semester}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <a
                            href={qp.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#1976d2', textDecoration: 'none' }}
                          >
                            View File <OpenInNewIcon fontSize="small" />
                          </a>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Tooltip title="Delete QP">
                          <IconButton color="error" onClick={() => handleDelete(qp._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
};

export default ManageQP;
