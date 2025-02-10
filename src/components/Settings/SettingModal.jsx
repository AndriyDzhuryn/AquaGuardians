import { useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { validationSchema } from './validation/validation.js';
import style from '../Settings/Settings.module.css';
import { selectAuthUserData } from '../../redux/auth/selectors.js';
import InputFromPassword from './InputFromPassword/InputFromPassword.jsx';
import CloseButton from './CloseButton/ClosseButton.jsx';
import UploadPhoto from './UploadPhoto/UploadPhoto.jsx';
import { apiGetCurrentUser, apiUpdateUserProfile } from '../../redux/auth/operations.js';
import iziToast from 'izitoast';

const SettingModal = ({ onClose }) => {
  const userData = useSelector(selectAuthUserData);
  const dispatch = useDispatch();
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); 
  const initialValues = {
    name: userData?.name || '',
    email: userData?.email || '',
    gender: userData?.gender || 'woman',
    oldPassword: '',
    password: '',
    repeatPassword: '',
  };

  const togglePasswordVisibility = field => {
    setVisiblePasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleEscape = useCallback(
    event => {
      if (event.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  const onSubmit = async (values) => {
    const { repeatPassword, ...formValues } = values;

    try {
      const response = await dispatch(apiUpdateUserProfile(formValues)); 
      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        setErrorMessage(null); 
        iziToast.success({ message: 'Profile updated successfully' })
         dispatch(apiGetCurrentUser());
      }
    } catch (error) {
      iziToast.error({ message: `Logout failed: ${error}` });
    }

  };

  return (
    <div className={style.modal} onClick={onClose}>
      <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <div className={style.title}>
          <h2 className={style.settings}>Setting</h2>
          <CloseButton onClose={onClose} />
        </div>
        <h3 className={style.titlePhoto}>Your photo</h3>
        <div className={style.upload}>
          <UploadPhoto />
        </div>

        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
          initialValues={initialValues}
        >
          {({ values, errors, touched }) => (
            <Form className={style.form}>
              <div className={style.container}>
                <div className={style.info}>
                  <label className={style.gender}>Your gender identity</label>
                  <div className={style.radioGroup}>
                    <div className={style.radio}>
                      <Field
                        type="radio"
                        id="women"
                        name="gender"
                        value="woman"
                        checked={values.gender === 'woman'}
                      />
                      <span className={style.identification}>Woman</span>
                    </div>
                    <div className={style.radio}>
                      <Field
                        type="radio"
                        id="men"
                        name="gender"
                        value="man"
                        checked={values.gender === 'man'}
                      />
                      <span className={style.identification}>Man</span>
                    </div>
                  </div>
                  <div className={style.inputContainer}>
                    <div className={style.inputBlock}>
                      <label htmlFor="name" className={style.label}>Your name</label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        className={errors.name && touched.name ? `${style.inputerror}` : `${style.input}`}
                        autoComplete="name"
                      />
                      {errors.name && touched.name && <ErrorMessage name="name" component="span" className={style.error} />}
                    </div>

                    <div className={style.inputBlock}>
                      <label htmlFor="email" className={style.label}>E-mail</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className={errors.email && touched.email ? `${style.inputerror}` : `${style.input}`}
                        autoComplete="email"
                      />
                      {errors.email && touched.email && <ErrorMessage name="email" component="span" className={style.error} />}
                    </div>
                  </div>
                </div>

                <div className={style.password}>
                  <h3 className={style.passwordtitle}>Password</h3>
                  {['oldPassword', 'password', 'repeatPassword'].map(field => (
                    <div key={field} className={style.inputpass}>
                      <label htmlFor={field} className={style.label}>
                        {field === 'oldPassword' ? 'Current Password' : field === 'password' ? 'New Password' : 'Repeat Password'}
                      </label>
                      <InputFromPassword
                        id={field}
                        name={field}
                        error={errors[field]}
                        touched={touched[field]}
                        showPassword={visiblePasswords[field]}
                        togglePasswordVisibility={() => togglePasswordVisibility(field)}
                        autoComplete={field}
                        value={values[field] || ''}
                      />
                      <ErrorMessage name={field} component="span" className={style.error} />
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className={style.submitButton}>
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SettingModal;
