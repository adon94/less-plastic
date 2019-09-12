import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  TextField,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import { withFirestore } from 'react-redux-firebase';
import {
  compose,
  withHandlers,
  withContext,
  getContext,
  lifecycle,
} from 'recompose';

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    padding: `0 ${theme.spacing(6)}px`,
  },
  full: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(6),
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
  },
}));

const NewPost = ({ classes, addPost }) => {
  const [post, setPost] = useState('');
  const handleChange = ({ target: { value } }) => {
    setPost(value);
  };
  const submit = () => {
    addPost(post, (response) => {
      console.log(response);
    });
  };
  return (
    <form className={classes.form} onSubmit={submit}>
      <Typography variant="h5">
        New post
      </Typography>
      <TextField
        id="standard-multiline-flexible"
        value={post}
        onChange={handleChange}
        className={classes.textField}
        margin="normal"
        placeholder="Write something here.."
      />
      <div>
        <Button onClick={submit} variant="contained" color="primary">
          <AddIcon className={classes.rightIcon} />
          Add
        </Button>
      </div>
    </form>
  );
};

// const Post = () => {
//   return (
//     <Paper>

//     </Paper>
//   )
// };

const Home = ({ addPost, posts }) => {
  console.log({ posts });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={12} className={classes.full}>
          <NewPost classes={classes} addPost={addPost} />
          {posts && posts.map(item => (
            <Typography key={item.id} variant="body1" gutterBottom>{item.post}</Typography>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

const withStore = compose(
  withContext({ store: PropTypes.object }, () => {}),
  getContext({ store: PropTypes.object }),
);

export default compose(
  withStore,
  withFirestore,
  withHandlers({
    addPost: ({ firestore }) => post => (
      firestore.add({ collection: 'posts' }, { post }) // firestore.doc(`meals/${meal.id}`) })
    ),
  }),
  lifecycle({
    componentDidMount() {
      this.props.firestore.get({ collection: 'posts' });
    },
  }),
  connect(({ firestore }) => ({
    posts: firestore.ordered.posts,
  })),
)(Home);
