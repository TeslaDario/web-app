import { Request, Response } from "express";
import path from "path";

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  //   res.render("home", {
  //     title: "Home",
  //   });
  // todo create index login page
  // res.send("index - todo create index login page");
  console.log(path.normalize(__dirname + "/../"));
  res.sendFile(path.normalize(__dirname + "/../"));
};
