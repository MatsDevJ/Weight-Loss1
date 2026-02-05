
import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, Button, Snackbar, Alert } from '@mui/material';
import useUserStore from '../store/userStore';

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

const LogWeightModal = ({ open, onClose }) => {
  const [weight, setWeight] = useState('');
  const addWeightLog = useUserStore((state) => state.addWeightLog);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSave = () => {
    if (weight) {
      addWeightLog({ weight: parseFloat(weight) });
      setSnackbarMessage('Weight logged successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onClose();
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

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="log-weight-modal-title"
        aria-describedby="log-weight-modal-description"
      >
        <Box sx={style}>
          <Typography id="log-weight-modal-title" variant="h6" component="h2">
            Log Your Weight for Today
          </Typography>
          <TextField
            fullWidth
            required
            label="Current Weight (kg)"
            name="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
            Save Weight
          </Button>
        </Box>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LogWeightModal;
