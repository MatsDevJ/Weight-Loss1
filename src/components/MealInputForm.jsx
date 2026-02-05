import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import useUserStore from '../store/userStore';

const MealInputForm = () => {
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const addMealLog = useUserStore((state) => state.addMealLog);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Mock calorie calculation - to be replaced with a real API
  const calculateCalories = () => {
    // For now, a simple mock calculation
    return Math.floor(Math.random() * 500) + 100; // Random calories between 100 and 600
  };

  const handleAddMeal = () => {
    if (description) {
      const calories = calculateCalories();
      addMealLog({ description, calories });
      setDescription('');
      setWeight('');
      setSnackbarMessage('Meal logged successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
        setSnackbarMessage('Please enter a meal description.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>Add a New Meal</Typography>
      <TextField
        fullWidth
        label="Meal Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Weight/Volume (optional)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        margin="normal"
        type="number"
      />
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', gap: 2}}>
        <Button variant="outlined" disabled>
            Take Photo (Coming Soon)
        </Button>
        <Button variant="outlined" disabled>
            Image Search (Coming Soon)
        </Button>
      </Box>
      <Button variant="contained" color="primary" onClick={handleAddMeal}>
        Log Meal
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MealInputForm;
