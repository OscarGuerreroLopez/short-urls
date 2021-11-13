export {};

declare global {
  interface EnvObject {
    PORT: number;
    NODE_ENV: string;
    BASEURL: string;
  }

  type IObjectLiteral = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };

  type Database = {
    collection: (collection: string) => IObjectLiteral;
  };
}
