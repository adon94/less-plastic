import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import withWidth from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SignOutButton from './SignOut/SignOut';
import NavigationMobile from './NavigationMobile/NavigationMobile';
import * as ROUTES from '../../constants/routes';

const styles = {
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
};

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

const NavigationDesktop = ({ authExists, classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit" className={classes.grow}>
        Wodan
      </Typography>
      {authExists ? <NavigationAuth /> : <NavigationNonAuth />}
    </Toolbar>
  </AppBar>
);

const Navigation = (props) => {
  const { classes, authExists, width } = props;
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
  withStyles(styles),
)(Navigation);

export default NavigationComposed;
