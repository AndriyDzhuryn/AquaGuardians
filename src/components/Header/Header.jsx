import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo.jsx';
import UserAuth from '../UserAuth/UserAuth.jsx';
import UserLogo from '../UserLogo/UserLogo.jsx';
import css from './Header.module.css';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors.js';

const user = {
  name: '',
  email: 'david@gmail.com',
  avatar: '../../../public/logo.svg',
};

const Header = () => {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  return (
    <header className={css.appHeader}>
      <Logo />
      {isLoggedIn ? <UserLogo user={user} /> : <UserAuth />}
    </header>
  );
};

export default Header;
