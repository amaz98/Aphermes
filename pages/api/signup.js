import dbConnect from "@/lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";
import Email from "next-auth/providers/email";




const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const {email,password} = req.body;
        if(!email || !password){
          return res.status(400).json({message:"Email and password required"});
        }
      } catch (error) {
        console.error("Error in /api/signup:", error);
        res.status(500).json({ message: "Error creating user", error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;