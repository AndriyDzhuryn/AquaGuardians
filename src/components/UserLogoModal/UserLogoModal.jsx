import { useState, useRef } from 'react';
import css from './UserLogoModal.module.css';
import SettingModal from '../Settings/SettingModal';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';

const UserLogoModal = () => {
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dropdownRef = useRef(null);

  const handleSettingClick = () => {
    setShowSettingModal(true);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const closeSettingModal = () => {
    setShowSettingModal(false);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className={css.userLogoModal} ref={dropdownRef}>
      <ul className={css.dropdownList}>
        <li onClick={handleSettingClick} className={css.dropdownItem}>
          <div className={css.itemWrapper}>
            <svg className={css.setIcon}>
              <use href="/icons/icons-sprite.svg#cog-tooth"></use>
            </svg>
            <span>Setting</span>
          </div>
        </li>
        <li onClick={handleLogoutClick} className={css.dropdownItem}>
          <div className={css.itemWrapper}>
            <svg className={css.outIcon}>
              <use href="/icons/icons-sprite.svg#arrow-right-on-rectangle"></use>
            </svg>
            <span>Logout</span>
          </div>
        </li>
      </ul>

      {showSettingModal && <SettingModal onClose={closeSettingModal} />}
      {showLogoutModal && <UserLogoutModal onClose={closeLogoutModal} />}
    </div>
  );
};

export default UserLogoModal;
