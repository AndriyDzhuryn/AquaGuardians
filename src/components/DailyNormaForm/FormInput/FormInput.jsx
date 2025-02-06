import { Field, useField } from 'formik';
import css from '../DailyNormaForm.module.css';

const FormInput = ({ name, onChange }) => {
  const [{ value }] = useField(name);
  onChange(value);
  return <Field className={css.field} type="text" name={name} />;
};

export default FormInput;
