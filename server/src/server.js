import express from "express";
import cookieParser from "cookie-parser";
import env from "dotenv";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import messageRoutes from "./routes/message.route.js";
import { app, io, server } from "./config/socket.js";
io;

env.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
