import { useState } from 'react';
import { useDispatch } from 'react-redux';
import iziToast from 'izitoast';

import AppModal from '../AppModal/AppModal.jsx';

import css from './WaterItems.module.css';

const WaterItems = ({ amount, time, id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={css.wrapperWaterConsumedItem}>
      <div className={css.glassWaterWrapper}>
        <svg className={css.glassOfWater}>
          <use href="../../../public/icons/icons-sprite.svg#glass-of-water"></use>
        </svg>
        <div>
          <span className={css.amountWater}>{amount} мл</span>
          <span className={css.time}>{time}</span>
        </div>
      </div>

      <div>
        <button className={css.btnWater}>
          <svg className={css.editWaterItem}>
            <use href="../../../public/icons/icons-sprite.svg#pensil-aquare"></use>
          </svg>
        </button>
        <button
          className={css.btnWater}
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <svg className={css.trash}>
            <use href="../../../public/icons/icons-sprite.svg#trash"></use>
          </svg>
        </button>
        {modalIsOpen && <AppModal onClose={closeModal} id={id} />}
      </div>
    </div>
  );
};

export default WaterItems;
