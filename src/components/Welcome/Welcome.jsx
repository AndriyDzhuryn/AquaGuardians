import WaterConsumptionTracker from '../WaterConsumptionTracker/WaterConsumptionTracker';
import WhyDrinkWater from '../WhyDrinkWater/WhyDrinkWater';
import s from './Welcome.module.css';

const Welcome = () => {
  return (
    <div className={s.container}>
      <div className={s.containerWelcome}>
        <WaterConsumptionTracker />
        <WhyDrinkWater />
      </div>
    </div>
  );
};

export default Welcome;
