import s from './WelcomePage.module.css';
import Welcome from '../../components/Welcome/Welcome';

const WelcomePage = () => {
  return (
    <div className={s.backgroundContainer}>
      <Welcome />
    </div>
  );
};

export default WelcomePage;
