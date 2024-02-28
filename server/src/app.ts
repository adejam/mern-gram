import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import path from "path"

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

export default app
