import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

import lunchOptions from './lunchOptions';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: `${theme.spacing()}px 0`,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  rightIcon: {
    marginLeft: theme.spacing(),
  },
});

class LunchPoll extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Choose your next Wednesday lunch (10.04.2019) until next Monday, 12pm.</FormLabel>
          <RadioGroup
            aria-label="Choose your next lunch"
            name="lunch1"
            className={classes.group}
            value={value}
            onChange={e => this.handleChange(e)}
          >
            {lunchOptions.map(item => (
              <FormControlLabel
                value={item.id}
                key={item.id}
                control={<Radio />}
                label={item.description}
              />
            ))}
          </RadioGroup>
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="primary">
              View Results
            </Button>
            <Button variant="contained" color="secondary">
              Submit
              <CheckIcon className={classes.rightIcon} />
            </Button>
          </div>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(LunchPoll);
