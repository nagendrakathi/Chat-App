import express from "express"
import cookieParser from "cookie-parser"
import env from "dotenv"
import authRoutes from "./routes/auth.route.js"
import {connectDB} from "./config/db.js"
import messageRoutes from "./routes/message.route.js"

env.config()
const app=express()
const PORT=process.env.PORT

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/message",messageRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})