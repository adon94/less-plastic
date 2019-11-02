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

const AddBrand = ({ open, handleClose }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const handleChange = ({ target: { value } }) => {
    setName(value);
  };
  const submit = async () => {
    const brand = {
      name,
      category,
    };
    const response = await firebase.addBrand(brand);
    if (response) {
      handleClose(true);
    } else {
      handleClose();
    }
  };
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">Add a brand</DialogTitle>
      <DialogContent>
        <DialogContentText>
            When you submit the details below it will be sent for review.
        </DialogContentText>
        <form className={classes.form} onSubmit={submit}>
          <TextField
            id="standard-multiline-flexible"
            value={name}
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            placeholder="Brand name"
          />
          <TextField
            id="standard-multiline-flexible"
            value={category}
            onChange={({ target: { value } }) => setCategory(value)}
            className={classes.textField}
            margin="normal"
            placeholder="Category"
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

export default AddBrand;
