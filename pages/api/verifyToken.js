import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const { token } = req.cookies;
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    res.status(200).json({ user: decoded });
  } catch (error) {
    console.error("Invalid JWT token:", error);
    res.status(401).json({ message: "Invalid JWT token" });
  }
}
