import createError, { HttpError } from "http-errors";
import express, { Application, NextFunction, Request, Response } from "express";
import path from "path";
import logger from "morgan";
import dotenv from "dotenv";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as authController from "./controllers/auth";

// Initialize configuration
dotenv.config();

// Create Express server
const app: Application = express();

// Express configuration
app.set("port", process.env.PORT || "3500");
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Primary app routes.
app.get("/", homeController.index);
app.post("/login", authController.login);

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
