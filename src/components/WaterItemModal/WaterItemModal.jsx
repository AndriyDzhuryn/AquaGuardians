import css from './WaterItemModal.module.css';

const WaterItemModal = ({ volume, date }) => {
  return (
    <div className={css.wrapperWaterConsumedItem}>
      <div className={css.glassWaterWrapper}>
        <svg className={css.glassOfWater}>
          <use href="../../../public/icons/icons-sprite.svg#glass-of-water"></use>
        </svg>
        <div>
          <span className={css.amountWater}>{volume} ml</span>
          <span className={css.time}>{date}</span>
        </div>
      </div>
    </div>
  );
};

export default WaterItemModal;
