import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import useUserStore from '../store/userStore';
import { shallow } from 'zustand/shallow';

const Profile = ({ isModal, onSave }) => {
  const { currentUser, updateUser, addWeightLog } = useUserStore(
    (state) => ({
      currentUser: state.currentUser,
      updateUser: state.updateUser,
      addWeightLog: state.addWeightLog,
    }),
    shallow
  );

  const [formState, setFormState] = useState(currentUser);
  const [newWeight, setNewWeight] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    setFormState(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (formState.name && formState.age && formState.gender && formState.height && formState.goalWeight && (!isModal || newWeight)) {
        updateUser(formState);
        if(isModal && newWeight) {
            addWeightLog({ weight: parseFloat(newWeight) });
        }
        setSnackbarMessage('Profile saved successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        if (isModal) {
            onSave();
        }
    } else {
        setSnackbarMessage('Please fill out all fields.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
    }
  };

  const handleAddWeight = () => {
    if (newWeight) {
      addWeightLog({ weight: parseFloat(newWeight) });
      setNewWeight('');
      setSnackbarMessage('Weight logged successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage('Please enter a weight.');
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

  if (!currentUser) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
        {!isModal && (
            <Typography variant="h1" gutterBottom>
                Profile
            </Typography>
        )}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h2" gutterBottom>Edit Profile</Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              required
              label="Name"
              name="name"
              value={formState.name || ''}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Age"
              name="age"
              type="number"
              value={formState.age || ''}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth required margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formState.gender || ''}
                onChange={handleChange}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              required
              label="Height (cm)"
              name="height"
              type="number"
              value={formState.height || ''}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Goal Weight (kg)"
              name="goalWeight"
              type="number"
              value={formState.goalWeight || ''}
              onChange={handleChange}
              margin="normal"
            />
            {isModal && (
                <TextField
                    fullWidth
                    required
                    label="Current Weight (kg)"
                    name="newWeight"
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    margin="normal"
                />
            )}
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
              Save Profile
            </Button>
          </Box>
        </CardContent>
      </Card>

        {!isModal && (
            <>
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                    <Typography variant="h2" gutterBottom>Log New Weight</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                        label="Current Weight (kg)"
                        name="newWeight"
                        type="number"
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                        margin="normal"
                        sx={{ mr: 2 }}
                        />
                        <Button variant="contained" color="primary" onClick={handleAddWeight}>
                        Log Weight
                        </Button>
                    </Box>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                    <Typography variant="h2" gutterBottom>Weight History</Typography>
                    <List>
                        {currentUser.weightLog && currentUser.weightLog.length > 0 ? (
                        currentUser.weightLog.map((entry, index) => (
                            <ListItem key={index}>
                            <ListItemText primary={`${entry.weight} kg`} secondary={new Date(entry.date).toLocaleString()} />
                            </ListItem>
                        ))
                        ) : (
                        <Typography>No weight history yet.</Typography>
                        )}
                    </List>
                    </CardContent>
                </Card>
            </>
        )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
