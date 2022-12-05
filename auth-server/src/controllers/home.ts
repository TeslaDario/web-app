import { Request, Response } from "express";

/**
 * Home page.
 * @route GET /
 */
export const index = (req: Request, res: Response) => {
  //   res.render("home", {
  //     title: "Home",
  //   });
  // todo create index login page
  res.send("index - todo create index login page");
};
