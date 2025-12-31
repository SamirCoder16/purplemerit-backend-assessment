import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import { ENV } from "./lib/env.js";
import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import "./config/redis.config.js";

const app = express();
const PORT = ENV.PORT;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://codecraft-fs-01-frontend.vercel.app",
      "https://codecraft-fs-01-frontend-h1nq3ytdl-samirs-projects-0679fa8b.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
  })
);
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for vercel db connect
await connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/health", (req, res) => {
  res.send("Hello, World!");
});

// Import and use your routes
app.use("/api/v1", authRouter);

if (ENV.NODE_ENV === "developement") {
  app.listen(PORT, "0.0.0.0", async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
