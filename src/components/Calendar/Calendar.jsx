import { useState, useRef, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
} from 'date-fns';

import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';
import css from './Calendar.module.css';
import clsx from 'clsx';

const Calendar = ({ waterData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  // const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        calendarRef.current &&
        calendarRef.current.contains(event.target) &&
        (!dropdownRef.current || !dropdownRef.current.contains(event.target))
      ) {
        setIsOpen(!isOpen);
        setSelectedDate(null);
      }
      if (selectedDate === null) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDayClick = (event, day) => {
    // const rect = event.target.getBoundingClientRect();
    // const calendarRect = calendarRef.current.getBoundingClientRect();
    const rect = event.target.getBoundingClientRect();
    console.log(rect);

    setIsOpen(!isOpen);

    // setMenuPosition({
    //   top: rect.top - calendarRect.top - 80,
    //   left: rect.left - calendarRect.left + rect.width / 2 - 100,
    // });

    setSelectedDate(prevDate => (prevDate === day ? null : day));
  };

  return (
    <div className={css.calendarWrapper} ref={calendarRef}>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>Month</h2>
        <div className={css.btnMonthWrapper}>
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className={css.btnSwitchMonth}
          >
            <svg className={css.switchMonth}>
              <use href="../../../icons/icons-sprite.svg#chevron-left"></use>
            </svg>
          </button>
          <p className={css.monthName}>{format(currentDate, 'MMMM yyyy')}</p>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className={css.btnSwitchMonth}
          >
            <svg className={css.switchMonth}>
              <use href="../../../icons/icons-sprite.svg#chevron-right"></use>
            </svg>
          </button>
        </div>
      </div>

      <div className={css.wrapperDays}>
        {days.map(day => (
          <div key={day} className={css.wrapperDay}>
            <button
              className={clsx(
                css.day,
                waterData[format(day, 'yyyy-MM-dd')] < 100 && css.norm
              )}
              onClick={event => handleDayClick(event, day)}
            >
              {format(day, 'd')}
            </button>
            <span className={css.textProgress}>
              {waterData[format(day, 'yyyy-MM-dd')]?.progress || 0}%
            </span>
          </div>
        ))}
        <div ref={dropdownRef}>
          <DaysGeneralStats
            isOpen={isOpen}
            date={selectedDate}
            waterData={
              waterData[format(selectedDate, 'yyyy-MM-dd')] || {
                norm: 0,
                progress: 0,
                servings: 0,
              }
            }
          />
        </div>
      </div>

      {/* {selectedDate && isOpen && (
        <div
          className={css.dropdownMenu}
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
        > */}

      {/* </div>
      )} */}
    </div>
  );
};

export default Calendar;
