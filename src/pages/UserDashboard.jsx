import React, { useEffect, useState } from 'react';
import {
  Box, Typography, List, ListItem, ListItemText,
  Button, TextField, AppBar, Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [qps, setQps] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQPs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/qp`);
        setQps(res.data);
      } catch (err) {
        console.error('Failed to fetch QPs:', err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments`);
        setComments(res.data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };

    fetchQPs();
    fetchComments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddComment = async () => {
    setError('');
    const token = localStorage.getItem('token');

    if (!token || !commentText.trim()) {
      setError('Login and comment required');
      return;
    }

    try {
      console.log(token)
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments`,
        { text: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setComments([res.data, ...comments]);
      setCommentText('');
    } catch (error) {
      console.error('Error submitting comment:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to submit comment');
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Uploaded QPs</Typography>
          <Button onClick={handleLogout} sx={{ background: 'red' }} variant="contained">Logout</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Question Papers</Typography>
        <List>
          {qps.map((qp) => (
            <ListItem key={qp._id} divider>
              <ListItemText
                primary={`${qp.subject} - Sem ${qp.semester}`}
                secondary={`Uploaded: ${new Date(qp.createdAt).toLocaleDateString()}`}
              />
              <Button onClick={() => window.open(qp.fileUrl, '_blank')}>View</Button>
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" sx={{ mt: 4 }}>Add Comment / Request</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Comment"
          fullWidth
          multiline
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button sx={{ mt: 2 }} variant="contained" onClick={handleAddComment}>Submit</Button>

        <Typography variant="h6" sx={{ mt: 4 }}>All Comments</Typography>
        {comments.map((c) => (
          <Box key={c._id} sx={{ border: '1px solid #ccc', p: 2, my: 1 }}>
            <Typography fontWeight="bold">{c.userId?.name || c.userId?.email || 'Anonymous'}</Typography>
            <Typography>{c.text}</Typography>
            <Typography variant="caption">{new Date(c.createdAt).toLocaleString()}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserDashboard;
