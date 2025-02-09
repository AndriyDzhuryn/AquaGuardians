import { useState, useEffect, useRef } from 'react';
import css from './UserLogoModal.module.css';
import SettingModal from '../SettingModal/SettingModal';
import UserLogoutModal from '../UserLogoutModal/UserLogoutModal';

const UserLogoModal = ({ onClose }) => {
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

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
        <div className={css.itemWrapper}>
          <svg className={css.setIcon}>
            <use href="/icons/icons-sprite.svg#cog-tooth"></use>
          </svg>
          <li onClick={handleSettingClick} className={css.dropdownItem}>
            Setting
          </li>
        </div>
        <div className={css.itemWrapper}>
          <svg className={css.outIcon}>
            <use href="/icons/icons-sprite.svg#arrow-right-on-rectangle"></use>
          </svg>
          <li onClick={handleLogoutClick} className={css.dropdownItem}>
            Logout
          </li>
        </div>
        {/* <li onClick={onClose} className={css.dropdownItem}>
          Close
        </li> */}
      </ul>
      {/* {showSettingModal && (
        <SettingModal onClose={() => setShowSettingModal(false)} />
      )}
      {showLogoutModal && (
        <UserLogoutModal onClose={() => setShowLogoutModal(false)} />
      )} */}
      {showSettingModal && <SettingModal onClose={closeSettingModal} />}
      {showLogoutModal && <UserLogoutModal onClose={closeLogoutModal} />}
    </div>
  );
};

export default UserLogoModal;

// import { useState } from "react";
// import css from "./UserLogoModal.module.css";
// import SettingModal from "../SettingModal/SettingModal.jsx";
// import UserLogoutModal from "../UserLogoutModal/UserLogoutModal.jsx";

// const UserLogoModal = ({ onClose }) => {
//   const [showSettingModal, setShowSettingModal] = useState(false);
//   const [showLogoutModal, setShowLogoutModal] = useState(false);

//   const handleSettingClick = () => {
//     setShowSettingModal(true);
//   };

//   const handleLogoutClick = () => {
//     setShowLogoutModal(true);
//   };

//   const closeSettingModal = () => {
//     setShowSettingModal(false);
//   };

//   const closeLogoutModal = () => {
//     setShowLogoutModal(false);
//   };

//   return (
//     <div className={css.userLogoModal}>
//       <div className={css.modalContent}>
//         <button onClick={handleSettingClick} className={css.modalBtn}>
//           Setting
//         </button>
//         <button onClick={handleLogoutClick} className={css.modalBtn}>
//           Logout
//         </button>
//         <button onClick={onClose} className={css.modalCloseBtn}>
//           Close
//         </button>
//       </div>

//       {showSettingModal && <SettingModal onClose={closeSettingModal} />}
//       {showLogoutModal && <UserLogoutModal onClose={closeLogoutModal} />}
//     </div>
//   );
// };

// export default UserLogoModal;
