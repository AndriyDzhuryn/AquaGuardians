import { useState } from 'react';

import css from './Slider.module.css';

const Slider = () => {
  const [value, setValue] = useState(50);

  return (
    <div className={css.sliderWrapper}>
      <h2 className={css.title}>Today</h2>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={e => setValue(e.target.value)}
        className={css.slider}
      />
      <div className={css.wrapperInterest}>
        <span className={css.interest}>0%</span>
        <span className={css.interest}>{value}%</span>
        <span className={css.interest}>100%</span>
      </div>
    </div>
  );
};

export default Slider;
