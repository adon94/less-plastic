import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Button,
  InputAdornment,
  Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

import firebase from '../../../../firebase';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    marginBottom: theme.spacing(2),
  },
}));

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AddPact = ({
  open, handleClose, habit, currentUser
}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState({});
  const submit = async () => {
    const response = await firebase.addPact({ emoji }, habit, name, currentUser.displayName);
    if (response) {
      handleClose(true);
    } else {
      handleClose();
      // navigate(SIGN_IN);
    }
  };
  const onEmojiSelect = ({ id, skin }) => {
    setEmoji({id, skin});
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle id="max-width-dialog-title">New Pact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create pact with a friend for this habit
        </DialogContentText>
        <form className={classes.form} onSubmit={submit}>
          <Input
            id="standard-multiline-flexible"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            className={classes.textField}
            margin="normal"
            placeholder="Your friend's username"
            startAdornment={<InputAdornment position="start">@</InputAdornment>}
          />
          <Picker set="apple" title="Pick an emoji" onSelect={onEmojiSelect} />
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

function mapStateToProps(state) {
  const { auth: { currentUser } } = state;
  return { currentUser };
}

export default connect(mapStateToProps)(AddPact);
