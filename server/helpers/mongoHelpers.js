import User from "../models/userModel.js";


const addQuizScoreToUser = async (userId, score) => {
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (user) {
        // Add the score to the previousQuiz array
        user.totalMarks += parseInt(score);
        user.previousQuiz.push({ marks: score, startTime: Date.now() });
        // Save the updated document
        await user.save();
        return user; // Return the updated user document
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
        console.log("error at mongo score adding:", error?.message)
    }
  };

  export {addQuizScoreToUser}