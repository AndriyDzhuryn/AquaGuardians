// import { useState, useRef, useEffect } from 'react';

import css from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ isOpen, date, waterData }) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const [position, setPosition] = useState('left');
  // const dropdownRef = useRef(null);
  // const buttonRef = useRef(null);

  // useEffect(() => {
  //   if (isOpen) {
  //     const dropdownRect = dropdownRef.current.getBoundingClientRect();
  //     const buttonRect = buttonRef.current.getBoundingClientRect();

  //     if (dropdownRect.right > window.innerWidth) {
  //       setPosition('right');
  //     } else {
  //       setPosition('left');
  //     }
  //   }
  // }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          // ref={dropdownRef}
          // className={`dropdown-content ${position}`}
          className={css.dropdownWrapper}
        >
          <p className={css.dateMonth}>
            {date?.toLocaleDateString('en-US', {
              day: 'numeric',
            })}
            ,{' '}
            {date?.toLocaleDateString('en-US', {
              month: 'long',
            })}
          </p>
          <p className={css.dailyNorma}>
            Daily norma: <b>{waterData.norm} L</b>
          </p>
          <p className={css.dailyNorma}>
            Fulfillment of the daily norm: <b>{waterData.progress}%</b>
          </p>
          <p className={css.dailyNorma}>
            How many servings of water: <b>{waterData.servings}</b>
          </p>
        </div>
      )}
    </>
  );
};

export default DaysGeneralStats;
