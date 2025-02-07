import css from './WaterRatioPanel.module.css';
import { useState } from 'react';
import AddWaterModal from '../AddWaterModal/AddWaterModal';

export default function WaterRatioPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <p className={css.title}>Today</p>
        <div className={css.rangeSlider}>
          <p>Range Slider will be added soon</p>
        </div>
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
