import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar, IconButton, InputAdornment, TextField, Typography,
} from '@material-ui/core';
import Send from '@material-ui/icons/Send';

import profileImg from '../../../assets/tropic.jpg';
import CommentItem from './CommentItem/CommentItem';

const useStyles = makeStyles(theme => ({
  container: {
    // display: 'flex',
    // justifyContent: 'space-around',
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Comments = () => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const commentCount = 34;
  const send = () => {
    console.log(comment);
  };
  return (
    <div className={classes.container}>
      <Typography variant="subtitle1" gutterBottom>
        {`${commentCount} Comments`}
      </Typography>
      <div className={classes.input}>
        <Avatar alt="Profile" src={profileImg} className={classes.avatar} />
        <TextField
          id="standard-multiline-flexible"
          placeholder="Add a public comment"
          multiline
          fullWidth
          value={comment}
          onChange={({ target: { value } }) => setComment(value)}
          // className={classes.textField}
          margin="none"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  disabled={comment === ''}
                  color="primary"
                  onClick={send}
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <CommentItem />
    </div>
  );
};

export default Comments;
