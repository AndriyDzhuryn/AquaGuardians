import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Circles } from 'react-loader-spinner';

import Layout from '../Layout/Layout.jsx';
import RestrictedRoute from '../RestrictedRoute.jsx';
import PrivateRoute from '../PrivateRoute.jsx';

import { selectRefreshing } from '../../redux/auth/selectors.js';

import css from './App.module.css';

const WelcomePage = lazy(() =>
  import('../../pages/WelcomePage/WelcomePage.jsx')
);
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const SignupPage = lazy(() => import('../../pages/SignupPage/SignupPage.jsx'));
const SigninPage = lazy(() => import('../../pages/SigninPage/SigninPage.jsx'));
const NotFoundPage = lazy(() => {
  return import('../../pages/NotFoundPage/NotFoundPage.jsx');
});

function App() {
  const isRefreshing = useSelector(selectRefreshing);

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
    <div className={css.appWrapper}>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/signup"
            element={<RestrictedRoute component={<SignupPage />} />}
          />
          <Route
            path="/signin"
            element={<RestrictedRoute component={<SigninPage />} />}
          />
          <Route
            path="/home"
            element={<PrivateRoute component={<HomePage />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
