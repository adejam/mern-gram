import app from "./src/app"
import { PORT } from "./src/config"
import { dbConnect } from "./src/db"
import userRoutes from "./src/routes/user.route"

// dotenv.config()

/* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets")
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   },
// })
// const upload = multer({ storage })

app.use("/api/user", userRoutes)

dbConnect()
app.listen(PORT as number)
console.log("Server is running on port 3000")
