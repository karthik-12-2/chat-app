import jwt from "jsonwebtoken";

function generateToken(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRETKEY, {
    expiresIn: "2d",
  });

  res.cookie("jwt", token, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });

  return token;
}

export default generateToken;
