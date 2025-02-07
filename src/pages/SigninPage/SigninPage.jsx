import AuthForm from '../../components/AuthForm/AuthForm';

import css from './SigninPage.module.css';

const SignInPage = () => {
  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <AuthForm />
      </div>
    </section>
  );
};

export default SignInPage;
