import React from 'react';
import { TURNS } from '../constants';

const Score = ({ score, resetScore }) => {
  return (
    <div>
      {' '}
      <div className="score">
        <span className="ScoreX">{`${TURNS.X} : ${score.X}`}</span>
        <span className="ScoreO">{`${TURNS.O} : ${score.O}`}</span>
      </div>
      <button onClick={resetScore}>Reset Score</button>
    </div>
  );
};

export default Score;
