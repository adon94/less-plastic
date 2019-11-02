import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

// const composeEnhancers = composeWithDevTools({ trace: true });
export default () => createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
