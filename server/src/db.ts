import mongoose from "mongoose"
import { MONGO_URL } from "./config"

export const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false)
    const db = await mongoose.connect(MONGO_URL)
    console.log("Database connected to ", db.connection.db.databaseName)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      process.exit(1)
    }
  }
}
