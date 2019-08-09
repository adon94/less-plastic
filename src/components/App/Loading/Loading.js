import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

const Loading = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress mode="indeterminate" size={80} />
  </div>
);

export default withStyles(styles)(Loading);
