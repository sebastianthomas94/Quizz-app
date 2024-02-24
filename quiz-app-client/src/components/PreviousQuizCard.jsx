import React, { useEffect, useState } from "react";
import { useGetPreviousQuizzesMutation } from "../slices/apiSlice";

const PreviousQuizCard = () => {
  // Dummy data for previous quizzes
  const [previousQuizzes, setPreviousQuizzes] = useState([]);
  const [getPrevQuiz] = useGetPreviousQuizzesMutation();

  const fetchPrevQuiz = async () => {
    const data = await getPrevQuiz().unwrap();
    console.log(data);
    setPreviousQuizzes(data);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Converts the timestamp to a locale-specific string representation
  };

  useEffect(() => {
    fetchPrevQuiz();
  }, []);

  return (
    <>
      {previousQuizzes.length && (
        <div className="bg-white p-4 rounded-md shadow-md h-fit mx-20 my-20">
          <h2 className="text-xl font-bold mb-4">Previous Quizzes</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time of Taking
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marks Acquired
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {previousQuizzes.map((quiz, index) => (
                <tr key={quiz.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatTime(quiz.startTime)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{quiz.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default PreviousQuizCard;
