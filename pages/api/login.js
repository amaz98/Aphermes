import dbConnect from "@/lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          return res.status(400).json({ message: "Email is not connected to any accounts" });
        }

        const verifyLogin = await bcrypt.compare(password, existingUser.password);

        if (verifyLogin) {
          const token = jwt.sign({userId: existingUser._id}, process.env.JWT_KEY)
          res.cookie('token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge:  86400000,
          })
          res.status(200).json({ message: "Login successful" }, {token});
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      } catch (error) {
        res.status(500).json({ message: "Error verifying credentials", error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;