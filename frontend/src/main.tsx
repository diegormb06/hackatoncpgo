import { ThemeProvider } from '@mui/material';
import MuiThemeProvider from '@mui/material/styles/ThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';

import { Dashboard } from './pages/Dashboard';
import { GlobalStyles } from './styles/GlobalStyle';
import { Materialtheme } from './styles/MaterialTheme';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={Materialtheme}>
      <ThemeProvider theme={Materialtheme}>
        <Dashboard />
        <GlobalStyles />
      </ThemeProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
