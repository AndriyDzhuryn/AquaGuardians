import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { Circles } from "react-loader-spinner";

import Layout from '../Layout/Layout';
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
  // if (isRefreshing) {
  //   return (
  //     <div className={css.loaderWrapper}>
  //       <Circles
  //         height="80"
  //         width="80"
  //         color="#0000ff"
  //         ariaLabel="circles-loading"
  //         wrapperStyle={{}}
  //         wrapperClass=""
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div className={css.appWrapper}>
      <Layout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
