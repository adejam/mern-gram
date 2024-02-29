export interface CustomError extends Error {
  statusCode: number
}

export const errorHandler = (statusCode: number, message: string) => {
  const newError = new Error()
  newError.message = message
  const error: CustomError = { ...newError, statusCode }
  return { error }
}
