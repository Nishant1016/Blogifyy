import jwt from "jsonwebtoken";
import User from "../models/user.js";

const userAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Please log in to continue.",
      });
    }

    // A raw token or Bearer token can be accepted.
    const token = authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : authorization;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Access is restricted to authenticated users.
    if (decoded.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "User access is required.",
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account was not found.",
      });
    }

    // The authenticated user is attached for use by later controllers.
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token.",
    });
  }
};

export default userAuth;