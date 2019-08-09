import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';

import {
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import { withFirestore, populate } from 'react-redux-firebase';
import {
  compose,
  withHandlers,
  withContext,
  getContext,
  lifecycle,
} from 'recompose';
import LunchItem from './LunchItem/LunchItem';
import PollItem from './PollItem/PollItem';

const getNextWed = () => {
  const wednesday = 3;
  const today = moment().isoWeekday();

  if (today <= wednesday) {
    return moment().day(wednesday).format('YYYY-MM-DD');
  }
  return moment().add(1, 'weeks').day(wednesday).format('YYYY-MM-DD');
};

const nextWed = getNextWed(); // moment().day(3).format('YYYY-MM-DD');

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    // padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 8,
      marginRight: theme.spacing.unit * 8,
    },
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 6,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  mealItems: {
    marginTop: theme.spacing.unit * 2,
  },
});

const NewLunch = ({
  classes, onNewSubmit, deleteMeal, addToWeek, meals, poll, removeFromPoll, launchPoll,
}) => {
  const [description, setDescription] = React.useState('');
  const [open, setOpen] = React.useState(null);
  let pollMeals = [];
  if (poll) {
    const pollKeys = Object.keys(poll);
    console.log({ pollKeys });
    const pollValues = Object.values(poll);
    pollMeals = pollKeys.map((m, i) => ({ m, ...pollValues[i] }));
  }
  console.log({ pollMeals });
  console.log({ meals });

  function handleClickOpen(id) {
    setOpen(id);
  }

  function handleClose() {
    setOpen(null);
  }

  const handleChange = ({ target: { value } }) => {
    if (value !== '') {
      setDescription(value);
    }
  };

  const submit = () => {
    onNewSubmit({ description }, (response) => {
      console.log(';p; ', response);
    });
    setDescription('');
  };

  const addToPoll = (item) => {
    console.log(pollMeals.filter(meal => meal.id !== item.id));
    if (pollMeals.filter(meal => meal.ref === item.id).length === 0) {
      addToWeek(item, (response) => {
        console.log(response);
      });
    }
  };

  const remove = (doc) => {
    console.log('removing', doc);
    removeFromPoll(doc, (response) => {
      console.log(response);
    });
  };

  const deleteFromList = () => {
    deleteMeal(open, (response) => {
      console.log(response);
    });
    handleClose();
  };

  const launch = () => {
    launchPoll((response) => {
      console.log(response);
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleContainer}>
        <Typography variant="h4">
          New lunch poll:&nbsp;
          {moment(nextWed).format('DD-MM-YYYY')}
        </Typography>
        <Button onClick={launch} variant="contained" color="secondary">
          <SendIcon className={classes.rightIcon} />
          Launch poll
        </Button>
      </div>
      <Paper className={classes.paper}>
        <Grid container spacing={8}>
          {(!pollMeals || pollMeals.length === 0) && (
            <Typography variant="h6">
              Nothing added yet
            </Typography>
          )}
          {pollMeals && pollMeals.map(item => (
            <PollItem
              key={item.ref.id}
              item={item.ref}
              remove={() => remove(item.ref.id)}
            />
          ))}
        </Grid>
      </Paper>
      <form className={classes.form} onSubmit={submit}>
        <Typography variant="h5">
          Available Meals
        </Typography>
        <TextField
          id="standard-multiline-flexible"
          value={description}
          onChange={handleChange}
          className={classes.textField}
          margin="normal"
          placeholder="Description..."
        />
        <div>
          <Button onClick={submit} variant="contained" color="secondary">
            <AddIcon className={classes.rightIcon} />
            Add meal
          </Button>
        </div>
      </form>
      <Grid container spacing={24} className={classes.mealItems}>
        {meals && meals.map(item => (
          <LunchItem
            key={item.id}
            item={item}
            addMeal={() => addToPoll(item)}
            deleteMeal={() => handleClickOpen(item.id)}
          />
        ))}
      </Grid>
      <Dialog
        open={open !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Do you really want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteFromList} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const withStore = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object }),
);

const populates = [
  { child: 'ref', root: 'meals' }, // replace ref with meal item
];

export default compose(
  withStore,
  withFirestore,
  withHandlers({
    deleteMeal: props => doc => (
      props.firestore.delete({ doc, collection: 'meals' })
    ),
    removeFromPoll: props => doc => (
      props.firestore.delete({ doc, collection: `polls/${nextWed}/meals` })
    ),
    onNewSubmit: props => newMeal => (
      props.firestore.add('meals', { ...newMeal })
    ),
    launchPoll: props => () => (
      props.firestore.set(`polls/${nextWed}`, { status: 'launched' })
    ),
    addToWeek: ({ firestore }) => meal => (
      firestore.add({ collection: 'polls' }, { meal: meal.id, wednesday: nextWed }) // firestore.doc(`meals/${meal.id}`) })
    ),
  }),
  lifecycle({
    componentDidMount() {
      this.props.firestore.get({ collection: 'polls', where: [['wednesday', '==', nextWed]], populates });
      this.props.firestore.get({ collection: 'meals' });
    },
  }),
  // eslint-disable-next-line
  // firestoreConnect(() => ['meals', { collection: 'polls', where: [['wednesday', '==', nextWed]], populates }]),
  connect(({ firestore }) => ({
    meals: firestore.ordered.meals,
    poll: populate(firestore, 'polls', populates),
  })),
  withStyles(styles),
)(NewLunch);
