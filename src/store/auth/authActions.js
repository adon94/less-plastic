import {
  SET_CURRENT_USER,
  LOGOUT,
  REGISTER,
} from './authActionTypes';

export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  payload: currentUser,
});

export const register = currentUser => ({
  type: REGISTER,
  payload: currentUser,
});

export const logout = () => ({
  type: LOGOUT,
});
