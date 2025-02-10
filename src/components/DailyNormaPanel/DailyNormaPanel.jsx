import { useState } from 'react';
import { useSelector } from 'react-redux';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal.jsx';

import { selectAuthUserData } from '../../redux/auth/selectors.js';

import css from './DailyNormaPanel.module.css';

const DailyNormaPanel = () => {
  const waterRate = useSelector(selectAuthUserData);
  const updateWaterRate = useSelector(state => state.waterRate?.waterRate);

  const normaValue = updateWaterRate
    ? updateWaterRate?.waterRate
    : waterRate.waterRate;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>My daily norma</h2>
      <div className={css.wrapper}>
        <h2 className={css.number}>{normaValue / 1000} L</h2>
        <button type="button" className={css.btnEdit} onClick={openModal}>
          Edit
        </button>
      </div>
      {isModalOpen && <DailyNormaModal closeModal={closeModal} />}
    </div>
  );
};

export default DailyNormaPanel;
