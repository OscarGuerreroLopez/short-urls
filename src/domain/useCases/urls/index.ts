import { UrlServiceMethods } from "./interfaces";
import { MakeAddUrl } from "./addUrl";

import { DbMethods } from "../../../infra/db";

const { addUrl } = MakeAddUrl({ DbMethods });

export const UrlService: Readonly<UrlServiceMethods> = {
  addUrl
};
