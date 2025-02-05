import { Field } from 'formik';
import style from '../Settings.module.css';

const InputFromPassword = ({
  id,
  name,
  showPassword,
  togglePasswordVisibility,
  autoComplete,
}) => (
  <div className={style.wrapper}>
    <Field
      type={showPassword ? 'text' : 'password'}
      id={id}
      autoComplete={autoComplete}
      name={name}
      placeholder="Password"
      className={style.input}
    />
    <button
      type="button"
      className={style.button}
      onClick={togglePasswordVisibility}
    >
      <svg className={style.icon} width="16" height="16">
        <use
          href={`../../../public/icons/icons-sprite.svg#${
            showPassword ? 'eye' : 'eye-slash'
          }`}
        ></use>
      </svg>
    </button>
  </div>
);

export default InputFromPassword;
