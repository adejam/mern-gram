import { Request, Response } from "express"
import User from "../models/user.model"

export const test = async (req: Request, res: Response) => {
  const users = await User.find({ email: "oluwaloseyifunmiadeleye1@gmail.com" })
  res.json({
    message: "API is working!",
    users,
  })
}
