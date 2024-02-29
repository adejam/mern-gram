export interface ICustomError extends Error {
  statusCode: number
}

export const errorHandler = (statusCode: number, message: string) => {
  const newError = new Error()
  newError.message = message
  const error: ICustomError = { ...newError, statusCode }
  return { error }
}
