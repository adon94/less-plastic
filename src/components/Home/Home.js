import React, { useEffect, useState } from 'react';

import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from 'hookrouter';

import Search from './Search/Search';
import HabitItem from './HabitItem/HabitItem';
import AddHabit from './AddHabit/AddHabit';

import firebase from '../../firebase';
import { SIGN_IN } from '../../constants/routes';

const useStyles = makeStyles(theme => ({
  full: {
    width: '100%',
  },
  feed: {
    width: '100%',
    margin: 0,
    paddingBottom: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing()}px ${theme.spacing(6)}px`,
    },
  },
  gridItem: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.spacing(6)}`,
    },
  },
}));

const Home = () => {
  const [habits, setHabits] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    firebase.getHabits().then(setHabits);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (loadNew) => {
    setOpen(false);
    if (loadNew) {
      firebase.getHabits().then(setHabits);
    } else {
      navigate(SIGN_IN);
    }
  };

  return (
    <>
      <div className={classes.full}>
        <Search handleOpenDialog={handleClickOpen} />
        <Grid container className={classes.feed} spacing={0}>
          {/* <Button variant="contained" color="primary">
            <AddIcon className={classes.rightIcon} />
            Add a habit
          </Button> */}
          {habits && habits.map(item => (
            <Grid className={classes.gridItem} item key={item.id} xs={12} md={4}>
              <HabitItem item={item} />
            </Grid>
          ))}
        </Grid>
      </div>
      <AddHabit
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default Home;
