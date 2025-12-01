import { User } from "../models/model.user.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => { 
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
    try {
        
        // checking if the users has already exist
        const { email, password } = req.body;

        const user = await User.findOne({
          email: email.toLowerCase()
        });

       if (!user) return res.status(400).json({
        message: "user not found"
       })
        

        //
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
          message: "invalid credentials"
        });

        res.status(200).json({
          message: "user logged in",
          user: user._id,
          email: user.email,
          username: user.username
        });

    } catch (error) {
        res.status(500).json({
          message: error.message
        });
    }
}

const logoutuser = async (req, res) =>{
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email
    });
    if(!user) return res.status(404).json({
      message: "user not found"
    });

    res.status(200).json({
      message: "logout successfull"
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error", error
    });
  }
}
export {
  registerUser,
  loginUser,
  logoutuser
};
