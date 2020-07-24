import React from 'react';
import { useRoutes } from 'hookrouter';

import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PasswordForget from './components/PasswordForget/PasswordForget';
import Home from './components/Home/Home';
import Habit from './components/Habit/Habit';
import User from './components/User/User';
import Pacts from './components/Pacts/Pacts';

import * as ROUTES from './constants/routes';

const routes = {
  [ROUTES.HOME]: () => <Home />,
  [ROUTES.SIGN_IN]: () => <SignIn />,
  [ROUTES.SIGN_UP]: () => <SignUp />,
  [ROUTES.PASSWORD_FORGET]: () => <PasswordForget />,
  [ROUTES.ACCOUNT]: () => <User />,
  [ROUTES.HABIT]: ({ id }) => <Habit id={id} />,
  [ROUTES.ACTIVITY]: () => <Pacts />,
};

const Router = () => {
  const routeResult = useRoutes(routes);
  return routeResult;
};

export default Router;
