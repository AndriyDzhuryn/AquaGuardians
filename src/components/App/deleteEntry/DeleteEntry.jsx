import React from 'react';
import Modal from 'react-modal';
import css from './deleteEntry.module.css';

Modal.setAppElement('#root');

const DeleteEntry = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
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
          <button>&times;</button>
        </div>
        <div className={css.control}>
          <button className={css.btnCancel}>Cancel</button>
          <button className={css.btnDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteEntry;
