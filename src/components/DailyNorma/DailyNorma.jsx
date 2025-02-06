import css from './DailyNorma.module.css';
import { useState } from 'react';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';

const DailyNorma = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={css.dailyNormaWrapper}>
      <h2 className={css.title}>My daily norma</h2>
      <div className={css.btnEditWrapper}>
        <p className={css.dailyNorma}>1.5 L</p>
        <button type="button" className={css.btnEdit} onClick={openModal}>
          Edit
        </button>
      </div>
      {isModalOpen && <DailyNormaModal closeModal={closeModal} />}
    </div>
  );
};

export default DailyNorma;
