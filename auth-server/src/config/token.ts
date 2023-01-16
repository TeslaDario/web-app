import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { redisClient } from "./redis";
import * as fs from "fs";

const RSA_PRIVATE_KEY = fs.readFileSync("./auth.private.key");
const RSA_PUBLIC_KEY = fs.readFileSync("./auth.public.key");

export const setToken = (payload: any, expiresIn: string | number): string => {
  return jwt.sign({ payload }, RSA_PRIVATE_KEY, {
    algorithm: "RS256",
    expiresIn,
  });
};

export const getToken = (req: Request) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getToken(req);
  if (token == null) return res.sendStatus(401);

  // check token in deny list
  const inDenyList = await redisClient.get(
    `${process.env.REDIS_TOKEN_PREFIX}${token}`
  );
  if (inDenyList) return res.sendStatus(403);

  // proced forward to validate token and attach jwt data to req
  // { payload: string, iat: number, exp: number }
  jwt.verify(token, RSA_PUBLIC_KEY, (error: any, decoded: any) => {
    console.log(decoded, new Date(), token);
    if (error) return res.sendStatus(403);

    req.userId = decoded.payload;
    req.tokenExp = +new Date(decoded.exp * 1000);
    req.token = token;

    next();
  });
};

export const invalidateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, tokenExp } = req;

  try {
    const token_key = `${process.env.REDIS_TOKEN_PREFIX}${token}`;
    await redisClient.set(token_key, token);
    console.log(req.tokenExp);
    // todo: fix server date for expire
    // redisClient.expireAt(token_key, new Date(tokenExp));
    // Calculate the days until the JWT expires to set the Authorization Cookie expiry accordingly.
    // const msUntilExpiry: number = timestamp * 1000 - Date.now();
    // const daysUntilExpiry: number = msUntilExpiry / 1000 / 60 / 60 / 24;
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};
