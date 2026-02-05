import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#03a9f4', // light blue
    },
    secondary: {
      main: '#4caf50', // green
    },
    error: {
        main: '#f44336', // red
    },
    warning: {
        main: '#ff9800' // light orange
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
});

export default theme;
