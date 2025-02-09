import { useNavigate } from 'react-router-dom';
import css from './UserAuth.module.css';

const UserAuth = () => {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate('/signin');
  };

  return (
    <button onClick={handleSignin} className={css.userAuthBtn}>
      <span className={css.userSpan}>Sign in</span>
      <svg className={css.userIcon}>
        <use href="/icons/icons-sprite.svg#user"></use>
      </svg>
    </button>
  );
};

export default UserAuth;
