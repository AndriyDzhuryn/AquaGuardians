import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import WaterItems from '../WaterItems/WaterItems.jsx';
import Calendar from '../Calendar/Calendar.jsx';
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';

import { getWater } from '../../redux/water/operations.js';
import { selectWater } from '../../redux/water/selectors.js';

import css from './WaterTracker.module.css';

const WaterTracker = () => {
  const dispatch = useDispatch();

  const waterList = useSelector(selectWater);

  console.log(waterList);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getWater());
  }, [dispatch]);

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
                  volume={item.volume}
                  date={item.date}
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
