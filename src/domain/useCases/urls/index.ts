import { UrlServiceMethods } from "./interfaces";
import { MakeAddUrl } from "./addUrl";
import { MakeFindUrl } from "./findUrl";

import { DbMethods } from "../../../infra/db";

const { addUrl } = MakeAddUrl({ DbMethods });
const { findUrl } = MakeFindUrl({ DbMethods });

export const UrlService: Readonly<UrlServiceMethods> = {
  addUrl,
  findUrl
};
