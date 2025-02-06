import { useNavigate } from 'react-router-dom';
import s from './WaterConsumptionTracker.module.css';

const WaterConsumptionTracker = () => {
  const navigate = useNavigate();

  const handleTryTrackerClick = () => {
    navigate('/signup');
  };

  return (
    <div className={s.trackerBenefits}>
      <h1 className={s.title1}>Water consumption tracker</h1>
      <h2 className={s.title2}>Record daily water intake and track</h2>
      <h3 className={s.title3}>Tracker Benefits</h3>
      <ul className={s.benefitsList}>
        <li>
          <svg className={s.benefitsIcon}>
            <use href="/icons/icons-sprite.svg#calendar-days"></use>
          </svg>
          <p className={s.benefitsText}>Habit drive</p>
        </li>
        <li>
          <svg className={s.benefitsIcon}>
            <use href="/icons/icons-sprite.svg#presentation-chart-bar"></use>
          </svg>
          <p className={s.benefitsText}>View statistics</p>
        </li>
        <li>
          <svg className={s.benefitsIcon}>
            <use href="/icons/icons-sprite.svg#wrench-screwdriver"></use>
          </svg>
          <p className={s.benefitsText}>Personal rate setting</p>
        </li>
      </ul>

      <button
        className={s.btnTryTracker}
        type="button"
        onClick={handleTryTrackerClick}
      >
        Try tracker
      </button>
    </div>
  );
};

export default WaterConsumptionTracker;
