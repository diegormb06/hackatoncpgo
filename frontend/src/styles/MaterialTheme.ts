import { createTheme } from '@mui/material';

export const Materialtheme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#00766F',
    },
    text: { primary: '#2e2e2e' },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#00766F',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        color: 'organge',
      },
    },
  },
});
