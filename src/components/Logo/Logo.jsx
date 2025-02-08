import { useNavigate } from 'react-router-dom';
import css from './Logo.module.css';

const Logo = () => {
  //замінити
  const isLoggedIn = true;
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/welcome');
    }
  };

  return (
    <div className={css.logo} onClick={handleLogoClick}>
      <img
        src="../../../public/logo/logo.png"
        alt="Logo"
        className={css.logoImage}
      />
    </div>
  );
};

export default Logo;
