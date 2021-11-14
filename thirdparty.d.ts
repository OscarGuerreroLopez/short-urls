declare namespace Express {
  export interface Request {
    code: string;
    limit: number;
    skip: number;
    sort?: { [key: string]: unknown };
    where?: { [key: string]: unknown };
    user: IObjectLiteral;
  }
}
