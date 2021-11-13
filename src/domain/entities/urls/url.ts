import {
  Url,
  UrlEntity,
  BuildMakeUrl as BuildMakeUrlObject,
  BuildMakeUrlParams
} from "./interfaces";

export const BuildMakeUrl = (
  buildMakeUrl: BuildMakeUrlParams
): BuildMakeUrlObject => {
  const makeUrl = (url: Url): Readonly<UrlEntity> => {
    const { Id, ValidateUrl, MakeShortUrl } = buildMakeUrl;

    if (!url.id) {
      url.id = Id.makeId();
    } else {
      if (!Id.isValidId(url.id)) {
        throw new Error("Invalid url ID");
      }
    }

    url.longUrl = ValidateUrl(url.longUrl).href;

    if (!url.urlCode || !url.shortUrl) {
      const shortUrl = MakeShortUrl();

      url.urlCode = shortUrl.urlCode;

      url.shortUrl = `${shortUrl.baseUrl}${shortUrl.urlCode}`;
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
