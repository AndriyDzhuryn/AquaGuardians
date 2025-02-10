import { useState, useEffect, useRef } from 'react';
import css from './UserLogoModal.module.css';
import SettingModal from '../SettingModal/SettingModal';

import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';


const UserLogoModal = ({ onClose, containerRef }) => {
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, containerRef]);

  const handleSettingClick = () => {
    setShowSettingModal(true);
    onClose();
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    onClose();
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
