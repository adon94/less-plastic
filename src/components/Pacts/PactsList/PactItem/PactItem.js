import React from 'react';

import { Emoji } from 'emoji-mart';
import {
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../../../../firebase';

const useStyles = makeStyles(theme => ({
  pactItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[400]}`,
  },
  emoji: {
    marginLeft: theme.spacing(),
  },
  button: {
    marginRight: theme.spacing(),
    marginTop: theme.spacing(),
  },
  streak: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  gridItem: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.spacing(6)}`,
    },
  },
}));

const PactItem = ({
  pact, currentUser, remove, index,
}) => {
  const classes = useStyles();
  console.log(index);
  const decline = async () => {
    const response = await firebase.declinePact(pact.id, pact.habitIds[0]);
    console.log(response);
    if (response.message === 'success') {
      remove();
    }
  };
  return (
    <Grid className={classes.gridItem} item key={pact.id} xs={12} md={4}>
      <div className={classes.pactItem}>
        <div className={classes.streak}>
          <Typography variant="h5">
            {pact.streak ? pact.streak : '0'}
          </Typography>
          <div className={classes.emoji}>
            <Emoji emoji={pact.emoji} size={25} />
          </div>
        </div>
        <div>
          <Typography variant="h5">
            {pact.displayNames[0]}
          </Typography>
          {pact.habitNames && (
          <Typography variant="subtitle1">
            <b>{pact.habitNames[0]}</b>
            {' '}
            {pact.habitNames[1] !== undefined && `& ${pact.habitNames[1]}`}
          </Typography>
          )}
          {(pact.pending && pact.pending === currentUser.uid) && (
            <>
              <Button
                color="primary"
                variant="outlined"
                // onClick={() => setOpen(true)}
                startIcon={<CheckIcon />}
                className={classes.button}
              >
                Accept
              </Button>
              <Button
                color="primary"
                variant="outlined"
                onClick={decline}
                startIcon={<CloseIcon />}
                className={classes.button}
              >
                Decline
              </Button>
            </>
          )}
          {(pact.pending && pact.pending !== currentUser.uid) && (
            <Typography variant="caption">PENDING</Typography>
          )}
        </div>
      </div>
    </Grid>
  );
};

export default PactItem;
