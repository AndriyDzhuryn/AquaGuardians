import DailyNormaPanel from '../../components/DailyNormaPanel/DailyNormaPanel.jsx';
import WaterRatioPanel from '../../components/WaterRatioPanel/WaterRatioPanel.jsx';
import WaterTracker from '../../components/WaterTracker/WaterTracker.jsx';

import css from './HomePage.module.css';

const HomePage = () => {
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
