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

        if (existingUser) {
          return res.status(400).json({ message: "Email already in use" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt)
        const newUser = await User.create({ email, password: hash});

        if(newUser){
          const token = jwt.sign({userId: user._id}, process.env.JWT_KEY)
          res.cookie('token', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge:  86400000,
          })
          res.status(201).json({ message: "User created successfully", user: newUser });
        } else {
          res.status(201).json({message:"Unable to create user"})
        }

      } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;