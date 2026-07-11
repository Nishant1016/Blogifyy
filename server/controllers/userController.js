import jwt from "jsonwebtoken";
import bcrypt from "bcrypt" ;
import User from "../models/user.js";

const createUserToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
      role: "user",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// A new account is created after the submitted information is validated.
export const registerUser = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 6 characters.",
      });
    }

    // Duplicate accounts are prevented by checking the submitted email.
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // The password is hashed before being stored.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userToken = createUserToken(user._id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      userToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User registration error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// User access is granted after the submitted credentials are verified.
export const loginUser = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // The password is explicitly selected because it is hidden by the model.
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const userToken = createUserToken(user._id);

    return res.json({
      success: true,
      message: "Login successful.",
      userToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User login error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};