import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import LunchPoll from './LunchPoll/LunchPoll';
import * as ROUTES from '../../../constants/routes';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(),
    },
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const LunchAdmin = () => (
  <IconButton href={ROUTES.NEW_LUNCH} color="secondary" aria-label="Add a poll">
    <AddIcon fontSize="large" />
  </IconButton>
);

const Lunch = ({ isLunchAdmin }) => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <div className={classes.titleContainer}>
        <Typography variant="h4">
          Lunch!
        </Typography>
        {isLunchAdmin && <LunchAdmin />}
      </div>
      <LunchPoll />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isLunchAdmin: state.firebase.profile.lunchAdmin,
  };
}

const LunchComposed = compose(
  connect(mapStateToProps),
)(Lunch);

export default LunchComposed;
