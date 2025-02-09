import { useState } from 'react';
import { useDispatch } from 'react-redux';
import iziToast from 'izitoast';

import AppModal from '../AppModal/AppModal.jsx';

import css from './WaterItems.module.css';
import 'izitoast/dist/css/iziToast.min.css';

const WaterItems = ({ amount, time, id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      // const token = localStorage.getItem('token');
      // await axios.delete(`https://your-api.com/api/water-intake/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });

      // setEntries(prevEntries => prevEntries.filter(entry => entry._id !== id)); //setEntries - стан у компоненті listWater

      setIsOpen(false);
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Failed to delete entry' });
    }
  };

  return (
    <div className={css.wrapperWaterConsumedItem}>
      <div className={css.glassWaterWrapper}>
        <svg className={css.glassOfWater}>
          <use href="/public/icons/icons-sprite.svg#glass-of-water"></use>
        </svg>
        <div>
          <span className={css.amountWater}>{amount} мл</span>
          <span className={css.time}>{time}</span>
        </div>
      </div>

      <div>
        <button className={css.btnWater}>
          <svg className={css.editWaterItem}>
            <use href="/public/icons/icons-sprite.svg#pensil-aquare"></use>
          </svg>
        </button>
        <button
          className={css.btnWater}
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          <svg className={css.trash}>
            <use href="/public/icons/icons-sprite.svg#trash"></use>
          </svg>
        </button>
        <AppModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setModalIsOpen}
          handleAccept={handleDelete}
          title="Delete entry"
          description="Are you sure you want to delete the entry?"
          acceptButton="Delete"
        />
      </div>
    </div>
  );
};

export default WaterItems;
