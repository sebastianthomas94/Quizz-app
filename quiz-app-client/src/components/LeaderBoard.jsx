import React, { useEffect, useState } from "react";
import { useGetLeaderboardMutation } from "../slices/apiSlice";
import { toast } from "react-toastify";

const Leaderboard = () => {
  const [getLeaderboard] = useGetLeaderboardMutation();
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLeaderboard = async (page) => {
    try {
      const data = await getLeaderboard({ page }).unwrap();
      setLeaderboard(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      toast.dark(error?.data?.message);
      // Handle error, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    fetchLeaderboard(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mx-20">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leaderboard.map((user, index) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="mt-4 flex justify-center">
        <button
          className="px-3 py-1 bg-gray-200 rounded-md mr-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded-md ml-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={leaderboard.length === 0} // Assuming empty result indicates last page
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
