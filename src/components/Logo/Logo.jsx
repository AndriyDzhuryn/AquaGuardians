import { useNavigate } from 'react-router-dom';
import css from './Logo.module.css';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors';

const Logo = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/welcome');
    }
  };

  return (
    <div className={css.logo} onClick={handleLogoClick}>
      <img src="/logo/logo.png" alt="Logo" className={css.logoImage} />
    </div>
  );
};

export default Logo;
