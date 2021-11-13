import { BuildMakeUrl } from "./url";

import { Id, ValidateUrl, MakeShortUrl } from "../../utils";

export const MakeUrl = BuildMakeUrl({ Id, ValidateUrl, MakeShortUrl }).makeUrl;

export * from "./interfaces";
