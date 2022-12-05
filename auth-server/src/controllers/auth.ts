import { Request, Response } from "express";
import * as fs from "fs";
import * as jwt from "jsonwebtoken";

const RSA_PRIVATE_KEY = fs.readFileSync("./auth.key");

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (validateEmailAndPassword(email, password)) {
    const userId = findUserIdForEmail(email);

    const token = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 120,
      subject: userId,
    });

    // send the JWT back to the user
    res.status(200).json({ token, expiresIn: 120 });
  } else {
    // send status 401 Unauthorized
    res.sendStatus(401);
  }
};

function validateEmailAndPassword(email: string, password: string): boolean {
  // todo: check email and password in db
  return true;
}
function findUserIdForEmail(email: string): string {
  // todo: get userId from db for this email
  return "dado_dsa";
}
