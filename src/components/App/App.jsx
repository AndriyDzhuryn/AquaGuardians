import { lazy, Suspense, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Circles } from 'react-loader-spinner';

import css from './App.module.css';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage.jsx'));
const SigninPage = lazy(() => import('../../pages/SigninPage/SigninPage.jsx'));
const WelcomePage = lazy(() =>
  import('../../pages/WelcomePage/WelcomePage.jsx')
);
const NotFoundPage = lazy(() => {
  return import('../../pages/NotFoundPage/NotFoundPage.jsx');
});

import RestrictedRoute from '../RestrictedRoute/RestrictedRoute.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';
import { apiGetCurrentUser } from '../../redux/auth/operations.js';
import { selectAuthIsRefreshing } from '../../redux/auth/selectors.js';
import LogoutModal from '../LogoutModal/LogoutModal.jsx';

function App() {
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetCurrentUser());
  }, [dispatch]);

  if (isRefreshing) {
    return (
      <div className={css.loaderWrapper}>
        <Circles
          height="80"
          width="80"
          color="#0000ff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <Suspense>
      <LogoutModal />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/home"
          element={<PrivateRoute component={<HomePage />} />}
        />
        <Route
          path="/signup"
          element={
            <RestrictedRoute component={<SignupPage />} redirectTo="/signin" />
          }
        />
        <Route
          path="/signin"
          element={<RestrictedRoute component={<SigninPage />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
