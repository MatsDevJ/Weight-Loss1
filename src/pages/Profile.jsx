import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';
import useUserStore from '../store/userStore';

const Profile = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const updateProfile = useUserStore((state) => state.updateProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    height: currentUser?.height || '',
    goalWeight: currentUser?.goalWeight || '',
    gender: currentUser?.gender || '',
    age: currentUser?.age || '',
  });

  const handleEdit = () => {
    setFormData({ // Pre-fill form data when editing starts
        height: currentUser.height || '',
        goalWeight: currentUser.goalWeight || '',
        gender: currentUser.gender || '',
        age: currentUser.age || '',
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  if (!currentUser) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Profile
        </Typography>
        {isEditing ? (
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Goal Weight (kg)"
                  name="goalWeight"
                  value={formData.goalWeight}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsEditing(false)} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography><strong>Email:</strong> {currentUser.email}</Typography>
            <Typography><strong>Height:</strong> {currentUser.height || 'Not set'}</Typography>
            <Typography><strong>Goal Weight:</strong> {currentUser.goalWeight || 'Not set'}</Typography>
            <Typography><strong>Gender:</strong> {currentUser.gender || 'Not set'}</Typography>
            <Typography><strong>Age:</strong> {currentUser.age || 'Not set'}</Typography>
            <Button onClick={handleEdit} variant="contained" sx={{ mt: 3 }}>
              Edit Profile
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
