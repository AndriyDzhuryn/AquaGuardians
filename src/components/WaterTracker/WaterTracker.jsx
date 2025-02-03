import { useState } from 'react';

import css from './WaterTracker.module.css';
import WaterItems from '../WaterItems/WaterItems';
import Calendar from '../Calendar/Calendar';
import clsx from 'clsx';

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
    '2025-01-01': 100,
    '2025-01-02': 100,
    '2025-01-03': 100,
    '2025-01-04': 100,
    '2025-01-05': 100,
    '2025-01-06': 100,
    '2025-01-07': 100,
    '2025-01-08': 100,
    '2025-01-09': 100,
    '2025-01-10': 100,
    '2025-01-11': 100,
    '2025-01-17': 50,
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
            <WaterItems amount={item.amount} time={item.time} />
          </li>
        ))}
      </ul>
      <button className={css.btnAddWater}>
        <svg className={css.plus}>
          <use href="../../../public/icons/icons-sprite.svg#plus-small"></use>
        </svg>
        Add water
      </button>

      <Calendar waterData={waterData} />
    </div>
  );
};

export default WaterTracker;
