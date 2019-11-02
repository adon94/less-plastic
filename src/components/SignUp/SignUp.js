import React, { useState } from 'react';
import { navigate } from 'hookrouter';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import * as ROUTES from '../../constants/routes';
import firebase from '../../firebase';

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    paddingTop: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
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
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await firebase.register(displayName, email, passwordOne);
      navigate(ROUTES.HOME);
    } catch (e) {
      setError(e);
    }
  };

  const isInvalid = passwordOne !== passwordTwo
  || passwordOne === ''
  || email === ''
  || displayName === '';

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="displayName">Full name</InputLabel>
        <Input
          id="displayName"
          name="displayName"
          autoComplete="name"
          value={displayName}
          onChange={({ target: { value } }) => setDisplayName(value)}
          autoFocus
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
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <SignUpForm classes={classes} />
      </Paper>
    </main>
  );
};

export default SignUpPage;
