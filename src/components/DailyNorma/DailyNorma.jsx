import css from './DailyNorma.module.css';

const DailyNorma = () => {
  return (
    <div className={css.dailyNormaWrapper}>
      <h2 className={css.title}>My daily norma</h2>
      <div className={css.NormaWrapper}>
        <p className={css.dailyNorma}>1,5 L</p>
        <button className={css.btnDailyNorma}>Edit</button>
      </div>
    </div>
  );
};

export default DailyNorma;
