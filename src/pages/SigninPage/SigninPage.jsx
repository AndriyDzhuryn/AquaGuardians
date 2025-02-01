import { useId, useState } from 'react';

import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './SignInPage.module.css';

const SignInPage = () => {
  const initialValues = { email: '', password: '' };
  const emailId = useId();
  const passwordId = useId();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(7, 'Password length must be at least 7 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values, actions) => {
    // dispatch(apiLoginUser(values));
    actions.resetForm();
  };

  return (
    <section className={css.section}>
      <div className={css.wrapper}>
        <p className={css.title}>Sign In</p>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SignInSchema}
        >
          <Form className={css.form}>
            <label className={css.label} htmlFor={emailId}>
              Enter your email
            </label>
            <Field
              className={css.input}
              type="email"
              name="email"
              id={emailId}
              placeholder="E-mail"
            />
            <ErrorMessage className={css.error} name="email" component="span" />

            <label className={css.label} htmlFor={passwordId}>
              Enter your password
            </label>
            <div className={css.inner}>
              <Field
                className={css.input}
                type={showPassword ? 'text' : 'password'}
                name="password"
                id={passwordId}
                placeholder="Password"
              />
              <button
                type="button"
                className={css.eyeButton}
                onClick={togglePasswordVisibility}
              >
                <svg className={css.icon} width="14" height="12">
                  <use
                    href={`../../../public/icons/icons-sprite.svg#${
                      showPassword ? 'eye' : 'eye-slash'
                    }`}
                  ></use>
                </svg>
              </button>
            </div>
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />

            <button className={css.btn} type="submit">
              Sign In
            </button>
          </Form>
        </Formik>
        <Link className={css.link} to="/signup">
          Sign Up
        </Link>
      </div>
    </section>
  );
};

export default SignInPage;
