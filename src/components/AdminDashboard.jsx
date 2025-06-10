import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActionArea, IconButton, AppBar, Toolbar } from '@mui/material';
import NoteIcon from '@mui/icons-material/Note'; // icon for comments
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout'; // Logout icon
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token on logout
    navigate('/'); // Redirect to login page
  };

  return (
    <Box>
      {/* AppBar with Logout button */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Admin Dashboard</Typography>
          <IconButton color="error" onClick={handleLogout} title="Logout">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Dashboard cards */}
      <Box sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardActionArea onClick={() => navigate('/add-qp')}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <AddCircleOutlineIcon color="primary" sx={{ fontSize: 60 }} />
                  <Typography variant="h6" mt={2}>
                    Add Question Paper
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardActionArea onClick={() => navigate('/manage-qp')}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <ManageAccountsIcon color="primary" sx={{ fontSize: 60 }} />
                  <Typography variant="h6" mt={2}>
                    Manage Question Papers
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardActionArea onClick={() => navigate('/comments')}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <NoteIcon color="primary" sx={{ fontSize: 60 }} />
                  <Typography variant="h6" mt={2}>
                    User Comments
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
