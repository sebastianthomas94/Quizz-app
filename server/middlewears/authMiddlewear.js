import jwt from "jsonwebtoken";

// Middleware to check if the user is signed in
const requireAuth = (req, res, next) => {
  // Check for the presence of JWT token in cookies
  const token = req.cookies.jwt;

  // If token is not present, user is not signed in
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // If verification is successful, attach the decoded token data to the request object
    req.user = decodedToken;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { requireAuth };
