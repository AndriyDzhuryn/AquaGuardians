import css from './DailyNormaPanel.module.css';

export default function DailyNormaPanel() {
  const handleClick = () => {};

  return (
    <div className={css.container}>
      <h2 className={css.title}>My daily norma</h2>
      <div className={css.wrapper}>
        <h2 className={css.number}>1.5 L</h2>
        <button className={css.btn} onClick={handleClick}>
          Edit
        </button>
      </div>
    </div>
  );
}
