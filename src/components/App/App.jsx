import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import RestrictedRoute from '../RestrictedRoute/RestrictedRoute.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';

import { apiGetCurrentUser } from '../../redux/auth/operations.js';

import SharedLayout from '../SharedLayout/SharedLayout.jsx';
import { useDispatch } from 'react-redux';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const SignUpPage = lazy(() => import('../../pages/SignupPage/SignupPage.jsx'));
const SignInPage = lazy(() => import('../../pages/SigninPage/SigninPage.jsx'));
const WelcomePage = lazy(() =>
  import('../../pages/WelcomePage/WelcomePage.jsx')
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetCurrentUser());
  }, [dispatch]);

  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={<RestrictedRoute component={<WelcomePage />} />}
          />

          <Route
            path="home"
            element={<PrivateRoute component={<HomePage />} />}
          />

          <Route
            path="signup"
            element={
              <RestrictedRoute
                component={<SignUpPage />}
                redirectTo="/signin"
              />
            }
          />

          <Route
            path="signin"
            element={<RestrictedRoute component={<SignInPage />} />}
          />

          <Route
            path="*"
            element={<RestrictedRoute component={<SignInPage />} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
