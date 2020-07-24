import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   Button,
//   CardActions,
// } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import useLongPress from '../../../../util/useLongPress';

const useStyles = makeStyles(theme => ({
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
  completed: {
    boxShadow: '0 0 20px 2px #c0392b',
    borderColor: '#c0392b',
    transition: '0.5s',
  },
}));

const Streak = ({ number }) => {
  const classes = useStyles();
  const [completed, setCompleted] = useState(false);
  const onLongPress = (e) => {
    console.log('e', e);
    setCompleted(true);
  };
  const longPressProps = useLongPress(onLongPress, 500);
  return (
    <div className={classes.streakContainer}>
      <div className={`${classes.streak} ${completed ? classes.completed : ''}`} {...longPressProps}>
        <Typography variant="h3">
          {number}
        </Typography>
      </div>
    </div>
  );
};

export default Streak;
