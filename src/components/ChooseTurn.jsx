import { TURNS } from '../constants';

const ChooseTurn = ({ handleButtonClick }) => {
  return (
    <div className="chooseTurnContainer">
      <h1>Which shift do you want to start with?</h1>
      <div className="turnContent">
        <button onClick={handleButtonClick} className="turnContent__X">
          {TURNS.X}
        </button>
        <button onClick={handleButtonClick} className="turnContent__O">
          {TURNS.O}
        </button>
      </div>
    </div>
  );
};

export default ChooseTurn;
