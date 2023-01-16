import createError, { HttpError } from "http-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";
import { redisInit } from "./config/redis";

// Route handlers
import AuthRouter from "./routes/auth";

// Initialize configuration
dotenv.config();
// Initialize redis
redisInit();

// Create Express server
const app: Application = express();

// Express configuration
app.set("port", process.env.PORT || "3500");
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "/public", "app")));

const handleStaticPage = (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, "/public/app/index.html"));

// Primary app routes
app.use("/auth", AuthRouter);
app.get("/*", handleStaticPage);

// Catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// Error handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // render the error page
  res.status(err.status || 500);
  // todo create error page
  res.send(err);
});

export default app;
