import React, { useState } from 'react';
import Modal from 'react-modal';
import css from './Delete-entry.module.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

Modal.setAppElement('#root');

const DeleteEntry = ({ entryId, setEntries }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://your-api.com/api/water-intake/${entryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntries(prevEntries =>
        prevEntries.filter(entry => entry._id !== entryId)
      ); //setEntries - стан у компоненті listWater
      setIsOpen(false);
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Failed to delete entry' });
    }
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
            <h3>Delete entry</h3>
            <p>Are you sure you want to delete the entry?</p>
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
          <button className={css.btnDelete} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteEntry;
