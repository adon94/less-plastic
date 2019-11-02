import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Rater = ({ rate }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <IconButton onClick={rate} className={classes.button} aria-label="delete">
        <ThumbUpIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.button} aria-label="delete">
        <ThumbDownIcon fontSize="large" />
      </IconButton>
      <IconButton className={classes.button} aria-label="delete">
        <ShareIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default Rater;
