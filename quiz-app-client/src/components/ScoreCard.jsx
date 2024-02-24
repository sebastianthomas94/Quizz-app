import React from 'react';

const ScoreCard = ({ score }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-40">
      <h2 className="text-3xl font-bold text-center mb-4 animate-bounce">Quiz is Completed</h2>
      <div className="text-center">
        <p className="text-2xl font-semibold mb-4">Score: {score}</p>
      </div>
    </div>
  );
};

export default ScoreCard;
