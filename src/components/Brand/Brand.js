import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { ScorePreview } from '../Home/BrandPost/BrandPost';
import Rater from './Rater/Rater';
import Comments from './Comments/Comments';
import PagerMobile from '../Navigation/PagerMobile/PagerMobile';

import firebase from '../../firebase';

const useStyles = makeStyles(theme => ({
  card: {
    // maxWidth: 345,
  },
  withPadding: {
    // marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
  },
  media: {
    height: 140,
    backgroundSize: 'contain',
    [theme.breakpoints.up('md')]: {
      height: 250,
    },
  },
  cardActions: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: theme.palette.grey[100],
  },
  voters: {
    textAlign: 'center',
  },
  barContainer: {
    width: '100%',
  },
  bar: {
    backgroundColor: theme.palette.error.main,
  },
  scoreContainer: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    // backgroundColor: theme.palette.grey[100],
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // width: '100%',
  },
}));

const Brand = ({ id }) => {
  const [currentBrand, setCurrentBrand] = useState(null);
  const classes = useStyles();
  console.log({ id });
  useEffect(() => {
    if (!currentBrand) {
      firebase.getBrand(id).then(setCurrentBrand);
    }
  });

  const rate = async () => {
    const response = await firebase.addRating(true, id);
    console.log(response);
    // firestore.collection('ratings').add(rating);
  };
  if (currentBrand) {
    const { brand: { name, category } } = currentBrand;
    console.log(currentBrand);
    return (
      <div>
        <PagerMobile prompt="Back" />
        <div className={classes.withPadding}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`#${category}`}
          </Typography>
        </div>
        <div className={`${classes.scoreContainer} ${classes.withPadding}`}>
          <ScorePreview classes={classes} />
        </div>
        <Rater rate={rate} />
        <Comments />
      </div>
    );
  }
  return null;
};

export default Brand;
