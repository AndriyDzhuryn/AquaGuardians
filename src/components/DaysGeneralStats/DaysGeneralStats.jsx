import css from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ position, isOpen, date, waterData }) => {
  return (
    <>
      {isOpen && (
        <div
          style={{
            '--dropdown-top': `${position.top}px`,
            '--dropdown-left': `${position.left}px`,
          }}
          className={css.statsWrapper}
        >
          <p className={css.dateMonth}>
            {date?.toLocaleDateString('en-US', {
              day: 'numeric',
            })}
            {', '}
            {date?.toLocaleDateString('en-US', {
              month: 'long',
            })}
          </p>
          <p className={css.dailyNorma}>
            Daily norma: <b className={css.result}>{waterData.norm} L</b>
          </p>
          <p className={css.dailyNorma}>
            Fulfillment of the daily norm:{' '}
            <b className={css.result}>{waterData.progress}%</b>
          </p>
          <p className={css.dailyNorma}>
            How many servings of water:{' '}
            <b className={css.result}>{waterData.servings}</b>
          </p>
        </div>
      )}
    </>
  );
};

export default DaysGeneralStats;
