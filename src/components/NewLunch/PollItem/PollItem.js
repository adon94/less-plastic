import React from 'react';
import { compose } from 'redux';
import {
  Typography,
  IconButton,
  Grid,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});

const PollItem = ({ classes, item, remove }) => (
  <Grid item xs={12} className={classes.root}>
    <IconButton onClick={remove} aria-label="Delete" className={classes.margin}>
      <RemoveIcon color="error" />
    </IconButton>
    <Typography variant="h6">
      {item.description}
    </Typography>
  </Grid>
);

export default compose(
  withStyles(styles),
)(PollItem);
