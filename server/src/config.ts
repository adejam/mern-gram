import { config } from "dotenv"

config()

export const PORT = parseInt(process.env.PORT || "") || 6001
export const MONGO_URL = process.env.MONGO_URL! || "mongodb://localhost:27017"
