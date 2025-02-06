import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Token not found" });

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (!decoded)
      return res.status(401).json({ message: "Invalid credentials" });

    // user exists
    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // TODO incase dont want the user details only send the user._id
    req.user = user;
    next();
  } catch (error) {
    console.log("error in protectedroute middleware", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
