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
  apiKey: 'AIzaSyBprNIEWqe47aJOFKd8Py57dGnZ025a2fk',
  authDomain: 'pact-85c8b.firebaseapp.com',
  databaseURL: 'https://pact-85c8b.firebaseio.com',
  projectId: 'pact-85c8b',
  storageBucket: '',
  messagingSenderId: '481474178991',
  appId: '1:481474178991:web:21784bcd3262aafa',
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
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#27ae60',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e74c3c',
      dark: '#c0392b',
      contrastText: '#ffffff',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
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
  </MuiThemeProvider>
);

export default App;
