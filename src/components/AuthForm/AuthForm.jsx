import { useId, useState } from 'react';

import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import css from './AuthForm.module.css';

const AuthForm = ({ type }) => {
  const isSignUp = type === 'signup';

  const initialValues = isSignUp
    ? { email: '', password: '', repeatePassword: '' }
    : { email: '', password: '' };

  const emailId = useId();
  const passwordId = useId();
  const repeatePasswordId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleRepeatPasswordVisibility = () =>
    setShowRepeatPassword(prev => !prev);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(7, 'Password length must be at least 7 characters')
      .required('Password is required'),
    repeatePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat password is required'),
  });

  const handleSubmit = (values, actions) => {
    // dispatch(apiLoginUser(values));
    actions.resetForm();
  };

  return (
    <>
      <p className={css.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
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

          {isSignUp && (
            <>
              <label className={css.label} htmlFor={repeatePasswordId}>
                Repeat password
              </label>
              <div className={css.inner}>
                <Field
                  className={css.input}
                  type={showRepeatPassword ? 'text' : 'password'}
                  name="repeatePassword"
                  id={repeatePasswordId}
                  placeholder="Repeat password"
                />
                <button
                  type="button"
                  className={css.eyeButton}
                  onClick={toggleRepeatPasswordVisibility}
                >
                  <svg className={css.icon} width="14" height="12">
                    <use
                      href={`../../../public/icons/icons-sprite.svg#${
                        showRepeatPassword ? 'eye' : 'eye-slash'
                      }`}
                    ></use>
                  </svg>
                </button>
              </div>
              <ErrorMessage
                className={css.error}
                name="repeatePassword"
                component="span"
              />
            </>
          )}

          <button className={css.btn} type="submit">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </Form>
      </Formik>
      {isSignUp ? (
        <Link className={css.link} to="/signin">
          Sign in
        </Link>
      ) : (
        <Link className={css.link} to="/signup">
          Sign up
        </Link>
      )}
    </>
  );
};

export default AuthForm;
