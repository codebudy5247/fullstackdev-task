import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
import morgan from "morgan";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import AuthRouter from "./routes/auth";
import DoctorRouter from "./routes/doctor"

const port = process.env.PORT || 1337;
const app = express();

// Middleware
// Body Parser
app.use(express.json({ limit: "10kb" }));

// Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Cors
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/doctor", DoctorRouter);
// Healthcheck
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    message: "API is Up && Running 🚀🚀🚀",
  });
});

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.listen(port, () => {
  console.log(`🚀 Server started on port: ${port}`);
});
