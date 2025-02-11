import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import { deleteWater } from '../../redux/water/operations.js';
import { apiGetTodayWater } from '../../redux/today/operations.js';

import css from './AppModal.module.css';
import 'izitoast/dist/css/iziToast.min.css';

Modal.setAppElement('#root');

const AppModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteWater(id));
    dispatch(apiGetTodayWater());
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
