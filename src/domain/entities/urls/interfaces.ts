import { ID, UrlCheck, ShortUrl } from "../../utils";

export interface Url {
  id?: string;
  urlCode?: string;
  shortUrl?: string;
  longUrl: string;
}

export interface UrlEntity {
  getId: () => string;
  getUrlCode: () => string;
  getShortUrl: () => string;
  getLongUrl: () => string;
}

export interface BuildMakeUrlParams {
  Id: ID;
  ValidateUrl: (url: string) => UrlCheck;
  MakeShortUrl: () => ShortUrl;
}

export type MakeUrl = (url: Url) => UrlEntity;

export interface BuildMakeUrl {
  makeUrl: MakeUrl;
}
