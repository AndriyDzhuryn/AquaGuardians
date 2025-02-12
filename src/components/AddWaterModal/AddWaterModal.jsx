import { useId, useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { startOfMonth } from 'date-fns';
import * as Yup from 'yup';

import { addWater, updateWater } from '../../redux/water/operations.js';
import Modal from 'react-modal';
import WaterItemModal from '../WaterItemModal/WaterItemModal.jsx';
import { apiGetTodayWater } from '../../redux/today/operations.js';
import { apiGetMonthWater } from '../../redux/month/operations.js';

import css from './AddWaterModal.module.css';

Modal.setAppElement('#root');

const MIN_WATER_VOLUME = 50;
const MAX_WATER_VOLUME = 5000;

const waterSchema = Yup.object().shape({
  date: Yup.string()
    .matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, 'Invalid time format')
    .required('Time is required'),
  volume: Yup.number()
    .min(MIN_WATER_VOLUME, `Volume must be at least ${MIN_WATER_VOLUME}`)
    .max(MAX_WATER_VOLUME, `Volume cannot be more than ${MAX_WATER_VOLUME}`)
    .required('Volume is required'),
});

const customStyles = {
  content: {
    backgroundColor: 'rgba(255, 255, 255)',
    padding: 0,
    borderRadius: 10,
    border: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
};

export default function AddWaterModal({ isOpen, onClose, editData }) {
  const timeFieldId = useId();
  const volumeFieldId = useId();
  const formikRef = useRef(null);
  const [initialValues, setInitialValues] = useState({
    date: '',
    volume: 0,
  });
  const [currentDate, setCurrentDate] = useState(new Date());

  const dispatch = useDispatch();

  const combineDateAndTime = time => {
    const currentDate = new Date().toISOString().split('T')[0];
    return `${currentDate}T${time}`;
  };

  const extractTimeFromDate = date => {
    if (!date) return '';
    return date.split('T')[1].substring(0, 5);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const time = `${String(hour).padStart(2, '0')}:${String(
          minute
        ).padStart(2, '0')}`;
        options.push(time);
      }
    }
    return options;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const currentTime = getCurrentTime();

    if (!editData) {
      setInitialValues({
        date: currentTime,
        volume: 0,
      });
    } else {
      setInitialValues({
        date: extractTimeFromDate(editData.time),
        volume: editData.amount || 0,
      });
    }
  }, [editData, isOpen]);

  const start = startOfMonth(currentDate);
  const month = start.toLocaleDateString('en-US', { month: 'numeric' });
  const year = start.toLocaleDateString('en-US', { year: 'numeric' });

  const onSaveWater = newWater => {
    const waterWithDate = {
      ...newWater,
      date: combineDateAndTime(newWater.date),
    };
    if (editData) {
      dispatch(updateWater({ ...waterWithDate, id: editData.id }));
    } else {
      dispatch(addWater(waterWithDate));
    }
  };

  const handleSubmit = (values, actions) => {
    onSaveWater(values);
    setTimeout(() => {
      dispatch(apiGetTodayWater());
      dispatch(apiGetMonthWater({ month, year }));
    }, 250);
    actions.resetForm();
    onClose();
  };

  const handleVolumeChangeCtrl = number => {
    if (formikRef.current) {
      const currentVolume = formikRef.current.values.volume;
      const newVolume = Math.max(currentVolume + number, 0);
      formikRef.current.setFieldValue('volume', newVolume);
    }
  };

  const handleVolumeChange = event => {
    const newVolume =
      event.target.value === '' ? 0 : Number(event.target.value);
    if (formikRef.current) {
      formikRef.current.setFieldValue('volume', newVolume);
    }
  };

  const handleVolumeFocus = () => {
    if (formikRef.current?.values.volume === 0) {
      formikRef.current.setFieldValue('volume', '');
    }
  };

  const DisplayValue = () => {
    const { values } = useFormikContext();
    return <div className={css.value}>{values.volume}ml</div>;
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={editData ? 'Edit Water' : 'Add Water'}
      style={customStyles}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={waterSchema}
        innerRef={formikRef}
        enableReinitialize={true}
        key={isOpen}
      >
        <Form className={css.form}>
          <button className={css.btnIcon} onClick={onClose}>
            <svg className={css.icon} width="24" height="24">
              <use href="/icons/icons-sprite.svg#close-icon" />
            </svg>
          </button>
          <h2 className={css.title}>
            {editData ? 'Edit the entered amount of water' : 'Add water'}
          </h2>
          {editData && (
            <WaterItemModal
              volume={initialValues.volume}
              date={initialValues.date}
            />
          )}

          <div className={css.formField}>
            <h3 className={css.subTitle}>Choose a value:</h3>
            <p>Amount of water:</p>
            <div className={css.waterControls}>
              <button
                type="button"
                onClick={() => handleVolumeChangeCtrl(-50)}
                className={css.controller}
              >
                <svg className={css.minusIcon} width="14" height="14">
                  <use href="/icons/icons-sprite.svg#minus-small" />
                </svg>
              </button>
              <div className={css.displayValue}>
                <DisplayValue />
              </div>
              <button
                type="button"
                onClick={() => handleVolumeChangeCtrl(50)}
                className={css.controller}
              >
                <svg className={css.icon} width="14" height="14">
                  <use href="/icons/icons-sprite.svg#plus-small" />
                </svg>
              </button>
            </div>
          </div>
          <div className={css.formField}>
            <label htmlFor={timeFieldId}>Recording time:</label>
            <Field
              as="select"
              name="date"
              id={timeFieldId}
              className={css.input}
            >
              {!generateTimeOptions().includes(initialValues.date) && (
                <option value={initialValues.date}>{initialValues.date}</option>
              )}
              {generateTimeOptions().map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </Field>
            <ErrorMessage name="date" component="span" className={css.error} />
          </div>
          <div className={css.formField}>
            <label htmlFor={volumeFieldId} className={css.subTitle}>
              Enter the value of the water used:
            </label>
            <Field
              type="number"
              name="volume"
              id={volumeFieldId}
              onChange={handleVolumeChange}
              onFocus={handleVolumeFocus}
              onBlur={e => {
                if (e.target.value === '') {
                  formikRef.current.setFieldValue('volume', 0);
                }
              }}
              className={css.input}
            />
            <ErrorMessage
              name="volume"
              component="span"
              className={css.error}
            />
          </div>
          <div className={css.formBottom}>
            <div className={css.bottomDisplay}>
              <DisplayValue />
            </div>
            <button type="submit" className={css.addBtn}>
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
}
