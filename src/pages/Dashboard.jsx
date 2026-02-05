import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, TextField, Button } from '@mui/material';
import useUserStore from '../store/userStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const addWeightLog = useUserStore((state) => state.addWeightLog);
  const [weight, setWeight] = useState('');

  const handleAddWeight = () => {
    if (weight) {
      addWeightLog({ weight: parseFloat(weight) });
      setWeight('');
    }
  };
  
  // Format date for chart
  const formattedWeightLog = currentUser?.weightLog.map(log => ({...log, date: new Date(log.date).toLocaleDateString()}));
  const formattedMealLog = currentUser?.mealLog.map(log => ({...log, date: new Date(log.date).toLocaleDateString()}));


  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome, {currentUser?.email}!
      </Typography>

      {/* Add Weight Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Log Your Weight</Typography>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <TextField
            type="number"
            label="Current Weight (kg)"
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleAddWeight}>
            Add Weight
          </Button>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Weight Log Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Weight Journey</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formattedWeightLog}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Meal Log Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Calorie Intake</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedMealLog}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="calories" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
