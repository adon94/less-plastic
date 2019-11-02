import React from 'react';
import { navigate } from 'hookrouter';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import { BRAND } from '../../../constants/routes';

const useStyles = makeStyles(theme => ({
  card: {
    borderTop: `1px solid ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      borderTop: 'none',
    },
  },
  media: {
    height: 140,
    backgroundSize: 'contain',
    [theme.breakpoints.up('md')]: {
      height: 250,
    },
  },
  cardActions: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
  voters: {
    textAlign: 'center',
  },
  barContainer: {
    width: '100%',
    marginRight: theme.spacing(),
  },
  bar: {
    backgroundColor: theme.palette.error.main,
  },
}));

export const ScorePreview = ({ classes }) => (
  <>
    <div className={classes.voters}>
      440 votes
    </div>
    <div className={classes.barContainer}>
      <LinearProgress className={classes.bar} variant="determinate" value={43} thickness={6} />
    </div>
  </>
);

const BrandPost = ({ item: { id, brand: { name, category } } }) => {
  const classes = useStyles();
  const openBrand = () => {
    const url = BRAND.replace(':id', id);
    navigate(url);
  };
  return (
    <Card elevation={0} square className={classes.card}>
      <CardActionArea onClick={openBrand}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`#${category}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <ScorePreview classes={classes} />
      </CardActions>
    </Card>
  );
};

export default BrandPost;
