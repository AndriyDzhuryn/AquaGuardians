import { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import css from './UserLogoModal.module.css';
import SettingModal from '../Settings/SettingModal.jsx';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal.jsx';

const UserLogoModal = () => {
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const dropdownRef = useRef(null);

  const handleSettingClick = () => {
    setShowSettingModal(true);
    setDropdownVisible(false);
  };

  const handleLogoutClick = () => {
    setDropdownVisible(false);
    setShowLogoutModal(true);
  };

  const closeModal = () => {
    setDropdownVisible(false);
    setShowSettingModal(false);
    setShowLogoutModal(false);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.userLogoModal} ref={dropdownRef}>
      {dropdownVisible && (
        <ul className={css.dropdownList}>
          <li className={css.dropdownItem}>
            <div className={css.itemWrapper}>
              <button
                onClick={handleSettingClick}
                type="button"
                className={css.button}
              >
                <svg className={css.setIcon}>
                  <use href="/icons/icons-sprite.svg#cog-tooth"></use>
                </svg>
                Setting
              </button>
            </div>
          </li>
          <li className={css.dropdownItem}>
            <div className={css.itemWrapper}>
              <button
                onClick={handleLogoutClick}
                type="button"
                className={css.button}
              >
                <svg className={css.outIcon}>
                  <use href="/icons/icons-sprite.svg#arrow-right-on-rectangle"></use>
                </svg>
                Logout
              </button>
            </div>
          </li>
        </ul>
      )}

      <Modal
        isOpen={showSettingModal}
        onRequestClose={closeModal}
        contentLabel="Setting Modal"
        className={css.modal}
        overlayClassName={css.overlay}
        appElement={document.getElementById('root')}
      >
        <SettingModal onClose={closeModal} />
      </Modal>

      <Modal
        isOpen={showLogoutModal}
        onRequestClose={closeModal}
        contentLabel="Logout Modal"
        className={css.modal}
        overlayClassName={css.overlay}
        appElement={document.getElementById('root')}
      >
        <UserLogoutModal onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default UserLogoModal;
