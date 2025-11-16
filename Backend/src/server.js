import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import { ENV } from "./lib/env.js";
import connectDB from "./config/db.config.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import './config/redis.config.js';
import { connectRabbitMQ } from "./rabbitmq/producer.js";

const app = express();
const PORT = ENV.PORT;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/health", (req, res) => {
  res.send("Hello, World!");
});

// Import and use your routes
app.use("/api/v1", authRouter);

app.listen(PORT, "0.0.0.0", async () => {
  await connectDB();
  await connectRabbitMQ();
  console.log(`Server is running on port ${PORT}`);
});

export default app;