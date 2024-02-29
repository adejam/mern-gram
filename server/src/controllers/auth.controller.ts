import jwt from "jsonwebtoken"
import { errorHandler } from "./../utils/error"
import bcryptjs from "bcryptjs"
import { NextFunction, Request, Response } from "express"
import User from "../models/user.model"
import {
  validationErrorBuilder,
  ZodError,
} from "../utils/validationErrorBuilder"
import {
  createUserValidationSchema,
  signinUserValidationSchema,
} from "../validation_schemas/user.schema"

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createUserValidationSchema.parse(req.body)
    data["password"] = bcryptjs.hashSync(data.password, 10)
    const newUser = new User({ ...data })

    await newUser.save()
    res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    if (error instanceof ZodError) {
      // If the error is a ZodError (validation error), extract and format the error details
      const validationError = validationErrorBuilder(error)

      res.status(422).json({ ...validationError })
    } else {
      // If the error is not a ZodError (e.g., database error), pass it to the error handler middleware
      next(error)
    }
  }
}

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = signinUserValidationSchema.parse(req.body)
    const user = await User.findOne({ email })
    if (!user) return next(errorHandler(404, "User not found"))

    const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword) return next(errorHandler(401, "wrong credentials"))

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!)

    // @ts-ignore
    const { password: userPassword, ...rest } = user._doc

    const expiryDate = new Date(Date.now() + 3600000) // 1 hour
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest)
  } catch (error) {
    if (error instanceof ZodError) {
      // If the error is a ZodError (validation error), extract and format the error details
      const validationError = validationErrorBuilder(error)

      res.status(422).json({ ...validationError })
    } else {
      // If the error is not a ZodError (e.g., database error), pass it to the error handler middleware
      next(error)
    }
  }
}
