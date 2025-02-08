import Logo from '../Logo/Logo.jsx';
import UserAuth from '../UserAuth/UserAuth.jsx';
import UserLogo from '../UserLogo/UserLogo.jsx';
import css from './Header.module.css';

const user = {
  name: 'David',
  email: 'david@gmail.com',
  avatar: '../../../public/logo.svg',
};

const Header = () => {
  //замінити
  const isLoggedIn = true;
  // const isLoggedIn = false;

  return (
    <header className={css.appHeader}>
      <Logo />
      {isLoggedIn ? <UserLogo user={user} /> : <UserAuth />}
    </header>
  );
};

export default Header;
