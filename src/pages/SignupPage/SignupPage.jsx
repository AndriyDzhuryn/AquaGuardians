import AuthForm from '../../components/AuthForm/AuthForm';

import css from './SignUpPage.module.css';

const SignUpPage = () => {
  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <AuthForm type={'signup'} />
      </div>
    </section>
  );
};

export default SignUpPage;
