import { userDataWithoutPassword } from "./../helpers/user.helper"
import { Request, Response } from "express"
import { getUserFromToken } from "../helpers/user.helper"
import User from "../models/user.model"
import { CustomError } from "../utils/CustomError"
import { ICustomError } from "../utils/error"
import { createUserValidationSchema } from "../validation_schemas/user.schema"
import { AuthenticatedRequest } from "../middleware/verify.middleware"
import {
  validationErrorBuilder,
  ZodError,
} from "../utils/validationErrorBuilder"

export const fetchAuthUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.access_token
    const data = getUserFromToken(token) as unknown as { id: string }

    if (!data.id) {
      throw new CustomError("You are not authenticated!", 401)
    }

    const user = await User.findById(data.id)
    const userWithoutPassword = userDataWithoutPassword(user)

    res.status(200).json({
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

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user.id !== req.params.id) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user!",
      data: null,
    })
  }

  try {
    const { username, firstName, lastName } = createUserValidationSchema
      .partial()
      .parse(req.body)

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          firstName,
          lastName,
        },
      },
      { new: true }
    )

    if (updatedUser) {
      const data = userDataWithoutPassword(updatedUser)
      res
        .status(200)
        .json({ success: true, message: "User successfully updated", data })
    }
  } catch (error) {
    if (error instanceof ZodError) {
      // If the error is a ZodError (validation error), extract and format the error details
      const validationError = validationErrorBuilder(error)

      res.status(validationError.statusCode || 422).json({ ...validationError })
    } else {
      // If the error is not a ZodError (e.g., database error), pass it to the error handler middleware
      const customError = error as unknown as ICustomError
      res
        .status(customError.statusCode || 500)
        .json({ success: false, message: customError.message, data: null })
    }
  }
}
