import style from '../Settings.module.css';

const CloseButton = ({ onClose }) => (
  <button className={style.close} onClick={onClose}>
    <svg className={style.icon} width="24" height="24">
      <use href="/public/icons/icons-sprite.svg#close-icon" />
    </svg>
  </button>
);

export default CloseButton;
