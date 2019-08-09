import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import Loading from './components/App/Loading/Loading';

import { SIGN_IN } from './constants/routes';

export const UserIsAuthenticated = connectedRouterRedirect({ // eslint-disable-line new-cap
  authenticatingSelector: ({ firebase: { auth, isInitializing } }) => (
    !auth.isLoaded || isInitializing === true
  ),
  authenticatedSelector: ({ firebase: { profile, auth, auth: { isLoaded, isEmpty } } }) => (
    auth === undefined || profile === undefined || isLoaded || !isEmpty
  ),
  allowRedirectBack: false,
  redirectPath: SIGN_IN,
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: Loading,
});

export const UserIsLunchAdmin = connectedRouterRedirect({ // eslint-disable-line new-cap
  authenticatingSelector: ({ firebase: { profile, auth } }) => ({ auth, profile }),
  authenticatedSelector: ({ firebase: { profile, auth, auth: { isLoaded, isEmpty } } }) => (
    auth === undefined || profile === undefined || isLoaded || !isEmpty
  ),
  allowRedirectBack: false,
  redirectPath: SIGN_IN,
  wrapperDisplayName: 'UserIsLunchAdmin',
  AuthenticatingComponent: Loading,
});

export const UserIsCtcAdmin = connectedRouterRedirect({ // eslint-disable-line new-cap
  authenticatingSelector: ({ firebase: { profile, auth } }) => ({ auth, profile }),
  authenticatedSelector: ({ firebase: { profile, auth, isInitializing } }) => (
    auth === undefined || profile === undefined || isInitializing === true || profile.role.name === 'ctcAdmin'
  ),
  allowRedirectBack: false,
  redirectPath: SIGN_IN,
  wrapperDisplayName: 'UserIsCtcAdmin',
  AuthenticatingComponent: Loading,
});
