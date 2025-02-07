import { useState, useRef, useEffect } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
} from 'date-fns';
import clsx from 'clsx';

import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';

import css from './Calendar.module.css';

const Calendar = ({ waterData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: -8 });

  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        calendarRef.current &&
        calendarRef.current.contains(event.target) &&
        (!dropdownRef.current || !dropdownRef.current.contains(event.target))
      ) {
        setSelectedDate(null);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDayClick = (event, day) => {
    setSelectedDate(day);
    setIsOpen(true);

    const buttonElement = event.target.closest(`.${css.day}`);
    if (!buttonElement) return;

    const buttonRect = buttonElement.getBoundingClientRect();
    const calendarRect = calendarRef.current.getBoundingClientRect();

    let left = -8;
    let top = buttonRect.top - calendarRect.top - 250;

    if (windowWidth < 768) {
      left = -8;
      top = buttonRect.top - calendarRect.top - 250;
    } else if (windowWidth >= 768 && windowWidth < 1440) {
      left = buttonRect.left - calendarRect.left - 275;
      top = buttonRect.top - calendarRect.top - 238;
      if (left < -10) {
        left = buttonRect.left - calendarRect.left + 17;
        top = buttonRect.top - calendarRect.top - 238;
      }
    } else if (windowWidth >= 1440) {
      left = buttonRect.left - calendarRect.left - 275;
      top = buttonRect.top - calendarRect.top - 238;
    }
    setMenuPosition({ top, left });
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
            position={menuPosition}
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
    </div>
  );
};

export default Calendar;
