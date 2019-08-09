import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import Button from '@material-ui/core/Button';

import { SIGN_IN } from '../../../constants/routes';

const SignOutButton = ({ firebase, history }) => {
  const signOut = async (event) => {
    event.preventDefault();
    await firebase.logout();
    history.push(SIGN_IN);
  };

  return (
    <Button color="inherit" onClick={signOut}>
      Sign Out
    </Button>
  );
};

const SignOutButtonComposed = compose(
  withFirebase,
  withRouter,
)(SignOutButton);

export default SignOutButtonComposed;
