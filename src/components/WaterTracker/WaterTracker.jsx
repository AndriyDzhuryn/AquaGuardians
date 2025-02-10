import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import WaterItems from '../WaterItems/WaterItems.jsx';
import Calendar from '../Calendar/Calendar.jsx';
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';

import { getWater } from '../../redux/water/operations.js';
// import { selectWater } from '../../redux/water/selectors.js';

import css from './WaterTracker.module.css';
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';

const WaterTracker = () => {
  const dispatch = useDispatch();

  // const waterList = useSelector(selectWater);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getWater());
  }, [dispatch]);

  const waterList = [
    { id: 1, amount: 250, time: '07:00 AM' },
    { id: 2, amount: 220, time: '11:00 AM' },
    { id: 3, amount: 200, time: '14:00 PM' },
    { id: 4, amount: 250, time: '07:00 AM' },
    { id: 5, amount: 220, time: '11:00 AM' },
    { id: 6, amount: 200, time: '14:00 PM' },
    { id: 7, amount: 250, time: '07:00 AM' },
    { id: 8, amount: 220, time: '11:00 AM' },
    { id: 9, amount: 200, time: '14:00 PM' },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
              <li key={item.id} className={css.waterConsumedItem}>
                <WaterItems
                  amount={item.amount}
                  time={item.time}
                  id={item.id}
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
