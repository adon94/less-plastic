import React from 'react';
import { useRoutes } from 'hookrouter';

import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import PasswordForget from './components/PasswordForget/PasswordForget';
import Home from './components/Home/Home';
import Brand from './components/Brand/Brand';
import User from './components/User/User';

import * as ROUTES from './constants/routes';

const routes = {
  [ROUTES.HOME]: () => <Home />,
  [ROUTES.SIGN_IN]: () => <SignIn />,
  [ROUTES.SIGN_UP]: () => <SignUp />,
  [ROUTES.PASSWORD_FORGET]: () => <PasswordForget />,
  [ROUTES.ACCOUNT]: () => <User />,
  [ROUTES.BRAND]: ({ id }) => <Brand id={id} />,
};

const Router = () => {
  const routeResult = useRoutes(routes);
  return routeResult;
};

export default Router;
