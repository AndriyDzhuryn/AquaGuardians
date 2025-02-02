import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectLogged } from '../redux/auth/selectors.js';

const RestrictedRoute = ({ component: Component, redirectTo = '/home' }) => {
  const isLoggedIn = useSelector(selectLogged);
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRoute;
