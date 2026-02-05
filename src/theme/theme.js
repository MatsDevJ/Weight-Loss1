import { createTheme } from '@mui/material/styles';
import { deepPurple, amber } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: amber[500],
    },
    background: {
      default: '#f4f5f7', // A light grey for the main background
      paper: '#ffffff',     // White for cards and surfaces
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
        fontWeight: 700,
        fontSize: '2rem',
      },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 10px 20px rgba(0,0,0,0.08)', // Softer, deeper shadow
        },
      },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                textTransform: 'none', // More modern button text
            }
        }
    }
  },
});

export default theme;
