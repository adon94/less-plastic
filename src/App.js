import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider } from 'styled-components';
import 'typeface-philosopher';

import Navigation from './components/Navigation/Navigation';
import Router from './Router';

import createStore from './store/createStore';
import firebase from './firebase';

import './App.css';

const theme = createMuiTheme({
  typography: {
    h4: {
      fontFamily: 'Philosopher',
    },
    fontFamily: [
      // 'Philosopher',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1E824C',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#B84A2A',
      contrastText: '#ffffff',
    },
  },
});

export const store = createStore();

const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);
  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });
  return firebaseInitialized !== false ? (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="router">
            <Navigation />

            <Router />
          </div>
        </Provider>
      </ThemeProvider>
    </MuiThemeProvider>
  ) : <div id="loader"><CircularProgress /></div>;
};

export default App;
