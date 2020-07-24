import React, { useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from 'hookrouter';

import { SIGN_IN } from '../../../constants/routes';
import firebase from '../../../firebase';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
}));

const AddHabit = ({ open, handleClose }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const submit = async () => {
    const habit = {
      name,
    };
    const response = await firebase.addHabit(habit);
    if (response) {
      handleClose(true);
    } else {
      handleClose();
      // navigate(SIGN_IN);
    }
  };
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Add a habit</DialogTitle>
      <DialogContent>
        <DialogContentText>
            First add the habit, then create a pact with a friend
        </DialogContentText>
        <form className={classes.form} onSubmit={submit}>
          <TextField
            id="standard-multiline-flexible"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            className={classes.textField}
            margin="normal"
            placeholder="Habit name"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={submit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHabit;
