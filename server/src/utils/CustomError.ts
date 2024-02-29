class CustomError extends Error {
  public statusCode = 500
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export { CustomError }
