import express, { NextFunction, Request, Response } from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import path from "path"
import { ICustomError } from "./utils/error"

const app = express()
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

app.use(morgan("dev"))
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(bodyParser.json({ limit: "30mb" }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use(cookieParser())

app.use(
  (err: ICustomError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err?.statusCode || 500
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    })
  }
)

export default app
