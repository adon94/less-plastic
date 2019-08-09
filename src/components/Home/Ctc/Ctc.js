import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 8,
      marginRight: theme.spacing.unit * 8,
    },
  },
  emptyPaper: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctcSlot: {
    padding: theme.spacing.unit * 2,
  },
  ctcContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const EmptySlot = ({ classes }) => (
  <Paper className={classes.emptyPaper}>
    <Typography variant="h6">
      Nothing happening.
    </Typography>
    <Button color="primary">Request a CTC</Button>
  </Paper>
);

// const ctcSlot = ({ classes }) => (
//   <Paper className={classes.ctcSlot}>
//     <Typography variant="h6">
//       Nothing happening.
//     </Typography>
//   </Paper>
// );


const FirstSlot = ({ classes }) => (
  <Paper className={classes.ctcSlot}>
    <Typography variant="subtitle1">
      John Lee
    </Typography>
    <Typography variant="h6">
      What to expect from Blockchain in 2019
    </Typography>
    <Typography variant="body2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore
      consectetur, neque doloribus, cupiditate numquam dignissimos laborum
      fugiat deleniti? Eum quasi quidem quibusdam.
    </Typography>
  </Paper>
);

const CtcBox = ({ classes, date, index }) => {
  let content;
  if (index === 0) {
    content = <FirstSlot classes={classes} />;
  } else {
    content = <EmptySlot classes={classes} />;
  }
  return (
    <Grid item xs={12} className={classes.ctcContainer}>
      <Typography variant="subtitle2" gutterBottom>
        {date.format('dddd, MMMM D')}
      </Typography>
      {content}
    </Grid>
  );
};

const getWednesdays = () => {
  const dates = [];
  for (let i = 3; i < 30; i += 7) {
    dates.push(moment().day(i));
  }
  return dates;
};

const CtcAdmin = () => (
  <IconButton color="secondary" aria-label="Check CTC requests">
    <VisibilityIcon fontSize="large" />
  </IconButton>
);

const Ctc = ({ classes, isCtcAdmin }) => {
  const occurences = getWednesdays();
  return (
    <div className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.titleContainer}>
            <Typography variant="h4" gutterBottom>
              Next CTCs
            </Typography>
            {isCtcAdmin && <CtcAdmin />}
          </div>
        </Grid>
        {occurences.map((date, index) => <CtcBox classes={classes} date={date} index={index} />)}
        <Button color="primary">Next</Button>
      </Grid>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isCtcAdmin: state.firebase.profile.ctcAdmin,
  };
}

const CtcComposed = compose(
  connect(mapStateToProps),
  withStyles(styles),
)(Ctc);

export default CtcComposed;
