import css from './DaysGeneralStats.module.css';

const DaysGeneralStats = ({ position, isOpen, date, monthData }) => {
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
            Daily norma:{' '}
            <b className={css.result}>{monthData.dailyWaterNorm} L</b>
          </p>
          <p className={css.dailyNorma}>
            Fulfillment of the daily norm:{' '}
            <b className={css.result}>{monthData.percentage}%</b>
          </p>
          <p className={css.dailyNorma}>
            How many servings of water:{' '}
            <b className={css.result}>{monthData.consumptionCount}</b>
          </p>
        </div>
      )}
    </>
  );
};

export default DaysGeneralStats;
