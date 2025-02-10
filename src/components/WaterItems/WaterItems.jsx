import { useState } from 'react';

import AppModal from '../AppModal/AppModal.jsx';
import AddWaterModal from '../AddWaterModal/AddWaterModal.jsx';

import css from './WaterItems.module.css';
import 'izitoast/dist/css/iziToast.min.css';

const WaterItems = ({ amount, time, id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  return (
    <div className={css.wrapperWaterConsumedItem}>
      <div className={css.glassWaterWrapper}>
        <svg className={css.glassOfWater}>
          <use href="/icons/icons-sprite.svg#glass-of-water"></use>
        </svg>
        <div>
          <span className={css.amountWater}>{amount} мл</span>
          <span className={css.time}>{time}</span>
        </div>
      </div>

      <div>
        <button
          className={css.btnWater}
          onClick={() => setEditModalIsOpen(true)}
        >
          <svg className={css.editWaterItem}>
            <use href="/icons/icons-sprite.svg#pensil-aquare"></use>
          </svg>
        </button>
        <button
          className={css.btnWater}
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <svg className={css.trash}>
            <use href="/icons/icons-sprite.svg#trash"></use>
          </svg>
        </button>

        <AppModal
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          id={id}
        />
        <AddWaterModal
          isOpen={editModalIsOpen}
          onClose={() => setEditModalIsOpen(false)}
          editData={{ id, amount, time }}
        />
      </div>
    </div>
  );
};

export default WaterItems;
