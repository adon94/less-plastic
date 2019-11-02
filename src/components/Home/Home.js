import React, { useEffect, useState } from 'react';

import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Search from './Search/Search';
import BrandPost from './BrandPost/BrandPost';
import AddBrand from './AddBrand/AddBrand';

import firebase from '../../firebase';

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
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (brands.length === 0) {
      firebase.getBrands().then(setBrands);
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (loadNew) => {
    setOpen(false);
    if (loadNew) {
      firebase.getBrands().then(setBrands);
    }
  };

  return (
    <>
      <div className={classes.full}>
        <Search handleOpenDialog={handleClickOpen} />
        <Grid container className={classes.feed} spacing={0}>
          {/* <Button variant="contained" color="primary">
            <AddIcon className={classes.rightIcon} />
            Add a brand
          </Button> */}
          {brands && brands.map(item => (
            <Grid className={classes.gridItem} item key={item.id} xs={12} md={4}>
              <BrandPost item={item} />
            </Grid>
          ))}
        </Grid>
      </div>
      <AddBrand
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </>
  );
};

export default Home;
