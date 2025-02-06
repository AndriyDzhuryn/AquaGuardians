import Modal from 'react-modal';
import css from './AppModal.module.css';

Modal.setAppElement('#root');

const AppModal = ({
  setIsOpen,
  modalIsOpen,
  handleAccept,
  title,
  description,
  acceptButton,
}) => {
  const closeModal = () => setIsOpen(false);

  return (
    <Modal
      overlayClassName={css.modalOverlay}
      className={css.modal}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <div className={css.wrapper}>
        <div className={css.text}>
          <h3>{title}</h3>
          <p>{description}</p>
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
        <button className={css.btnDelete} type="button" onClick={handleAccept}>
          {acceptButton}
        </button>
      </div>
    </Modal>
  );
};

export default AppModal;
