import { userDataWithoutPassword } from "./../helpers/user.helper"
import { Request, Response } from "express"
import { getUserFromToken } from "../helpers/user.helper"
import User from "../models/user.model"
import { CustomError } from "../utils/CustomError"
import { ICustomError } from "../utils/error"

export const fetchAuthUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.access_token
    const data = getUserFromToken(token) as unknown as { id: string }

    if (!data.id) {
      throw new CustomError("You are not authenticated!", 401)
    }

    const user = await User.findById(data.id)
    const userWithoutPassword = userDataWithoutPassword(user)

    res
      .status(200)
      .json({
        success: true,
        message: "user_fetched successfully",
        data: userWithoutPassword,
      })
  } catch (error) {
    const customError = error as unknown as ICustomError
    res
      .status(customError.statusCode || 500)
      .json({ success: false, message: customError.message, data: null })
  }
}
