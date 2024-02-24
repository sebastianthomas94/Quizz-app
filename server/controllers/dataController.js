// Assuming you have your User model defined

import User from "../models/userModel.js";

// Controller to fetch all previous quizzes done by a user
const getAllPreviousQuizzesByUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user is found, return the previous quizzes
    const previousQuizzes = user.previousQuiz;

    res.status(200).json(previousQuizzes);
  } catch (error) {
    console.error("Error fetching previous quizzes:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getRank = async (req, res) => {//wanted to do the averaging
  const userId = req.user.userId;
  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the total marks of the user
    const userTotalMarks = user.totalMarks;

    // Find the count of users who have more total marks than the current user
    const rank =
      (await User.countDocuments({ totalMarks: { $gt: userTotalMarks } })) + 1;
    res.status(200).json({ rank });
  } catch (error) {
    console.error("Error fetching current rank:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getLeaderboard = async(req,res)=>{

  try {
    // Fetch users sorted by totalMarks in descending order
    const leaderboard = await User.find().sort({ totalMarks: -1 });

    // Map users to required format
    const formattedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      totalScore: user.totalMarks
    }));

    res.status(200).json(formattedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Server Error' });
  }

}

export { getAllPreviousQuizzesByUser, getRank, getLeaderboard };
