import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthUserData } from '../../redux/auth/selectors';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import css from './UserLogo.module.css';

const UserLogo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef(null);

  const user = useSelector(selectAuthUserData);

  const toggleModal = () => {
    setModalOpen(prev => !prev);
  };

  let avatarContent;
  if (user?.photo) {
    avatarContent = (
      <img src={user.photo} alt="avatar" className={css.avatarImg} />
    );
  } else if (user?.name) {
    avatarContent = (
      <div className={css.avatarPlaceholder}>
        {user.name.charAt(0).toUpperCase()}
      </div>
    );
  } else if (user?.email) {
    avatarContent = (
      <div className={css.avatarPlaceholder}>
        {user.email.charAt(0).toUpperCase()}
      </div>
    );
  } else {
    avatarContent = <div className={css.avatarPlaceholder}>?</div>;
  }

  return (
    <div ref={containerRef} className={css.userLogo}>
      <button
        onClick={e => {
          e.stopPropagation();
          toggleModal();
        }}
        className={css.userLogoBtn}
      >
        <span className={css.userName}>{user?.name || user?.email}</span>
        {avatarContent}
        <svg className={css.arrowIcon}>
          <use href="/icons/icons-sprite.svg#chevron-double-up"></use>
        </svg>
      </button>
      {modalOpen && <UserLogoModal onClose={toggleModal} />}
    </div>
  );
};

export default UserLogo;
