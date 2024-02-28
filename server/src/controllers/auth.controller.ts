import { errorHandler } from "./../utils/error"
import bcryptjs from "bcryptjs"
import { NextFunction, Request, Response } from "express"
import User from "../models/user.model"
import {
  validationErrorBuilder,
  ZodError,
} from "../utils/validationErrorBuilder"
import { createUserValidationSchema } from "../validation_schemas/user.schema"

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
