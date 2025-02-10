import css from './WaterRatioPanel.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddWaterModal from '../AddWaterModal/AddWaterModal';
import { apiGetTodayWater } from '../../redux/today/operations';
import { selectTodayUserData } from '../../redux/today/selectors';
import { selectAuthUserData } from '../../redux/auth/selectors';

export default function WaterRatioPanel() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetTodayWater());
  }, [dispatch]);

  const waterRate = useSelector(selectAuthUserData);
  const updateWaterRate = useSelector(state => state.waterRate?.waterRate);

  const normaValue = updateWaterRate
    ? updateWaterRate?.waterRate
    : waterRate?.waterRate;

  const todayWater = useSelector(selectTodayUserData);
  const percent = todayWater?.percentage;
  const consumptionNumbers = todayWater?.records;

  const consumptionValue = todayWater?.records
    ? consumptionNumbers.reduce((acc, num) => acc + num.volume, 0)
    : percent;

  const percentToday = (consumptionValue / normaValue) * 100;

  const percentValue = percentToday.toFixed([2]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const Slider = ({ value = percentValue }) => {
    return (
      <div className={css.rangeSliderContainer}>
        <div className={css.sliderWrapper}>
          <div className={css.sliderTrack}>
            <div
              className={css.sliderFill}
              style={{ width: `${value}%` }}
            ></div>
            <div
              className={css.valueIndicator}
              style={{ left: `${value}%` }}
            ></div>
            <p className={css.value} style={{ left: `${value}%` }}>
              {value}%
            </p>
          </div>
        </div>
        <div className={css.marksWrapper} style={{ left: '0%' }}>
          <div className={css.markNumber}>
            <div className={css.mark}></div>
            <p className={css.number}>0%</p>
          </div>
          <div className={css.markNumber} style={{ left: '50%' }}>
            <div className={css.mark}></div>
            <p className={css.number}>50%</p>
          </div>
          <div className={css.markNumber} style={{ left: '100%' }}>
            <div className={css.mark}></div>
            <p className={css.number}>100%</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <p className={css.title}>Today</p>
        <Slider />
      </div>
      <button className={css.btn} onClick={openModal}>
        <svg className={css.icon} width="24" height="24">
          <use href="/icons/icons-sprite.svg#plus-circle" />
        </svg>
        Add Water
      </button>
      <AddWaterModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
