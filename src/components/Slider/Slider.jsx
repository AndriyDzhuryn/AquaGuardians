import { useRef, useState } from 'react';

import css from './Slider.module.css';

const Slider = () => {
  const [value, setValue] = useState(50);
  const sliderRef = useRef(null);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return (
    <div className={css.sliderWrapper}>
      <div className={css.titleWrapper}>
        <h2 className={css.title}>Today</h2>
        <div className={css.sliderValueWrapper}>
          <input
            ref={sliderRef}
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={handleChange}
            className={css.slider}
          />
          <div
            className={css.dynamSliderWrapper}
            style={{ '--value': `${value}%` }}
          >
            <span className={css.dynamSlider}>{value}%</span>
          </div>
        </div>

        <div className={css.valueStatWrapper}>
          <div className={css.statSliderWrapper}>
            <span className={css.statSlider}>0%</span>
            <span className={css.statSlider}>100%</span>
          </div>
        </div>
      </div>

      <button className={css.btnAddWater}>
        <svg className={css.addWaterPlus}>
          <use href="../../../public/icons/icons-sprite.svg#plus-circle"></use>
        </svg>
        Add Water
      </button>
    </div>
  );
};

export default Slider;
