import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import Slider from '../../components/Slider/Slider.jsx';
import WaterTracker from '../../components/WaterTracker/WaterTracker.jsx';

import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <div>
          <DailyNorma />
          <Slider />
        </div>
        <WaterTracker />
      </div>
    </section>
  );
};

export default HomePage;
