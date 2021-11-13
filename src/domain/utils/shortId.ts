import shortid from "shortid";

import { EnvVars } from "./validateEnv";

export interface ShortUrl {
  baseUrl: string;
  urlCode: string;
}

export const MakeShortUrl = (): ShortUrl => {
  const urlCode = shortid.generate();

  return { baseUrl: EnvVars.BASEURL, urlCode };
};
