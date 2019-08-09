import React from 'react';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import Lunch from './Lunch/Lunch';
import Ctc from './Ctc/Ctc';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

const Home = ({ classes, width }) => {
  const isDesktop = width === 'md' || width === 'lg';
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={7}>
          <Lunch />
        </Grid>
        {isDesktop && (
          <Grid item md={5}>
            <Ctc />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default compose(
  withWidth(),
  withStyles(styles),
)(Home);
