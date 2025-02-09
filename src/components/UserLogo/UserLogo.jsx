import { useState } from 'react';
import UserLogoModal from '../UserLogoModal/UserLogoModal';
import css from './UserLogo.module.css';

//redux
// import { useSelector } from 'react-redux';
// import { selectAuthUserData } from '../../redux/auth/selectors';

const UserLogo = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const user = {
    name: 'David',
    email: 'david@gmail.com',
    avatar: '/avatar.png',
  };

  const toggleModal = () => {
    setModalOpen(prev => !prev);
  };

  let avatarContent;
  if (user.avatar) {
    avatarContent = (
      <img src={user.avatar} alt="avatar" className={css.avatarImg} />
    );
  } else if (user.name) {
    avatarContent = (
      <div className={css.avatarPlaceholder}>
        {user.name.charAt(0).toUpperCase()}
      </div>
    );
  } else {
    avatarContent = (
      <div className={css.avatarPlaceholder}>
        {user.email.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={css.userLogo}>
      <button onClick={toggleModal} className={css.userLogoBtn}>
        <span className={css.userName}>{user.name || user.email}</span>
        {avatarContent}
        <svg className={css.arrowIcon}>
          <use href="icons-sprite.svg#chevron-double-up"></use>
        </svg>
      </button>
      {modalOpen && <UserLogoModal onClose={toggleModal} />}
    </div>
  );
};

export default UserLogo;
