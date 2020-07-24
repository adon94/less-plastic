import React from 'react';
import { navigate } from 'hookrouter';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardContent,
  Button,
  CardActions,
} from '@material-ui/core';
import User from '@material-ui/icons/GroupAdd';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import AddPact from './AddPact/AddPact';
import Streak from './Streak/Streak';
import { HABIT } from '../../../constants/routes';

const useStyles = makeStyles(theme => ({
  card: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(2),
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      borderTop: 'none',
    },
  },
  media: {
    height: 140,
    backgroundSize: 'contain',
    [theme.breakpoints.up('md')]: {
      height: 250,
    },
  },
  voters: {
    textAlign: 'center',
  },
  barContainer: {
    width: '100%',
    marginRight: theme.spacing(),
  },
  bar: {
    backgroundColor: theme.palette.error.main,
  },
  streakContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  streak: {
    // padding: theme.spacing(4),
    width: '30vw',
    height: '30vw',
    border: `4px solid ${theme.palette.grey[200]}`,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const ScorePreview = ({ classes }) => (
  <>
    <div className={classes.voters}>
      440 votes
    </div>
    <div className={classes.barContainer}>
      <LinearProgress className={classes.bar} variant="determinate" value={43} thickness={6} />
    </div>
  </>
);

const HabitItem = ({ item, item: { name, id }, isMain }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const openHabit = () => {
    const url = HABIT.replace(':id', id);
    navigate(url);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (loadNew) => {
    setOpen(false);
    if (loadNew) {
      // firebase.getHabits().then(setHabits);
    }
  };
  return (
    <Card elevation={0} square className={classes.card}>
      <Streak number={3} />
      <div>
        <CardActionArea onClick={openHabit} disabled={isMain}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              {/* {`${pacts} pact${pacts !== 1 ? 's' : ''}`} */}
              No pacts yet
              {/* 33🐉 21🦅 5△ */}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setOpen(true)}
            startIcon={<User />}
          >
            Add a pact
          </Button>
        </CardActions>
      </div>
      <AddPact
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        habit={item}
      />
    </Card>
  );
};

export default HabitItem;
