import { ZodError } from "zod"
import { errorHandler } from "./error"

type Props = {
  error: ZodError<any>
}

const validationErrorBuilder = (error: ZodError<any>, statusCode = 422) => {
  const errors = error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }))

  return {
    errors,
    ...errorHandler(statusCode, "A validation error occured").error,
  }
}

export { validationErrorBuilder, ZodError }
