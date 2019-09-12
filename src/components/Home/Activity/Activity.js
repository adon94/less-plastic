import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '800px',
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(8),
    },
  },
  emptyPaper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activitySlot: {
    padding: theme.spacing(2),
  },
  activityContainer: {
    marginBottom: theme.spacing(2),
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const EmptySlot = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.emptyPaper}>
      <Typography variant="h6">
        Nothing happening.
      </Typography>
      <Button color="primary">Request a CTC</Button>
    </Paper>
  );
};

const FirstSlot = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.activitySlot}>
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
};

const ActivityBox = ({ date, index }) => {
  const classes = useStyles();
  let content;
  if (index === 0) {
    content = <FirstSlot classes={classes} />;
  } else {
    content = <EmptySlot classes={classes} />;
  }
  return (
    <Grid item xs={12} className={classes.activityContainer}>
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

const Activity = () => {
  const occurences = getWednesdays();
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.titleContainer}>
            <Typography variant="h4" gutterBottom>
              Activity
            </Typography>
          </div>
        </Grid>
        {occurences.map((date, index) => (
          <ActivityBox key={date} classes={classes} date={date} index={index} />
        ))}
      </Grid>
    </div>
  );
};

export default Activity;
