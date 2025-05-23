import React from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Admin Dashboard</Typography>
        <Button variant="contained" color="error" onClick={() => navigate('/')}>
          Logout
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h6">Create New QP</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/add-qp')}
              >
                Add New
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <Typography variant="h6">Manage Question Papers</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/manage-qp')}
              >
                View All
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
