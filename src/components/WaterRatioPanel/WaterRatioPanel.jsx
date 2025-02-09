import css from './WaterRatioPanel.module.css';
import { useState } from 'react';
import AddWaterModal from '../AddWaterModal/AddWaterModal';

export default function WaterRatioPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const Slider = ({ value = 50 }) => {
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
