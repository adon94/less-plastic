import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FoodIcon from '@material-ui/icons/Fastfood';
import CTCIcon from '@material-ui/icons/Visibility';
import PersonPinIcon from '@material-ui/icons/AccountCircle';

import { HOME, CTC, ACCOUNT } from '../../../constants/routes';

const styles = ({ palette }) => createStyles({
  tabs: {
    zIndex: 5,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: palette.primary.main,
    color: palette.secondary.main,
  },
});

class NavigationMobile extends Component {
  state = {
    currentTab: 0,
  };

  handleChange = (value) => {
    const { history } = this.props;
    const routes = [HOME, CTC, ACCOUNT];
    history.push(routes[value]);
    this.setState({ currentTab: value });
  };

  render() {
    const { classes, authExists } = this.props;
    const { currentTab } = this.state;
    if (authExists) {
      return (
        <div className={classes.tabs}>
          <Tabs
            value={currentTab}
            onChange={(event, value) => this.handleChange(value)}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="inherit"
          >
            <Tab icon={<FoodIcon />} label="Lunch" />
            <Tab icon={<CTCIcon />} label="CTCs" />
            <Tab icon={<PersonPinIcon />} label="Settings" />
          </Tabs>
        </div>
      );
    }
    return null;
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(NavigationMobile);
