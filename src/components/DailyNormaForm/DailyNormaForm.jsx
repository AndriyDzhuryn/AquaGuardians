import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';

import FormInput from './FormInput/FormInput.jsx';
import RadioButtons from './RadioButtons/RadioButtons.jsx';
import { updateWaterRate } from '../../redux/waterRate/operations.js';
import { selectAuthUserData } from '../../redux/auth/selectors.js';

import css from './DailyNormaForm.module.css';
import { apiGetMonthWater } from '../../redux/month/operations.js';
import { startOfMonth } from 'date-fns';

const dailyNormaFormSchema = Yup.object().shape({
  waterAmount: Yup.number()
    .max(5, 'Too long! Amount of water should be in liters.')
    .required('Required'),
});

const DailyNormaForm = ({ closeModal }) => {
  const [liters, setLiters] = useState(0);
  const [gender, setGender] = useState('female');
  const [weight, setWeight] = useState('0');
  const [time, setTime] = useState('0');
  const [currentDate] = useState(new Date());

  const dispatch = useDispatch();
  const userWaterRate = useSelector(selectAuthUserData);
  const currentWaterRate = useSelector(state => state.waterRate?.waterRate);

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

  const start = startOfMonth(currentDate);
  const month = start.toLocaleDateString('en-US', { month: 'numeric' });
  const year = start.toLocaleDateString('en-US', { year: 'numeric' });

  const submitData = values => {
    dispatch(
      updateWaterRate({
        waterRate: Number.parseFloat(values.waterAmount) * 1000,
      })
    )
      .unwrap()
      .catch(() =>
        toast.error('Request wasn`t successful', {
          duration: 3000,
          position: 'top-right',
        })
      );
    closeModal();
    dispatch(apiGetMonthWater({ month, year }));
  };

  return (
    <div>
      <Formik
        initialValues={{
          gender: 'female',
          weight: '0',
          time: '0',
          waterAmount:
            currentWaterRate?.waterRate / 1000 ||
            userWaterRate?.waterRate / 1000 ||
            0,
        }}
        onSubmit={submitData}
        validationSchema={dailyNormaFormSchema}
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
                <p className={css.infoBox}>
                  The time of active participation in sports or other activities
                  with a high physical. Load in hours:
                </p>
                <label>
                  <FormInput name="time" onChange={setTime} {...props} />
                </label>
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
                <ErrorMessage
                  className={css.error}
                  name="waterAmount"
                  component="span"
                />
              </div>
            </div>
            <button className={css.submitBtn} type="submit">
              Save
            </button>
          </Form>
        )}
      </Formik>
      <Toaster />
    </div>
  );
};

export default DailyNormaForm;
