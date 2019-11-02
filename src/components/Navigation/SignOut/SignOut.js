import React from 'react';
import { navigate } from 'hookrouter';

import Button from '@material-ui/core/Button';

import { HOME } from '../../../constants/routes';
import firebase from '../../../firebase';

const SignOutButton = () => {
  const signOut = async (event) => {
    event.preventDefault();
    await firebase.logout();
    navigate(HOME);
  };

  return (
    <Button color="inherit" onClick={signOut}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
