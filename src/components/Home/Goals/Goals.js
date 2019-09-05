import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
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
    borderRadius: '50%',
    paddingTop: `calc(100% - ${theme.spacing(2)}px)`,
    position: 'relative',
    width: `calc(100% - ${theme.spacing(4)}px)`,
    border: `2px solid ${theme.palette.primary.main}`,
    // background: theme.palette.primary.light,
    // color: theme.palette.primary.contrastText,
  },
  bubble: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalsSlot: {
    padding: theme.spacing(2),
  },
  goalsContainer: {
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
    <div className={classes.emptyPaper}>
      <div className={classes.bubble}>
        <Typography variant="h6">
          Meditation
        </Typography>
      </div>
    </div>
  );
};

const FirstSlot = () => {
  const classes = useStyles();
  return (
    <div className={classes.emptyPaper}>
      <div className={classes.bubble}>
        <AddIcon className={classes.rightIcon} fontSize="large" color="primary" />
      </div>
    </div>
  );
};

const GoalsBox = ({ index }) => {
  const classes = useStyles();
  let content;
  if (index === 0) {
    content = <FirstSlot classes={classes} />;
  } else {
    content = <EmptySlot classes={classes} />;
  }
  return (
    <Grid item xs={6} className={classes.goalsContainer}>
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

const Goals = () => {
  const occurences = getWednesdays();
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className={classes.titleContainer}>
            <Typography variant="h4" gutterBottom>
              Goals
            </Typography>
          </div>
        </Grid>
        {occurences.map((date, index) => (
          <GoalsBox key={date} classes={classes} index={index} />
        ))}
      </Grid>
    </div>
  );
};

export default Goals;
