import { Field, useField } from 'formik';
import css from '../DailyNormaForm.module.css';
import { useEffect } from 'react';

const FormInput = ({ name, onChange }) => {
  const [{ value }] = useField(name);
  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  return <Field className={css.field} type="text" name={name} />;
};

export default FormInput;
