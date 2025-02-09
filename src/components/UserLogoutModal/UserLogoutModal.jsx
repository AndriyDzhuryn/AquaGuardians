import Modal from 'react-modal';
import css from '../UserLogoutModal/UserLogoutModal.module.css';
import { apiLogOutUser } from '../../redux/auth/operations.js';
import { useDispatch } from 'react-redux';
import iziToast from 'izitoast';

Modal.setAppElement('#root');
const UserLogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  console.log(3);
  const handleLogOut = async e => {
    e.preventDefault();
    e.stopPropagation();
    console.log(1);
    try {
      dispatch(apiLogOutUser());
      iziToast.success({ message: 'Logged out successfully' });
    } catch (error) {
      iziToast.error({ message: `Logout failed: ${error}` });
    }
  };

  return (
    <Modal
      overlayClassName={css.modalOverlay}
      className={css.modal}
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Example Modal"
    >
      <div className={css.wrapper}>
        <div className={css.text}>
          <h3>Log out</h3>
          <p>Do you really want to leave?</p>
        </div>
        <button type="button" onClick={onClose}>
          <svg width="24" height="24">
            <use href="../../../public/icons/icons-sprite.svg#close-icon"></use>
          </svg>
        </button>
      </div>
      <div className={css.control}>
        <button className={css.btnCancel} type="button" onClick={onClose}>
          Cancel
        </button>
        <button className={css.btnDelete} type="button" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </Modal>
  );
};

export default UserLogoutModal;
