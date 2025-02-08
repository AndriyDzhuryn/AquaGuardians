import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './DailyNormaForm.module.css';
import { useState, useEffect } from 'react';
import FormInput from './FormInput/FormInput';
import RadioButtons from './RadioButtons/RadioButtons';
import * as Yup from 'yup';

const DailyNormaFormSchema = Yup.object().shape({
  gender: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  weight: Yup.string()
    .min(2, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Required'),
  time: Yup.string()
    .min(2, 'Too Short!')
    .max(5, 'Too Long!')
    .required('Required'),
  waterAmount: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
});

const DailyNormaForm = () => {
  const [liters, setLiters] = useState(0);
  const [gender, setGender] = useState('female');
  const [weight, setWeight] = useState('0');
  const [time, setTime] = useState('0');
  useEffect(() => {
    if (gender === 'female') {
      setLiters(
        (Number.parseFloat(weight) || 0) * 0.03 +
          (Number.parseFloat(time) || 0) * 0.4
      );
    } else if (gender === 'male') {
      setLiters(
        (Number.parseFloat(weight) || 0) * 0.04 +
          (Number.parseFloat(time) || 0) * 0.6
      );
    }
  }, [gender, weight, time]);

  const submitData = values => {
    console.log(values.waterAmount);
  };

  return (
    <div>
      <Formik
        initialValues={{
          gender: 'female',
          weight: '0',
          time: '0',
          waterAmount: '0',
        }}
        onSubmit={submitData}
        validationSchema={DailyNormaFormSchema}
      >
        {props => (
          <Form>
            <div>
              <p className={css.accentLabel}>Calculate your rate:</p>
              <div className={css.labelsContainer}>
                <RadioButtons onChange={setGender} />
                <p className={css.infoBox}>Your weight in kilograms:</p>
                <label>
                  <FormInput name="weight" onChange={setWeight} {...props} />
                </label>
                <ErrorMessage name="weight" component="span" />
                <p className={css.infoBox}>
                  The time of active participation in sports or other activities
                  with a high physical. Load in hours:
                </p>
                <label>
                  <FormInput name="time" onChange={setTime} {...props} />
                </label>
                <ErrorMessage name="time" component="span" />
                <p className={css.textRequired}>
                  The required amount of water in liters per day:
                  <span className={css.waterLiters}>{liters.toFixed(1)} L</span>
                </p>
                <p className={css.waterDrink}>
                  Write down how much water you will drink:
                </p>
                <label>
                  <Field className={css.field} name="waterAmount" />
                </label>
                <ErrorMessage name="waterAmount" component="span" />
              </div>
            </div>
            <button className={css.submitBtn} type="submit">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DailyNormaForm;
