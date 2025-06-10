import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import axios from 'axios';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments/get-comments`);
        setComments(res.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        User Comments / Requests
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : comments.length === 0 ? (
        <Typography>No comments available.</Typography>
      ) : (
        <Paper elevation={3} sx={{ mt: 2 }}>
          <List>
            {comments.map((comment, index) => (
              <React.Fragment key={comment._id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={comment.username || 'Anonymous'}
                    secondary={
                      <>
                        <Typography variant="body2">{comment.text}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(comment.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index !== comments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default CommentsPage;
