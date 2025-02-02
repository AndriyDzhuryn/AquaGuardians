import s from './WhyDrinkWater.module.css';

const WhyDrinkWater = () => {
  return (
    <div className={s.reasonsWrapper}>
      <h3 className={s.title3}>Why drink water</h3>
      <ul className={s.reasonsList}>
        <li className={s.listItem}>
          <p className={s.listText}>Supply of nutrients to all organs</p>
        </li>
        <li className={s.listItem}>
          <p className={s.listText}>Providing oxygen to the lungs</p>
        </li>
        <li className={s.listItem}>
          <p className={s.listText}>Maintaining the work of the heart</p>
        </li>
        <li className={s.listItem}>
          <p className={s.listText}>Release of processed substances</p>
        </li>
        <li className={s.listItem}>
          <p className={s.listText}>
            Ensuring the stability of the internal environment
          </p>
        </li>
        <li className={s.listItem}>
          <p className={s.listText}>
            Maintaining within the normal temperature
          </p>
        </li>
        <li className={s.listItem}>
          <p className={s.listText}>
            Maintaining an immune system capable of resisting disease
          </p>
        </li>
      </ul>
    </div>
  );
};
