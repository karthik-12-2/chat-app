import generateToken from "../lib/utils.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const SignupController = async (req, res) => {
  console.log(req.body);
  try {
    const { userName, email, password } = req.body;
    
    // hash the original password
    const hashSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hashSalt);

    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    });

    // if newuser exists
    if (newUser) {
      newUser.save();
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // check if password is correct
    const checkingHash = await bcrypt.compare(password, user.password);
    if (!checkingHash)
      return res.status(401).json({ message: "Invalid credentials" });

    generateToken(user._id, res);

    // if everything is correct, return success
    return res.status(200).json({
      id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const LogoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkAuth controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.log("error in getAllUSer controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
