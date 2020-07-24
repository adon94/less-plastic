import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PactItem from './PactItem/PactItem';

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
}));

const PactsList = ({ pacts, currentUser }) => {
  const [pactList, setPactList] = useState(pacts);
  const classes = useStyles();
  useEffect(() => {
    console.log('updated');
    setPactList(pacts);
  }, [pacts]);
  const removePact = (index) => {
    const newPactList = pactList.splice(index, 1);
    console.log('pactlist', pactList);
    console.log(`At index ${index}`, pactList[index]);
    console.log({ newPactList });
    setPactList(newPactList);
  };
  return (
    <div className={classes.full}>
      <Grid container className={classes.feed} spacing={0}>
        {pactList && pactList.map((item, index) => (
          <PactItem
            key={item.id}
            pact={item}
            currentUser={currentUser}
            remove={() => removePact(index)}
            index={index}
          />
        ))}
      </Grid>
    </div>
  );
};

function mapStateToProps(state) {
  const { auth: { currentUser } } = state;
  return { currentUser };
}

export default connect(mapStateToProps)(PactsList);
