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

import Navigation from './components/Navigation/Navigation';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PasswordForget from './components/PasswordForget/PasswordForget';
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import Knowledge from './components/Home/Ctc/Ctc';
import NewLunch from './components/NewLunch/NewLunch';

import { UserIsAuthenticated } from './auth';
import * as ROUTES from './constants/routes';
import rootReducer from './rootReducer';

import './App.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCEHmXzlFWxJZDPnEmy_Gqk_QajAaGkxBQ',
  authDomain: 'blab-8f233.firebaseapp.com',
  databaseURL: 'https://blab-8f233.firebaseio.com',
  projectId: 'blab-8f233',
  storageBucket: 'blab-8f233.appspot.com',
  messagingSenderId: '1019636621723',
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
      main: '#313131',
      contrastText: '#00adef',
    },
    secondary: {
      main: '#00adef',
      dark: '#038bbf',
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
            <Route path={ROUTES.CTC} component={UserIsAuthenticated(Knowledge)} />
            <Route path={ROUTES.ACCOUNT} component={UserIsAuthenticated(Account)} />
            <Route path={ROUTES.NEW_LUNCH} component={UserIsAuthenticated(NewLunch)} />
          </div>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
