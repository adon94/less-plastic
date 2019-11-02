import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar, Typography, IconButton,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import profileImg from '../../../../assets/tropic.jpg';

const useStyles = makeStyles(theme => ({
  container: {
    // display: 'flex',
    // justifyContent: 'space-around',
    padding: `${theme.spacing(2)}px 0`,
  },
  button: {
    marginRight: theme.spacing(1),
    paddingLeft: 0,
    fontSize: '1rem',
  },
  input: {
    display: 'flex',
    flex: 1,
    // alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const CommentItem = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.input}>
        <Avatar alt="Profile" src={profileImg} className={classes.avatar} />
        <div>
          <Typography variant="subtitle1">
            Some Person
          </Typography>
          <Typography variant="body">
              some text some text some text some text some text some text some text
          </Typography>
          <div>
            <IconButton className={classes.button} aria-label="delete">
              <ThumbUpIcon fontSize="small" />
              &nbsp;86
            </IconButton>
            <IconButton className={classes.button} aria-label="delete">
              <ThumbDownIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
