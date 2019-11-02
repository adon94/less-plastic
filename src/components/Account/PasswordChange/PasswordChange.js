
import React, { useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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

const PasswordChange = () => {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);
  const classes = useStyles();

  const onSubmit = (event) => {
    // firebase
    //   .doPasswordUpdate(passwordOne)
    //   .then(() => {
    //     this.setState({ ...INITIAL_STATE });
    //   })
    // } catch (e) {
    //   setError(e);
    // }

    event.preventDefault();
  };

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return (
    <form onSubmit={onSubmit}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">New password</InputLabel>
        <Input
          name="passwordOne"
          type="password"
          id="passwordOne"
          autoComplete="current-password"
          value={passwordOne}
          onChange={({ target: { value } }) => setPasswordOne(value)}
        />
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Confirm new password</InputLabel>
        <Input
          name="passwordTwo"
          type="password"
          id="passwordTwo"
          autoComplete="current-password"
          value={passwordOne}
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
        Reset My Password
      </Button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default PasswordChange;
