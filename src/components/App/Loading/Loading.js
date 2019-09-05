import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress mode="indeterminate" size={80} />
    </div>
  );
};

export default Loading;
