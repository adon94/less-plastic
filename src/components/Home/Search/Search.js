import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Button,
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  searchContainer: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(),
    [theme.breakpoints.up('md')]: {
      padding: `${theme.spacing()}px ${theme.spacing(6)}px`,
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
    },
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = ({ handleOpenDialog }) => {
  const classes = useStyles();
  return (
    <div className={classes.searchContainer}>
      {/* <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search for a habit or category"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper> */}
      <Button onClick={handleOpenDialog} variant="outlined" fullWidth color="inherit">
        <AddIcon className={classes.rightIcon} />
        Add a habit
      </Button>
    </div>
  );
};

export default Search;
