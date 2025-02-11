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
import { useDispatch, useSelector } from 'react-redux';

import DaysGeneralStats from '../DaysGeneralStats/DaysGeneralStats.jsx';

import { apiGetMonthWater } from '../../redux/month/operations.js';
import { selectMonthUserData } from '../../redux/month/selectors.js';

import css from './Calendar.module.css';

const Calendar = () => {
  const monthData = useSelector(selectMonthUserData);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: -8 });

  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });
  const month = start.toLocaleDateString('en-US', { month: 'numeric' });
  const year = start.toLocaleDateString('en-US', { year: 'numeric' });

  useEffect(() => {
    dispatch(apiGetMonthWater({ month, year }));

    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, month, year]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
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
              <use href="/icons/icons-sprite.svg#chevron-left"></use>
            </svg>
          </button>
          <p className={css.monthName}>{format(currentDate, 'MMMM yyyy')}</p>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className={css.btnSwitchMonth}
          >
            <svg className={css.switchMonth}>
              <use href="/icons/icons-sprite.svg#chevron-right"></use>
            </svg>
          </button>
        </div>
      </div>

      <div className={css.wrapperDays}>
        {Array.isArray(monthData) &&
          days.map(day => {
            const formattedDate = format(day, 'dd, MMMM');
            const dayData = monthData.find(item => item.date === formattedDate);
            const percentage = dayData ? parseFloat(dayData.percentage) : 0;
            return (
              <div key={day} className={css.wrapperDay}>
                <button
                  ref={buttonRef}
                  className={clsx(
                    css.day,
                    dayData && percentage < 100 && css.norm
                  )}
                  onClick={event => handleDayClick(event, day)}
                >
                  {format(day, 'd')}
                </button>
                <span className={css.textProgress}>
                  {percentage ? `${percentage}%` : '0%'}
                </span>
              </div>
            );
          })}
        <div ref={dropdownRef}>
          {Array.isArray(monthData) && (
            <DaysGeneralStats
              position={menuPosition}
              isOpen={isOpen}
              date={selectedDate}
              monthData={
                monthData.find(
                  item => item.date === format(selectedDate, 'dd, MMMM')
                ) || {
                  dailyWaterNorm: '0 L',
                  percentage: '0%',
                  consumptionCount: 0,
                }
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
