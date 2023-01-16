import { Router } from "express";
import * as authController from "../controllers/auth";
import { authenticateToken, invalidateToken } from "../config/token";

const AuthRouter: Router = Router();

AuthRouter.route("/login").post(authController.login);
AuthRouter.route("/logout").post(
  authenticateToken,
  invalidateToken,
  authController.logout
);

export default AuthRouter;
