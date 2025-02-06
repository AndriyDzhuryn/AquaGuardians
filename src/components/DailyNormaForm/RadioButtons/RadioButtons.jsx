import { Field, useField } from 'formik';
import css from '../DailyNormaForm.module.css';

const RadioButtons = ({ onChange }) => {
  const [{ value }] = useField('gender');
  onChange(value);
  return (
    <div className={css.select}>
      <label className={css.label}>
        <Field type="radio" name="gender" value="female" />
        <span>For woman</span>
      </label>
      <label className={css.label}>
        <Field type="radio" name="gender" value="male" />
        <span>For man</span>
      </label>
    </div>
  );
};

export default RadioButtons;
