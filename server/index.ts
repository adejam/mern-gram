import app from "./src/app"
import { PORT } from "./src/config"
import { dbConnect } from "./src/db"
import userRoutes from "./src/routes/user.route"
import authRoutes from "./src/routes/auth.route"

app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)

dbConnect()
app.listen(PORT as number)
console.log("Server is running on port 3000")
