import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { navigate, usePath } from 'hookrouter';

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ActivityIcon from '@material-ui/icons/Public';
import PersonPinIcon from '@material-ui/icons/AccountCircle';

import {
  HOME, ACTIVITY, ACCOUNT, SIGN_IN,
} from '../../../constants/routes';
import pattern from '../../../assets/floral.jpg';

const useStyles = makeStyles(({ palette }) => ({
  tabs: {
    zIndex: 5,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    color: palette.primary.contrastText,
    backgroundImage: `url(${pattern})`,
    backgroundSize: '40%',
  },
}));

const NavigationMobile = ({ currentUser }) => {
  const path = usePath();
  const [currentTab, setCurrentTab] = useState(0);
  const classes = useStyles();

  const handleChange = (value) => {
    const thirdTab = currentUser ? ACCOUNT : SIGN_IN;
    const routes = [HOME, ACTIVITY, thirdTab];
    navigate(routes[value]);
    setCurrentTab(value);
  };

  useEffect(() => {
    let tab;
    if (path === HOME) tab = 0;
    else if (path === ACTIVITY) tab = 1;
    else if (path === ACCOUNT || path === SIGN_IN) tab = 2;
    if (tab !== undefined) setCurrentTab(tab);
  });

  return (
    <div className={classes.tabs}>
      <Tabs
        value={currentTab}
        onChange={(event, value) => handleChange(value)}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="inherit"
      >
        <Tab icon={<WhatshotIcon />} />
        <Tab icon={<ActivityIcon />} />
        <Tab icon={<PersonPinIcon />} />
      </Tabs>
    </div>
  );
};

function mapStateToProps(state) {
  const { auth: { currentUser } } = state;
  return { currentUser };
}

export default connect(mapStateToProps)(NavigationMobile);
