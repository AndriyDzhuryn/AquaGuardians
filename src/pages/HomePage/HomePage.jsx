import { useSelector } from 'react-redux';
import DailyNormaPanel from '../../components/DailyNormaPanel/DailyNormaPanel.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import WaterTracker from '../../components/WaterTracker/WaterTracker.jsx';

import { selectAuthIsLoading } from '../../redux/auth/selectors.js';

import css from './HomePage.module.css';
import { Circles } from 'react-loader-spinner';

const HomePage = () => {
  const logoutLoading = useSelector(selectAuthIsLoading);

  if (logoutLoading) {
    return (
      <div className={css.loaderWrapper}>
        <Circles
          height="80"
          width="80"
          color="#5353ec"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <div className={css.DailyWater}>
          <DailyNormaPanel />
          <WaterRatioPanel />
        </div>
        <WaterTracker />
      </div>
    </section>
  );
};

export default HomePage;
