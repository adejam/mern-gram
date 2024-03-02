import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { Request, Response } from "express"
import User from "../models/user.model"
import {
  validationErrorBuilder,
  ZodError,
} from "../utils/validationErrorBuilder"
import {
  createUserValidationSchema,
  signinUserValidationSchema,
} from "../validation_schemas/user.schema"
import { CustomError } from "../utils/CustomError"
import { ICustomError } from "../utils/error"
import { userDataWithoutPassword } from "../helpers/user.helper"

export const signup = async (req: Request, res: Response) => {
  try {
    const data = createUserValidationSchema.parse(req.body)
    const salt = bcryptjs.genSaltSync()
    data["password"] = bcryptjs.hashSync(data.password, salt)
    const newUser = new User({ ...data })

    await newUser.save()
    res
      .status(201)
      .json({ message: "User created successfully", success: true, data: null })
  } catch (error) {
    if (error instanceof ZodError) {
      // If the error is a ZodError (validation error), extract and format the error details
      const validationError = validationErrorBuilder(error)

      res.status(422).json({ ...validationError })
    } else {
      // If the error is not a ZodError (e.g., database error), pass it to the error handler middleware

      const customError = error as unknown as ICustomError
      res
        .status(customError.statusCode || 500)
        .json({ success: false, message: customError.message, data: null })
    }
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = signinUserValidationSchema.parse(req.body)
    const user = await User.findOne({ email })
    if (!user) throw new CustomError("User not found", 404)

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) throw new CustomError("wrong credentials", 401)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!)
    const data = userDataWithoutPassword(user)

    const expiryDate = new Date(Date.now() + 3600000) // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ success: true, message: "Signin Successful", data })
  } catch (error) {
    if (error instanceof ZodError) {
      // If the error is a ZodError (validation error), extract and format the error details
      const validationError = validationErrorBuilder(error)

      res.status(422).json({ ...validationError })
    } else {
      // If the error is not a ZodError (e.g., database error), pass it to the error handler middleware
      const customError = error as unknown as ICustomError
      res
        .status(customError.statusCode || 500)
        .json({ success: false, message: customError.message, data: null })
    }
  }
}

export const signout = (req: Request, res: Response) => {
  res
    .clearCookie("access_token")
    .status(200)
    .json({ success: true, message: "Signout successful!", data: null })
}
