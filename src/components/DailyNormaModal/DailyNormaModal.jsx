import css from './DailyNormaModal.module.css';
import DailyNormaForm from '../DailyNormaForm/DailyNormaForm';
import { useEffect } from 'react';

const DailyNormaModal = ({ closeModal }) => {
  useEffect(() => {
    const closeByEscape = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEscape);
    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [closeModal]);
  const closeByBackdrop = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className={css.modalOverley} onClick={closeByBackdrop}>
      <div className={css.modal}>
        <button
          className={css.modalCloseBtn}
          type="button"
          onClick={closeModal}
        >
          <svg className={css.svg}>
            <use
              href="../../public/icons/icons-sprite.svg#close-icon"
              width="24px"
              height="24px"
            ></use>
          </svg>
        </button>
        <h2 className={css.modalTitle}>My daily norma</h2>
        <div className={css.formulasContainer}>
          <p>
            For girl: <span className={css.formula}>V=(M*0,03) + (T*0,4)</span>
          </p>
          <p>
            For man: <span className={css.formula}>V=(M*0,04) + (T*0,6)</span>
          </p>
        </div>
        <div className={css.infoContainer}>
          <p className={css.info}>
            <span className={css.star}>*</span> V is the volume of the water
            norm in liters per day, M is your body weight, T is the time of
            active sports, or another type of activity commensurate in terms of
            loads (in the absence of these, you must set 0)
          </p>
        </div>
        <DailyNormaForm />
      </div>
    </div>
  );
};

export default DailyNormaModal;
