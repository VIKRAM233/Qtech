import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
const secretKey: string = process.env.SECRET_KEY || "myseceretkey";

function generateToken(payload: any) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username: username, password: hashedPassword });
    await user.save();
    const token = generateToken({ username, hashedPassword });
    return res.status(200).json({ username, hashedPassword, token });
  } catch (error: any) {
    return res.status(500).json({ error: error, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken({ username, hashedPassword });
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json({ error: error, message: error.message });
  }
};
