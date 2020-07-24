import React from 'react';
import { connect } from 'react-redux';
import { navigate } from 'hookrouter';

import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Typography } from '@material-ui/core';

import firebase from '../../firebase';
import { SIGN_IN } from '../../constants/routes';

import profileImg from '../../assets/fire.jpg';
import pattern from '../../assets/lines.png';

const useStyles = makeStyles(({ palette, spacing }) => ({
  profileContainer: {
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
    padding: spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    zIndex: 0,
    // backgroundImage: `url(${pattern})`,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 1,
      backgroundImage: `url(${pattern})`,
      backgroundSize: '40%',
      zIndex: -1,
    },
  },
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
  button: {
    margin: spacing(1),
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
}));

const User = ({ currentUser }) => {
  const classes = useStyles();
  const logout = async () => {
    await firebase.logout();
    navigate(SIGN_IN);
  };

  const deleteUser = async () => {
    await firebase.deleteUser();
    navigate(SIGN_IN);
  };

  if (currentUser) {
    return (
      <div>
        <div className={classes.profileContainer}>
          <Avatar alt={currentUser.displayName} src={profileImg} className={classes.bigAvatar} />
          <Typography variant="h5" component="h1">
            {currentUser.displayName}
          </Typography>
        </div>
        <div className={classes.options}>
          {/* user options */}
          <Button color="primary" className={classes.button} onClick={logout}>
            Logout
          </Button>
          <Button color="default" className={classes.button} onClick={deleteUser}>
            Delete my account
          </Button>
        </div>
      </div>
    );
  }
  return null;
};

function mapStateToProps(state) {
  const { auth: { currentUser } } = state;
  return { currentUser };
}

export default connect(mapStateToProps)(User);
