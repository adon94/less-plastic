import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import withWidth from '@material-ui/core/withWidth';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SignOutButton from './SignOut/SignOut';
import NavigationMobile from './NavigationMobile/NavigationMobile';
import * as ROUTES from '../../constants/routes';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}));

const NavigationAuth = () => (
  <div>
    <Button href={ROUTES.HOME} color="inherit">Home</Button>
    <Button href={ROUTES.ACCOUNT} color="inherit">Account</Button>
    <SignOutButton />
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <Button href={ROUTES.SIGN_IN} color="inherit">Login</Button>
  </div>
);

const NavigationDesktop = ({ authExists }) => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          PactApp
        </Typography>
        {authExists ? <NavigationAuth /> : <NavigationNonAuth />}
      </Toolbar>
    </AppBar>
  );
};

const Navigation = ({ authExists, width }) => {
  const classes = useStyles();
  const isMobile = width === 'sm' || width === 'xs';
  return (
    <div className={classes.root}>
      {isMobile
        ? <NavigationMobile classes={classes} authExists={authExists} />
        : <NavigationDesktop authExists={authExists} classes={classes} />}
    </div>
  );
};

const enhance = connect(
  ({ firebase: { auth } }) => ({ authExists: !!auth && !!auth.uid }),
);

const NavigationComposed = compose(
  enhance,
  withWidth(),
)(Navigation);

export default NavigationComposed;
