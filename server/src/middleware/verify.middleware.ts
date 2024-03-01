import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

// Define a custom interface that extends Request
export interface AuthenticatedRequest extends Request {
  user?: any
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unthenticated user!",
      data: null,
    })
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (err: jwt.VerifyErrors | null, user: any) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Token is not valid!",
          data: null,
        })
      }
      req.user = user
      next()
    }
  )
}
