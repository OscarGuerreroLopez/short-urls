import {
  Url,
  UrlEntity,
  BuildMakeUrl as BuildMakeUrlObject,
  BuildMakeUrlParams
} from "./interfaces";

export const BuildMakeUrl = (
  buildMakeUrl: BuildMakeUrlParams
): BuildMakeUrlObject => {
  const makeUrl = (url: Url): UrlEntity => {
    const { Id, ValidateUrl, MakeShortUrl } = buildMakeUrl;

    if (!url.id) {
      url.id = Id.makeId();
    } else {
      if (!Id.isValidId(url.id)) {
        throw Error("Invalid url ID");
      }
    }

    url.longUrl = ValidateUrl(url.longUrl).href;

    const shortUrl = MakeShortUrl();

    if (!url.urlCode) {
      url.urlCode = shortUrl.urlCode;
    }

    if (!url.shortUrl) {
      url.shortUrl = ValidateUrl(`${shortUrl.baseUrl}${shortUrl.urlCode}`).href;
    }

    return Object.freeze({
      getId: () => url.id || "",
      getUrlCode: () => url.urlCode || "",
      getShortUrl: () => url.shortUrl || "",
      getLongUrl: () => url.longUrl
    });
  };

  return { makeUrl };
};
