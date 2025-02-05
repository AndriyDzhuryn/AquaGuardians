import { useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { validationSchema } from './validation/validation.js';
import style from '../Settings/Settings.module.css';
import { selectUser } from '../../redux/auth/selectors.js';
import InputFromPassword from './InputFromPassword/InputFromPassword.jsx';
import CloseButton from './CloseButton/ClosseButton.jsx';
import UploadPhoto from './UploadPhoto/UploadPhoto.jsx';
import { updateUserProfile } from '../../redux/auth/operations.js';

const SettingModal = ({ onClose }) => {
  const userData = useSelector(selectUser);
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();
  const [visiblePasswords, setVisiblePasswords] = useState({});

  const initialValues = {
    name: userData?.name || '',
    email: userData?.email || '',
    gender: userData?.gender || 'woman',
    photo: userData?.photo || '',
    outdatedPassword: '',
    newPassword: '',
    repeatPassword: '',
  };

  useEffect(() => setPhoto(userData?.photo || null), [userData]);

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

  const onSubmit = values => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('gender', values.gender);
    formData.append('outdatedPassword', values.outdatedPassword);
    formData.append('newPassword', values.newPassword);
    if (photo) {
      formData.append('photo', photo);
    }

    dispatch(updateUserProfile(formData));
  };

  return (
    <div className={style.modal} onClick={onClose}>
      <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        <div className={style.title}>
          <h2 className={style.settings}>Setting</h2>
          <CloseButton onClose={onClose} />
        </div>

        <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
          initialValues={initialValues}
        >
          {({ values }) => (
            <Form className={style.form}>
                <h3 className={style.titlePhoto}>Your photo</h3>
              <div className={style.upload}>
                <UploadPhoto photo={photo} setPhoto={setPhoto} />
              </div>

              <div className={style.info}>
                <label className={style.gender}>
                  Your gender identity
                </label>
                <div className={style.radioGroup}>
                  <div className={style.radio}>
                    <Field
                    type="radio"
                    id="women"
                    name="gender"
                    value="woman"
                    checked={values.gender === "woman"}
                  /> Woman</div>
                  <div className={style.radio}>
                    <Field
                    type="radio"
                    id="men"
                    name="gender"
                    value="man"
                    checked={values.gender === "man"}
                  /> Man</div>
                  
                </div>
                <div className={style.inputContainer}>
                  <div className={style.inputBlock}>
                  <label htmlFor="name">Your name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className={style.input}
                    autoComplete="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={style.error}
                  />
                  </div>
                  
                  <div className={style.inputBlock}>
                    <label htmlFor="email">E-mail</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className={style.input}
                    autoComplete="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={style.error}
                  />
 </div>
                  
                </div>
              </div>

              <div className={style.password}>
                <h3 className={style.passwordtitle}>Password</h3>
                {['outdatedPassword', 'newPassword', 'repeatPassword'].map(
                  field => (
                    <div  key={field} className={style.inputpass}>
                      <label htmlFor={field} className={style.label}>
                        {field === 'outdatedPassword'
                          ? 'Current Password'
                          : field === 'newPassword'
                          ? 'New Password'
                          : 'Repeat Password'}
                      </label>
                      <InputFromPassword
                        id={field}
                        name={field}
                        showPassword={visiblePasswords[field]}
                        togglePasswordVisibility={() =>
                          togglePasswordVisibility(field)
                        }
                        autoComplete={field}
                      />
                      <ErrorMessage
                        name={field}
                        component="span"
                        className={style.error}
                      />
                    </div>
                  )
                )}
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
