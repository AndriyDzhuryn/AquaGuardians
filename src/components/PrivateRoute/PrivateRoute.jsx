import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectAuthIsLoggedIn } from '../../redux/auth/selectors';

const PrivateRoute = ({ component, redirectTo = '/signin' }) => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
