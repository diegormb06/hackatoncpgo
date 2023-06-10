import { createTheme } from '@mui/material';

export const Materialtheme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#40a11c ',
    },
    text: { primary: '#2e2e2e' },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#40a11c ',
        },
      },
    },
  },
});
