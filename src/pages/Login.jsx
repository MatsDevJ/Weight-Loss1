import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button, TextField, Typography, Container, Box, Link } from '@mui/material';
import useUserStore from '../store/userStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email)) {
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
		      <Link component={RouterLink} to="/signup" variant="body2">
					{"Don't have an account? Sign Up"}
			  </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
