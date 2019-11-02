import React, { useEffect, useState } from 'react';
import { A, navigate } from 'hookrouter';

// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
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

import firebase from '../../firebase';
import { HOME, PASSWORD_FORGET, SIGN_UP } from '../../constants/routes';

// // Configure FirebaseUI.
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: 'popup',
//   // Redirect to /signedIn after sign in is successful.
//   signInSuccessUrl: '/',
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//   ],
// };

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block',
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
    width: '100%',
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));

const SignUpLink = () => (
  <p>
    Don&apos;t have an account?&nbsp;
    <A href={SIGN_UP}>Sign Up</A>
  </p>
);

const PasswordForgetLink = () => (
  <p>
    <A href={PASSWORD_FORGET}>Forgot Password?</A>
  </p>
);

const SignInForm = ({ classes, auth = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth) {
      navigate(HOME);
    }
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const login = await firebase.login(email, password);
      console.log({ login });
      navigate(HOME);
    } catch (e) {
      setError(e);
    }
  };

  const isInvalid = password === '' || email === '';

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Email Address</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
          autoFocus
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
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
        Sign in
      </Button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInPage = () => {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm classes={classes} />
        <PasswordForgetLink />
        <SignUpLink />
        {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}
      </Paper>
    </main>
  );
};

export default SignInPage;
