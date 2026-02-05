import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper } from '@mui/material';
import useUserStore from '../store/userStore';

const Meal = () => {
  const addMealLog = useUserStore((state) => state.addMealLog);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mealName || !calories) {
      setError('Meal name and calories are required');
      return;
    }
    addMealLog({ name: mealName, calories: parseInt(calories) });
    setMealName('');
    setCalories('');
    setError('');
    // Optionally, navigate to the dashboard or show a success message
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Log a Meal
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Meal Name"
            autoFocus
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Calories"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Meal
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Meal;
