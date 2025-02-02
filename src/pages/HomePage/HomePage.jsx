import DailyNorma from '../../components/DailyNorma/DailyNorma.jsx';
import Slider from '../../components/Slider/Slider.jsx';
import WaterTracker from '../../components/WaterTracker/WaterTracker.jsx';

import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <section className={css.section}>
      <div className={css.welcomeWrapper}>
        <div>
          <DailyNorma />
          <div className={css.btnSliderWrapper}>
            <Slider />
            <button className={css.btn} type="submit">
              <svg className={css.editWaterItem}>
                <use href="../../../public/icons/icons-sprite.svg#plus-circle"></use>
              </svg>
              Add Water
            </button>
          </div>
        </div>
        <WaterTracker />
      </div>
    </section>
  );
};

export default HomePage;
