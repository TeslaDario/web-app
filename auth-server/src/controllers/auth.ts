import { Request, Response } from "express";
import { setToken } from "../config/token";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // send status 401 Unauthorized
  if (!validateEmailAndPassword(email, password)) {
    res.sendStatus(401);
    return;
  }

  const userId = findUserIdForEmail(email);
  const expiresIn = 60_000; //2 * 60 * 60 * 1000; // 2h
  const token = setToken(userId, expiresIn);

  // send the JWT back to the user
  res.status(200).json({ token, expiresIn });
};

export const logout = (req: Request, res: Response) => res.status(200).json();

function validateEmailAndPassword(email: string, password: string): boolean {
  // todo: check email and password in db
  return (
    (email === "dado.dsa@gmail.com" && password === "password") ||
    (email === "dario.d" && password === "cuteM@rc22")
  );
  // return true;
}
function findUserIdForEmail(email: string): string {
  // todo: get userId from db for this email
  return "dario.d";
}
