import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import WaterItems from '../WaterItems/WaterItems.jsx';
import Calendar from '../Calendar/Calendar.jsx';
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';

import { selectTodayUserData } from '../../redux/today/selectors.js';
import { apiGetTodayWater } from '../../redux/today/operations.js';

import css from './WaterTracker.module.css';

const WaterTracker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetTodayWater());
  }, [dispatch]);

  const waterToday = useSelector(selectTodayUserData);
  const waterList = waterToday.records;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.waterTrackerWrapper}>
      <div className={css.listWrapper}>
        <h2 className={css.title}>Today</h2>

        {Array.isArray(waterList) && waterList.length !== 0 && (
          <ul
            className={clsx(
              css.listWaterTracker,
              waterList.length < 5 && css.scrollbar
            )}
          >
            {waterList.map(item => (
              <li key={item._id} className={css.waterConsumedItem}>
                <WaterItems
                  amount={item.volume}
                  time={item.date}
                  id={item._id}
                />
              </li>
            ))}
          </ul>
        )}

        <button className={css.btnAddWater} onClick={openModal}>
          <svg className={css.plus}>
            <use href="/icons/icons-sprite.svg#plus-small"></use>
          </svg>
          Add water
        </button>
      </div>

      <AddWaterModal isOpen={isModalOpen} onClose={closeModal} />

      <Calendar />
    </div>
  );
};

export default WaterTracker;
