import css from '../UserLogoutModal/UserLogoutModal.module.css';
import { apiLogOutUser } from '../../redux/auth/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import iziToast from 'izitoast';
import { selectAuthIsLoading } from '../../redux/auth/selectors.js';
import { useEffect } from 'react';

const UserLogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();

  const logoutLoading = useSelector(selectAuthIsLoading);

  const handleLogOut = async e => {
    e.preventDefault();
    e.stopPropagation();
    try {
      dispatch(apiLogOutUser());
      iziToast.success({ message: 'Logged out successfully' });
    } catch (error) {
      iziToast.error({ message: `Logout failed: ${error}` });
    }
  };

  useEffect(() => {
    if (logoutLoading) {
      onClose();
    }
  }, [logoutLoading, onClose]);

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <div className={css.wrapper}>
          <div className={css.text}>
            <div className={css.wrapperBtnClose}>
              <h3>Log out</h3>
              <button
                className={css.closeButton}
                type="button"
                onClick={onClose}
              >
                <svg width="24" height="24">
                  <use href="/icons/icons-sprite.svg#close-icon"></use>
                </svg>
              </button>
            </div>
            <p>Do you really want to leave?</p>
          </div>
        </div>

        <div className={css.control}>
          <button className={css.btnCancel} type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            className={css.btnDelete}
            type="button"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>{' '}
    </div>
  );
};

export default UserLogoutModal;
