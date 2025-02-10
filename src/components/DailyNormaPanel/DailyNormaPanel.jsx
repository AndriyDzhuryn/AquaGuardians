import css from './DailyNormaPanel.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';

const DailyNormaPanel = () => {
  const normaValue = useSelector(
    state => state.waterRate?.waterRate ?? state.auth.userData.waterRate
  );

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
