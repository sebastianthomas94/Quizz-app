import React from 'react';

const PreviousQuizCard = () => {
  // Dummy data for previous quizzes
  const previousQuizzes = [
    { id: 1, number: 1, time: '2022-02-20 10:00 AM', marks: 80 },
    { id: 2, number: 2, time: '2022-02-22 11:30 AM', marks: 75 },
    { id: 3, number: 3, time: '2022-02-25 09:45 AM', marks: 90 },
  ];

  return (
    <div className="bg-white p-4 rounded-md shadow-md mx-20">
      <h2 className="text-xl font-bold mb-4">Previous Quizzes</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time of Taking</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks Acquired</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {previousQuizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td className="px-6 py-4 whitespace-nowrap">{quiz.number}</td>
              <td className="px-6 py-4 whitespace-nowrap">{quiz.time}</td>
              <td className="px-6 py-4 whitespace-nowrap">{quiz.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousQuizCard;
