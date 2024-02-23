import { Router } from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middlewears/authMiddlewear.js";

const userRouter = Router();

// userRouter.use(requireAuth);
// Signup Route
userRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user alredy exists")
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signin Route
userRouter.post("/signin", async (req, res) => {
  try {console.log(req.body)
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log(user,email)
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    }); // You can adjust the expiration time as needed

    // Send the token as a cookie to the browser
    res.cookie("jwt", token, { httpOnly: false, maxAge: 3600000 }); // Cookie will expire in 1 hour (1h * 60min * 60sec * 1000ms)

    // If both email and password are correct, send a success message along with the token
    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;
