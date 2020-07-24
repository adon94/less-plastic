import React, { useEffect, useState } from 'react';

import PagerMobile from '../Navigation/PagerMobile/PagerMobile';
import HabitItem from '../Home/HabitItem/HabitItem';
import PactsList from '../Pacts/PactsList/PactsList';

import firebase from '../../firebase';

const Habit = ({ id }) => {
  const [currentHabit, setCurrentHabit] = useState(null);
  const [habitPacts, setHabitPacts] = useState(null);
  useEffect(() => {
    firebase.getHabit(id).then(setCurrentHabit);
    firebase.getHabitPacts(id).then(setHabitPacts);
  }, []);
  if (currentHabit) {
    return (
      <div>
        <PagerMobile prompt="Back" />
        <HabitItem item={currentHabit} isMain />
        {habitPacts && <PactsList pacts={habitPacts} />}
      </div>
    );
  }
  return null;
};

export default Habit;
