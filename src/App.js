import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createFirestoreInstance } from 'redux-firestore';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import 'typeface-philosopher';
// import { ThemeProvider } from 'styled-components';

import Navigation from './components/Navigation/Navigation';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PasswordForget from './components/PasswordForget/PasswordForget';
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import Activity from './components/Home/Activity/Activity';
import NewLunch from './components/NewLunch/NewLunch';

import { UserIsAuthenticated } from './auth';
import * as ROUTES from './constants/routes';
import rootReducer from './rootReducer';

import './App.css';

const firebaseConfig = {
  apiKey: 'AIzaSyBtzSqQkdr9uCf0IWVYn4C1asjvLwLOBio',
  authDomain: 'less-plastic.firebaseapp.com',
  databaseURL: 'https://less-plastic.firebaseio.com',
  projectId: 'less-plastic',
  storageBucket: '',
  messagingSenderId: '481474178991',
  appId: '1:630411517821:web:ad47f11a59f8451a1ff614',
};

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

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

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div className="router">
              <Navigation />

              <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />

              <Route path={ROUTES.HOME} component={UserIsAuthenticated(Home)} />
              <Route path={ROUTES.ACTIVITY} component={UserIsAuthenticated(Activity)} />
              <Route path={ROUTES.ACCOUNT} component={UserIsAuthenticated(Account)} />
              <Route path={ROUTES.NEW_LUNCH} component={UserIsAuthenticated(NewLunch)} />
            </div>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>
    </ThemeProvider>
  </MuiThemeProvider>
);

export default App;
