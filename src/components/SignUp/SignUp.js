import React, { useState } from 'react';
import { navigate } from 'hookrouter';

import {
  Avatar,
  InputAdornment,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

import * as ROUTES from '../../constants/routes';
import firebase from '../../firebase';

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    paddingTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

const SignUpForm = ({ classes }) => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const validfirstUsername = username.match(usernameRegex);
    if (validfirstUsername) {
      try {
        const response = await firebase.register(displayName, email, passwordOne, username);
        if (response.success) {
          navigate(ROUTES.HOME);
        } else {
          setError(response);
        }
      } catch (e) {
        setError(e);
      }
    } else {
      setError({ message: 'Invalid username' });
    }
  };

  const isInvalid = passwordOne !== passwordTwo
  || passwordOne === ''
  || email === ''
  || displayName === '';

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="displayName">Username</InputLabel>
        <Input
          id="username"
          name="username"
          autoComplete="username"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
          autoFocus
          startAdornment={<InputAdornment position="start">@</InputAdornment>}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="displayName">Display name</InputLabel>
        <Input
          id="displayName"
          name="displayName"
          autoComplete="name"
          value={displayName}
          onChange={({ target: { value } }) => setDisplayName(value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email address</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="passwordOne">Password</InputLabel>
        <Input
          name="passwordOne"
          type="password"
          id="passwordOne"
          value={passwordOne}
          onChange={({ target: { value } }) => setPasswordOne(value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="passwordTwo">Confirm password</InputLabel>
        <Input
          name="passwordTwo"
          type="password"
          id="passwordTwo"
          value={passwordTwo}
          onChange={({ target: { value } }) => setPasswordTwo(value)}
        />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={isInvalid}
      >
        Sign up
      </Button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpPage = () => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <SignUpForm classes={classes} />
    </main>
  );
};

export default SignUpPage;
