import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import { withStyles, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FoodIcon from '@material-ui/icons/Whatshot';
import ActivityIcon from '@material-ui/icons/Public';
import PersonPinIcon from '@material-ui/icons/AccountCircle';

import { HOME, ACTIVITY, ACCOUNT } from '../../../constants/routes';

const styles = ({ palette }) => createStyles({
  tabs: {
    zIndex: 5,
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: palette.primary.contrastText,
    color: palette.primary.main,
  },
});

class NavigationMobile extends Component {
  state = {
    currentTab: 0,
  };

  handleChange = (value) => {
    const { history } = this.props;
    const routes = [HOME, ACTIVITY, ACCOUNT];
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
            indicatorColor="primary"
            textColor="inherit"
          >
            <Tab icon={<FoodIcon />} />
            <Tab icon={<ActivityIcon />} />
            <Tab icon={<PersonPinIcon />} />
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
