import {
  SET_CURRENT_USER,
  LOGOUT,
  REGISTER,
} from './authActionTypes';

const initialState = {
  currentUser: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.error ? null : action.payload,
      };
    case LOGOUT:
      return {
        ...state, redirectTo: '/', token: null, currentUser: null,
      };
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/settings',
        currentUser: action.error ? null : action.payload.user,
        onboarding: true,
      };
    default:
      return state;
  }
};
