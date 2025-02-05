import css from './WaterRatioPanel.module.css';

export default function WaterRatioPanel() {
  const handleClick = () => {};

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <p className={css.title}>Today</p>
        <div className={css.rangeSlider}>
          <p>Range Slider will be added soon</p>
        </div>
      </div>
      <button className={css.btn} onClick={handleClick}>
        <svg className={css.icon} width="24" height="24">
          <use href="/icons/icons-sprite.svg#plus-circle" />
        </svg>
        Add Water
      </button>
    </div>
  );
}
