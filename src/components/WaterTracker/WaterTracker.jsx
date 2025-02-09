import { useState } from 'react';
import clsx from 'clsx';

import WaterItems from '../WaterItems/WaterItems.jsx';
import Calendar from '../Calendar/Calendar.jsx';

import css from './WaterTracker.module.css';

const WaterTracker = () => {
  const [waterList, setWaterList] = useState([
    { id: 1, amount: 250, time: '07:00 AM' },
    { id: 2, amount: 220, time: '11:00 AM' },
    { id: 3, amount: 200, time: '14:00 PM' },
    { id: 4, amount: 250, time: '07:00 AM' },
    { id: 5, amount: 220, time: '11:00 AM' },
    { id: 6, amount: 200, time: '14:00 PM' },
    { id: 7, amount: 250, time: '07:00 AM' },
    { id: 8, amount: 220, time: '11:00 AM' },
    { id: 9, amount: 200, time: '14:00 PM' },
  ]);

  const waterData = {
    '2025-01-01': { norm: 1.5, progress: 60, servings: 6 },
    '2025-01-02': { norm: 2.0, progress: 80, servings: 8 },
    '2025-01-03': { norm: 1.5, progress: 100, servings: 5 },
    '2025-01-04': { norm: 1.5, progress: 70, servings: 4 },
    '2025-01-05': { norm: 1.5, progress: 60, servings: 6 },
    '2025-01-06': { norm: 1.5, progress: 100, servings: 4 },
    '2025-01-07': { norm: 1.5, progress: 60, servings: 6 },
    '2025-01-08': { norm: 1.5, progress: 70, servings: 5 },
    '2025-01-09': { norm: 1.5, progress: 60, servings: 6 },
    '2025-01-10': { norm: 1.5, progress: 100, servings: 6 },
    '2025-01-11': { norm: 1.5, progress: 60, servings: 5 },
    '2025-01-17': { norm: 1.5, progress: 70, servings: 6 },
    '2025-01-19': { norm: 1.5, progress: 100, servings: 4 },
    '2025-01-20': { norm: 1.5, progress: 60, servings: 6 },
  };

  return (
    <div className={css.waterTrackerWrapper}>
      <h2 className={css.title}>Today</h2>

      <ul
        className={clsx(
          css.listWaterTracker,
          waterList.length < 5 && css.scrollbar
        )}
      >
        {waterList.map(item => (
          <li key={item.id} className={css.waterConsumedItem}>
            <WaterItems amount={item.amount} time={item.time} id={item.id} />
          </li>
        ))}
      </ul>
      <button className={css.btnAddWater}>
        <svg className={css.plus}>
          <use href="/public/icons/icons-sprite.svg#plus-small"></use>
        </svg>
        Add water
      </button>

      <Calendar waterData={waterData} />
    </div>
  );
};

export default WaterTracker;
