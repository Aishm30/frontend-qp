// // UserLogin.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const UserLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setErrorMsg('');
//   setLoading(true);

//   try {
//     const url = `${import.meta.env.VITE_API_URL}/api/users/login`;
//     const res = await axios.post(url, { email, password });

//     console.log('Login response:', res.data);  // <<-- Add this for debug

//     localStorage.setItem('userToken', res.data.token);
//     localStorage.setItem('username', email);

//     navigate('/dashboard');
//   } catch (err) {
//     setErrorMsg(err.response?.data?.message || 'Login failed');
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
//       <Paper elevation={6} sx={{ padding: 4, width: 400 }}>
//         <Typography variant="h5" align="center" gutterBottom>User Login</Typography>

//         {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

//         <form onSubmit={handleSubmit} noValidate>
//           <TextField
//             label="Email"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             type="email"
//           />
//           <TextField
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading || !email || !password}>
//             {loading ? 'Logging in...' : 'Login'}
//           </Button>
//         </form>

//         <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//           New user? <Button onClick={() => navigate('/user-register')}>Register here</Button>
//         </Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default UserLogin;
// UserLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/users/login`;
      const res = await axios.post(url, { email, password });

      console.log('✅ Login response:', res.data);  // Debug token response

      // ✅ Save token and username correctly
      localStorage.setItem('token', res.data.token);        // This is the token your backend needs
      localStorage.setItem('username', email);              // Optional: you may use this for display

      // ✅ Debug log to verify token saved
      console.log('📦 Token saved in localStorage:', localStorage.getItem('token'));

      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5' }}>
      <Paper elevation={6} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>User Login</Typography>

        {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }} disabled={loading || !email || !password}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          New user? <Button onClick={() => navigate('/user-register')}>Register here</Button>
        </Typography>
      </Paper>
    </Box>
  );
};

export default UserLogin;
