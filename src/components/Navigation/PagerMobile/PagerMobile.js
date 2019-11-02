import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles(({ palette, spacing, shadows }) => ({
  pager: {
    zIndex: 5,
    top: 0,
    width: '100%',
    // color: palette.primary.contrastText,
    // backgroundColor: palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    // boxShadow: shadows[1],
  },
  button: {
    margin: spacing(1),
  },
}));

const PagerMobile = ({ prompt }) => {
  // const path = usePath();
  // const [currentTab, setCurrentTab] = useState(0);
  const classes = useStyles();

  return (
    <div className={classes.pager}>
      <IconButton color="inherit" onClick={() => window.history.go(-1)}>
        <ArrowBackIcon />
        {prompt && (
        <Typography variant="subtitle1">
          {prompt.toUpperCase()}
        </Typography>
        )}
      </IconButton>
    </div>
  );
};

export default PagerMobile;
