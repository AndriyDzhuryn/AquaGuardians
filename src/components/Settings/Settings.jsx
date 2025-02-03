import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import { validationSchema } from './validation/validation.js';
import style from '../Settings/Settings.module.css';
import { selectUser } from '../../redux/auth/selectors.js';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import InputFromPassword from '../InputFromPassword/InputFromPassword.jsx';

const SettingModal = ({ isOpen, onClose }) => {
  const userData = useSelector(selectUser);
  const [photo, setPhoto] = useState(userData?.photo || null);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    name: userData?.name || '',
    email: userData?.email || '',
    gender: userData?.gender || 'female',
    outdatedPassword: '',
    newPassword: '',
    repeatPassword: '',
  };

  useEffect(() => {
    if (userData?.photo) {
      setPhoto(userData.photo);
    }
  }, [userData]);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(URL.createObjectURL(file));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      gender: values.gender,
      outdatedPassword: values.outdatedPassword,
      newPassword: values.newPassword,
      photo: photo,
    };
    console.log(payload);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={style.modal} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.title}>
          <h2 className={style.settings}>Setting</h2>
          <button className={style.close} onClick={onClose}>
            <svg className={style.icon} width="24" height="24">
              <use href="../../../public/icons/icons-sprite.svg#close-icon"></use>
            </svg>
          </button>
        </div>

        <Formik

          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
          initialValues={initialValues}
        >
          {({ setFieldValue, values }) => (
            <Form
            className={style.form}> 
              <h3 className={style.titlePhoto}>Your photo</h3>
              <div className={style.inputContainerPhoto}>

               <UserAvatar className={style.userAvatar} />


                <label htmlFor="photo" className={style.titlePhoto}>
                  <svg className={style.iconupload} width="16" height="16">
                    <use href="../../../public/icons/icons-sprite.svg#arrow-up-tray"></use>
                  </svg>
                  Upload a photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className={style.inputPhoto}
                />
              </div>

<div className={style.gender}>
  <label className={style.genderLabel}>Your gender identity</label>
  <div className={style.radioGroup}>
    <div>
      <Field
        type="radio"
        id="female"
        name="gender"
        value="female"
        checked={values.gender === 'female'}
        onChange={() => setFieldValue('gender', 'female')}
      />
      <label htmlFor="female">Woman</label>
    </div>
    <div>
      <Field
        type="radio"
        id="male"
        name="gender"
        value="male"
        checked={values.gender === 'male'}
        onChange={() => setFieldValue('gender', 'male')}
      />
      <label htmlFor="male">Man</label>
    </div>
  </div>
  <ErrorMessage name="gender" component="div" className={style.error} />
</div>


              <div className={style.inputContainer}>
                <label htmlFor="name">Your name</label>
                <Field type="text" id="name" name="name" placeholder="Enter your name" className={style.input} />
                <ErrorMessage name="name" component="div" className={style.error} />
              </div>

              <div className={style.inputContainer}>
                <label htmlFor="email">E-mail</label>
                <Field type="email" id="email" name="email" placeholder="Enter your email" className={style.input} />
                <ErrorMessage name="email" component="div" className={style.error} />
              </div>



              {/* <InputFromPassword/> */}
              <div className={style.passwordBlock}>
<h3 className={style.passwordtitle}>Password</h3>

  <label htmlFor="outdatedPassword" className={style.label}>Current Password</label>
  <InputFromPassword 
    id="outdatedPassword"
    name="outdatedPassword" 
    showPassword={showPassword} 
    togglePasswordVisibility={togglePasswordVisibility} 
  />
  <ErrorMessage className={style.error} name="outdatedPassword" component="span" />

  <label htmlFor="newPassword" className={style.label}>New Password</label>
  <InputFromPassword 
    id="newPassword"
    name="newPassword" 
    showPassword={showPassword} 
    togglePasswordVisibility={togglePasswordVisibility} 
  />
  <ErrorMessage className={style.error} name="newPassword" component="span" />

  <label htmlFor="repeatPassword" className={style.label}>Repeat Password</label>
  <InputFromPassword 
    id="repeatPassword"
    name="repeatPassword" 
    showPassword={showPassword} 
    togglePasswordVisibility={togglePasswordVisibility} 
  />
  <ErrorMessage className={style.error} name="repeatPassword" component="span" />
</div>
              <button type="submit" className={style.submitButton}>Save</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SettingModal;
