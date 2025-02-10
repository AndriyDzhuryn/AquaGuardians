import DailyNormaPanel from '../../components/DailyNormaPanel/DailyNormaPanel.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import WaterTracker from '../../components/WaterTracker/WaterTracker.jsx';

import css from './HomePage.module.css';

// import { useLayoutEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { apiGetCurrentUser } from '../../redux/auth/operations.js';
// const dispatch = useDispatch();
// useLayoutEffect(() => {
//   dispatch(apiGetCurrentUser());
// }, []);

const HomePage = () => {
  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <div>
          <DailyNormaPanel />
          <WaterRatioPanel />
        </div>
        <WaterTracker />
      </div>
    </section>
  );
};

export default HomePage;
