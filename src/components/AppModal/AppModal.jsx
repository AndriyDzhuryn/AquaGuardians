import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { startOfMonth } from 'date-fns';

import { deleteWater } from '../../redux/water/operations.js';
import { apiGetTodayWater } from '../../redux/today/operations.js';
import { apiGetMonthWater } from '../../redux/month/operations.js';

import css from './AppModal.module.css';
import 'izitoast/dist/css/iziToast.min.css';

Modal.setAppElement('#root');

const AppModal = ({ isOpen, onClose, id }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const start = startOfMonth(currentDate);
  const month = start.toLocaleDateString('en-US', { month: 'numeric' });
  const year = start.toLocaleDateString('en-US', { year: 'numeric' });

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteWater(id));
    setTimeout(() => {
      dispatch(apiGetTodayWater());
      dispatch(apiGetMonthWater({ month, year }));
    }, 250);
    onClose();
  };
  return (
    <Modal
      overlayClassName={css.modalOverlay}
      className={css.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
    >
      <div className={css.wrapper}>
        <div className={css.text}>
          <h3>Delete entry</h3>
          <p>Are you sure you want to delete the entry?</p>
        </div>
        <button type="button" onClick={onClose}>
          <svg width="24" height="24">
            <use href="/icons/icons-sprite.svg#close-icon"></use>
          </svg>
        </button>
      </div>
      <div className={css.control}>
        <button className={css.btnCancel} type="button" onClick={onClose}>
          Cancel
        </button>
        <button className={css.btnDelete} type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default AppModal;
