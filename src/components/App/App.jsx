// import { lazy, useEffect } from "react";
// import { Circles } from "react-loader-spinner";

import css from './App.module.css';

import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

// const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
// const SignupPage = lazy(() => import("../../pages/SignupPage/SignupPage.jsx"));
// const SigninPage = lazy(() => import("../../pages/SigninPage/SigninPage.jsx"));
// const WelcomePage = lazy(() =>
//   import("../../pages/WelcomePage/WelcomePage.jsx")
// );
// const NotFoundPage = lazy(() => {
//   return import("../../pages/NotFoundPage/NotFoundPage.jsx");
// });

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
    <>
      <div className={css.appWrapper}>App</div>
      <NotFoundPage />
    </>
  );
}

export default App;
