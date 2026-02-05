import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Modal } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useUserStore from '../store/userStore';
import Profile from './Profile';
import LogWeightModal from '../components/LogWeightModal';
import { shallow } from 'zustand/shallow';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // Optimized selectors to prevent unnecessary re-renders
  const useIsProfileIncomplete = () => useUserStore(state => 
    !state.currentUser?.age || 
    !state.currentUser?.gender || 
    !state.currentUser?.height || 
    !state.currentUser?.goalWeight,
    shallow
  );
  
  const useWeightLog = () => useUserStore(state => state.currentUser?.weightLog || [], shallow);
  const useMealLog = () => useUserStore(state => state.currentUser?.mealLog || [], shallow);
  const useUserDetails = () => useUserStore(state => ({ 
      name: state.currentUser?.name, 
      goalWeight: state.currentUser?.goalWeight, 
      height: state.currentUser?.height, 
      age: state.currentUser?.age, 
      gender: state.currentUser?.gender 
    }), shallow);

const Dashboard = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isLogWeightModalOpen, setLogWeightModalOpen] = useState(false);

  // Subscribing to granular, memoized state slices
  const isProfileIncomplete = useIsProfileIncomplete();
  const weightLog = useWeightLog();
  const mealLog = useMealLog();
  const { name, goalWeight, height, age, gender } = useUserDetails();

  useEffect(() => {
    // This effect now correctly depends on stable, primitive values or memoized selectors.
    if (isProfileIncomplete && !isProfileModalOpen) {
      setProfileModalOpen(true);
      return;
    }

    if (!isProfileIncomplete && !isLogWeightModalOpen) {
        const today = new Date();
        const hasLoggedToday = weightLog.some(log => {
            if (!log || !log.date) return false; 
            const logDate = new Date(log.date);
            return logDate.getFullYear() === today.getFullYear() &&
                   logDate.getMonth() === today.getMonth() &&
                   logDate.getDate() === today.getDate();
        });

        if (!hasLoggedToday) {
          setLogWeightModalOpen(true);
        }
    }
  }, [isProfileIncomplete, weightLog, isProfileModalOpen, isLogWeightModalOpen]);

  const handleProfileSave = () => {
    setProfileModalOpen(false);
  };

  const handleLogWeightClose = () => {
    setLogWeightModalOpen(false);
  };

  if (name === undefined) {
    return <Typography>Loading...</Typography>;
  }

  const currentWeight = weightLog.length > 0 ? weightLog[weightLog.length - 1].weight : 'N/A';
  const startingWeight = weightLog.length > 0 ? weightLog[0].weight : 'N/A';

  const calculateBMR = () => {
    if (currentWeight !== 'N/A' && height && age && gender) {
        const weight = parseFloat(currentWeight);
        const heightCm = parseFloat(height);
        const ageY = parseInt(age, 10);

        if (gender === 'Male') {
          return (10 * weight + 6.25 * heightCm - 5 * ageY + 5).toFixed(2);
        }
        if (gender === 'Female') {
          return (10 * weight + 6.25 * heightCm - 5 * ageY - 161).toFixed(2);
        }
      }
      return 'N/A';
  };

  const bmr = calculateBMR();

  const formattedWeightLog = weightLog.map(log => ({
    ...log,
    date: new Date(log.date).toLocaleDateString(),
  }));

  const totalCaloriesToday = mealLog.reduce((total, meal) => {
    const mealDate = new Date(meal.date);
    const today = new Date();
    if (mealDate.getFullYear() === today.getFullYear() &&
        mealDate.getMonth() === today.getMonth() &&
        mealDate.getDate() === today.getDate()) {
      return total + (meal.calories || 0);
    }
    return total;
  }, 0);

  return (
    <Box>
        <Modal
            open={isProfileModalOpen}
            aria-labelledby="profile-modal-title"
            aria-describedby="profile-modal-description"
        >
            <Box sx={style}>
                <Typography id="profile-modal-title" variant="h6" component="h2">
                    Complete Your Profile
                </Typography>
                <Profile isModal={true} onSave={handleProfileSave} />
            </Box>
        </Modal>
        <LogWeightModal open={isLogWeightModalOpen} onClose={handleLogWeightClose} />
      <Typography variant="h1" gutterBottom>
        Welcome, {name}!
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h2" gutterBottom>
                Weight Progress
              </Typography>
              {weightLog.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={formattedWeightLog}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <Typography>No weight data logged yet. Add your first weight entry on your profile page!</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Starting Weight</Typography>
              <Typography variant="h4">{startingWeight} kg</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Current Weight</Typography>
              <Typography variant="h4">{currentWeight} kg</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Goal Weight</Typography>
              <Typography variant="h4">{goalWeight || 'N/A'} kg</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">BMR</Typography>
              <Typography variant="h4">{bmr} calories/day</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Calories Today</Typography>
              <Typography variant="h4">{totalCaloriesToday} calories</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
