import React, { useState } from 'react';
import Modal from 'react-modal';
import css from './LogoutModal.module.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { apiLogOutUser } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';

Modal.setAppElement('#root');

const LogoutModal = ({ entryId, setEntries }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(apiLogOutUser());
    closeModal();
  };
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        overlayClassName={css.modalOverlay}
        className={css.modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div className={css.wrapper}>
          <div className={css.text}>
            <h3>Log out</h3>
            <p>Do you really want to leave?</p>
          </div>
          <button type="button" onClick={closeModal}>
            <svg width="24" height="24">
              <use href="../../../public/icons/icons-sprite.svg#close-icon"></use>
            </svg>
          </button>
        </div>
        <div className={css.control}>
          <button className={css.btnCancel} type="button" onClick={closeModal}>
            Cancel
          </button>
          <button
            className={css.btnDelete}
            type="button"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LogoutModal;
