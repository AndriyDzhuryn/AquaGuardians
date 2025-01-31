import { Link } from 'react-router-dom';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <section className={css.section}>
      <nav className={css.nav}>
        <Link className={css.navLink} to="/">
          Home
        </Link>
      </nav>
      <picture>
        <source
          media="(max-width: 1440px)"
          srcSet="/pagenotfound/not-found-page-bg.jpg 1x, /pagenotfound/not-found-page-bg@2x.jpg 2x"
          type="image/jpg"
        />
        <img src="/pagenotfound/not-found-page-bg.jpg" alt="Page not found" />
      </picture>
    </section>
  );
};

export default NotFoundPage;
