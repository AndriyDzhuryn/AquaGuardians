import { Suspense } from 'react';
import { Circles } from 'react-loader-spinner';

import css from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Suspense
        fallback={
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
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
