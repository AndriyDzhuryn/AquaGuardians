
import style from './InputFormPassword.module.css';
import { Field } from "formik";



function InputFromPassword({showPassword,name, togglePasswordVisibility }) {

    return (
        <div className={style.wrapper}>
                    <Field
                      className={style.input}
                      type={showPassword ? 'text' : 'password'}
                      name={name}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className={style.button}
                      onClick={togglePasswordVisibility}
                    >
                      <svg className={style.icon} width="14" height="12">
                        <use
                          href={`../../../public/icons/icons-sprite.svg#${
                            showPassword ? 'eye' : 'eye-slash'
                          }`}
                        ></use>
                      </svg>
                    </button>
                  </div>
    )
}
 export default InputFromPassword;