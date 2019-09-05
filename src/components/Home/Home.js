import React from 'react';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Goals from './Goals/Goals';
import Activity from './Activity/Activity';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  full: {
    width: '100%',
  },
}));

const Home = ({ width }) => {
  const classes = useStyles();
  const isDesktop = width === 'md' || width === 'lg';
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={7} className={classes.full}>
          <Goals />
        </Grid>
        {isDesktop && (
          <Grid item md={5}>
            <Activity />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default compose(
  withWidth(),
)(Home);
