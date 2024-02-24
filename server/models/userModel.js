import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
    },
    totalMarks: {
      type: Number,
      default: 0, // Set default value to 0
    },
    previousQuiz: [
      {
        marks: {
          type: Number,
          default: 0, // Set default value to 0
        },
        startTime: { type: Date, default: Date.now },
      },
    ],
    // can include other user details here like profile picture, bio, etc.
  },
  { timestamps: true }
);

// Define a pre-save middleware to set the initial value of the rank field
userSchema.pre("save", async function (next) {
  // Check if rank is not already set
  if (!this.rank) {
    try {
      // Find the maximum rank among existing users
      const maxRankUser = await this.constructor
        .findOne({}, { rank: 1 })
        .sort({ rank: -1 })
        .limit(1);
      // Set the rank for the new user to be one greater than the maximum rank
      this.rank = (maxRankUser?.rank || 0) + 1;
    } catch (error) {
      console.error(error);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
