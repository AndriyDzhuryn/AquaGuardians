import { Link } from 'react-router-dom';

import css from './NotFoundPage.module.css';

const NotFound = () => {
  return (
    <div>
      <p className={css.errorAddress}>Invalid page address</p>
      <div className={css.notFound}>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
