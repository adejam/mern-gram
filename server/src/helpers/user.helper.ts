import jwt from "jsonwebtoken"
import { UserType } from "../models/user.model"
import { CustomError } from "../utils/CustomError"

export const getUserFromToken = (token?: string) => {
  if (!token) {
    throw new CustomError("You are not authenticated!", 401)
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch (err) {
    throw new CustomError("Invalid token!", 403)
  }
}

export const userDataWithoutPassword = (user: any) => {
  const userdata = user._doc as unknown as UserType
  const { password: _userPassword, ...data } = userdata
  return data
}
