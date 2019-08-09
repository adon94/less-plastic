import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { HOME, PASSWORD_FORGET, SIGN_UP } from '../../constants/routes';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const SignUpLink = () => (
  <p>
    Don&apos;t have an account?&nbsp;
    <Link to={SIGN_UP}>Sign Up</Link>
  </p>
);

const PasswordForgetLink = () => (
  <p>
    <Link to={PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

const SignInPage = ({ classes }) => (
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
    </Paper>
  </main>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidUpdate({ authExists: oldAuthExists }) {
    const { authExists, history } = this.props;
    if (authExists && !oldAuthExists) {
      history.push(HOME);
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { firebase } = this.props;
    try {
      await firebase.login({
        email,
        password,
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const { classes } = this.props;

    const isInvalid = password === '' || email === '';

    return (
      <form className={classes.form} onSubmit={this.onSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input
            id="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={this.onChange}
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
            onChange={this.onChange}
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
  }
}

const enhance = connect(
  ({ firebase: { auth } }) => ({ authExists: !!auth && !!auth.uid }),
);

const SignInForm = compose(
  enhance,
  withRouter,
  withFirebase,
)(SignInFormBase);

export default withStyles(styles)(SignInPage);
