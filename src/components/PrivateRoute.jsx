import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectLogged } from '../redux/auth/selectors.js';

const PrivateRoute = ({ component: Component, redirectTo = '/signin' }) => {
  const isLoggedIn = useSelector(selectLogged);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
