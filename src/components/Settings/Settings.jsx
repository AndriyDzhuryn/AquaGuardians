import  { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { validationSchema } from './validation/validation.js';
import style from '../Settings/Settings.module.css';
import { selectUser } from '../../redux/auth/selectors.js';




const SettingModal = ({ isOpen, onClose }) => {
    const userData = useSelector(selectUser);
    const [photo, setPhoto] = useState(userData?.photo || null);
    const [showPassword, setShowPassword] = useState(false);


    const dispatch = useDispatch();


    const initialValues = {
        name: userData?.name || '',
        email: userData?.email || '',
        gender: userData?.gender || "female", 
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
        console.log(values);
        const payload = {
            name: values.name,
            email: values.email,
            gender: values.gender,
            outdatedPassword: values.outdatedPassword,
            newPassword: values.newPassword,
            photo: photo,
        };   
        // dispatch(updateUser(payload)); //// Диспатчимо екшен для збереження даних
        console.log(payload);
    }


  // Закриття модалки за допомогою Escape
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
    // Бекдроп модалки – кліком поза контентом викликаємо onClose
    <div className={style.modal} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={style.settings}>Settings</h2>
        <button className={style.close} onClick={onClose}>
          &times;
        </button>

    <Formik
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
    
          initialValues={initialValues}
        >
                  {({ setFieldValue, values, }) => (
                      
            <Form>
              {/* Поле для фото */}
              <div className={style.inputContainer}>
                <label htmlFor="photo">Your photo</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                {photo && (
                  <img src={photo} alt="User" className={style.photoPreview} />
                )}
              </div>

            {/* Поле для гендеру */}
<div className={style.inputContainer}>
  <label>Your gender identity</label>
  <div>
    <Field
      type="radio"
      id="female"
      name="gender"
      value="female"
      checked={values.gender === 'female'}
                                      onChange={() => { setFieldValue('gender', 'female');}
      }
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
                                      onChange={() => { setFieldValue('gender', 'male');}}
    />
    <label htmlFor="male">Man</label>
  </div>
  <ErrorMessage name="gender" component="div" className={style.error} />
</div>
              {/* Поле для імені */}
              <div className={style.inputContainer}>
                <label htmlFor="name">Your name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  onChange={(e) =>  setFieldValue('name', e.target.value) }
                />
                <ErrorMessage name="name" component="div" className={style.error} />
              </div>

              {/* Поле для емейлу */}
              <div className={style.inputContainer}>
                <label htmlFor="email">E-mail</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className={style.error} />
              </div>

              {/* Блок для зміни пароля */}
                <div className={style.passwordBlock}>
                              
                <h3>Password</h3>
                {/* Поточний пароль */}
                <div className={style.inputContainer}>
                  <label htmlFor="outdatedPassword">Outdated password</label>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="outdatedPassword"
                    name="outdatedPassword"
                    placeholder="Password"
                                  />
                                  <svg>
                                  <use href="#eye"></use>
                                  </svg>
                  <ErrorMessage
                    name="outdatedPassword"
                    component="div"
                    className={style.error}
                  />
                </div>
                {/* Новий пароль */}
                <div className={style.inputContainer}>
                  <label htmlFor="newPassword">New Password</label>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className={style.error}
                  />
                </div>
                {/* Повтор нового пароля */}
                <div className={style.inputContainer}>
                  <label htmlFor="repeatPassword">Repeat New Password</label>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    id="repeatPassword"
                    name="repeatPassword"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="repeatPassword"
                    component="div"
                    className={style.error}
                  />
                </div>
                {/* Кнопка для перемикання відображення пароля */}
                <button type="button" onClick={togglePasswordVisibility} className={style.togglePassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

                          {/* Кнопка сабміту */}
              <button 
        type="submit"            
        className={style.submitButton}
      >
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
