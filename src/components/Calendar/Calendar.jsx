import { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
} from 'date-fns';
import clsx from 'clsx';

import css from './Calendar.module.css';

const Calendar = ({ waterData }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  return (
    <div className={css.calendarWrapper}>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>Month</h2>
        <div className={css.btnMonthWrapper}>
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className={css.btnSwitchMonth}
          >
            <svg className={css.switchMonth}>
              <use href="../../../public/icons/icons-sprite.svg#chevron-left"></use>
            </svg>
          </button>
          <p className={css.monthName}>{format(currentDate, 'MMMM yyyy')}</p>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className={css.btnSwitchMonth}
          >
            <svg className={css.switchMonth}>
              <use href="../../../public/icons/icons-sprite.svg#chevron-right"></use>
            </svg>
          </button>
        </div>
      </div>

      <div className={css.wrapperDays}>
        {days.map(day => {
          const progress = waterData[format(day, 'yyyy-MM-dd')] || 0;
          return (
            <div key={day} className={css.wrapperDay}>
              <button className={clsx(css.day, progress < 100 && css.norm)}>
                {format(day, 'd')}
              </button>
              <span className={css.textProgress}>{progress}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
