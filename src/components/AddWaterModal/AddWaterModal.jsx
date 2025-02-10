import { useId, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { addWater } from '../../redux/water/operations';
import * as Yup from 'yup';
import Modal from 'react-modal';
import css from './AddWaterModal.module.css';

Modal.setAppElement('#root');

const waterSchema = Yup.object().shape({
  time: Yup.string()
    .matches(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, 'Invalid time format')
    .required('Time is required'),
  volume: Yup.number()
    .min(1, 'Volume must be at least 1')
    .max(5000, 'Volume cannot be more than 5000')
    .required('Volume is required'),
});

const customStyles = {
  content: {
    backgroundColor: 'rgba(255, 255, 255)',
    width: 280,
    minHeight: 540,
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

function getTodayDateWithTime(time) {
  const parts = time.split(':');
  var date = new Date();
  date.setHours(parts[0], parts[1], 0, 0);
  return date.toISOString().slice(0, 16);
}

export default function AddWaterModal({ isOpen, onClose }) {
  const timeFieldId = useId();
  const volumeFieldId = useId();
  const formikRef = useRef(null);

  const initialValues = {
    time: '',
    volume: 0,
  };

  const dispatch = useDispatch();

  const onAddWater = newWater => {
    dispatch(addWater(newWater));
  };

  const handleSubmit = (values, actions) => {
    const date = getTodayDateWithTime(values.time);
    const volume = values.volume;
    onAddWater({ date: date, volume: volume });
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
      event.target.value === '' ? '' : Number(event.target.value);
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
      contentLabel="Add Water"
      style={customStyles}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={waterSchema}
        innerRef={formikRef}
      >
        <Form className={css.form}>
          <button className={css.btnIcon} onClick={onClose}>
            <svg className={css.icon} width="24" height="24">
              <use href="/icons/icons-sprite.svg#close-icon" />
            </svg>
          </button>
          <h2 className={css.title}>Add Water</h2>
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
              name="time"
              id="timeFieldId"
              className={css.input}
              type="time"
              placeholder="HH:MM"
            />
            <ErrorMessage name="time" component="span" className={css.error} />
          </div>
          <div className={css.formField}>
            <label htmlFor={volumeFieldId} className={css.subTitle}>
              Enter the value of the water used:
            </label>
            <Field
              type="number"
              name="volume"
              id="volumeFieldId"
              onChange={handleVolumeChange}
              onFocus={handleVolumeFocus}
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
