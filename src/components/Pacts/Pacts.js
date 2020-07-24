import React, { useEffect, useState } from 'react';

import PactsList from './PactsList/PactsList';

import firebase from '../../firebase';

const Pacts = () => {
  const [pacts, setPacts] = useState([]);
  useEffect(() => {
    firebase.getUserPacts().then(setPacts);
  }, []);
  return (
    <PactsList pacts={pacts} />
  );
};

export default Pacts;
