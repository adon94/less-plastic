import React from 'react';
import { compose } from 'redux';
import {
  Grid,
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(8),
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  cardActions: {
    justifyContent: 'space-between',
  },
});

const LunchItem = ({
  classes, item, addMeal, deleteMeal,
}) => (
  <Grid item xs={12} md={3}>
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="body1" component="p">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button onClick={addMeal} variant="outlined" color="secondary">
          <AddIcon className={classes.rightIcon} />
          Add to poll
        </Button>
        <IconButton onClick={deleteMeal} aria-label="Delete" className={classes.margin}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  </Grid>
);

export default compose(
  withStyles(styles),
)(LunchItem);
