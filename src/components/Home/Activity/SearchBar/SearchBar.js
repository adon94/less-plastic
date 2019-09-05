import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles(() => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

const SearchBar = React.forwardRef((props, ref) => (
  <AppBar>
    <Toolbar>
      <Typography variant="h6">Scroll to Hide App Bar</Typography>
    </Toolbar>
  </AppBar>
));

export default SearchBar;
