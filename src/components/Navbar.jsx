import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useUserStore from '../store/userStore';

const Navbar = () => {
  const { currentUser, logout } = useUserStore();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          FitnessTracker
        </Typography>
        <Box>
          {currentUser ? (
            <>
              <Button color="inherit" component={RouterLink} to="/">Dashboard</Button>
              <Button color="inherit" component={RouterLink} to="/meal">Log Meal</Button>
              <Button color="inherit" component={RouterLink} to="/profile">Profile</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/signup">Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
