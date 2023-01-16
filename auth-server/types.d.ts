declare namespace Express {
  export interface Request {
    userId: string;
    token: string;
    tokenExp: number;
  }
  //   export interface Response {
  //     user: any;
  //   }
}
