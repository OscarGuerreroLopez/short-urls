import { MakeAddUrlParams, AddUrlUseCase } from "./interfaces";
import { MakeUrl, Url } from "../../entities/urls";

export const MakeAddUrl = ({ DbMethods }: MakeAddUrlParams): AddUrlUseCase => {
  const addUrl = async (urlInfo: Url): Promise<string> => {
    const url = MakeUrl(urlInfo);

    const urlExists = await DbMethods.findOne<Url>("urls", {
      longUrl: url.getLongUrl()
    });

    if (Object.keys(urlExists).length > 0 && urlExists.shortUrl) {
      return urlExists.shortUrl;
    }

    const urlRecord = {
      id: url.getId(),
      urlCode: url.getUrlCode(),
      shortUrl: url.getShortUrl(),
      longUrl: url.getLongUrl()
    };

    await DbMethods.insert("urls", urlRecord);

    return urlRecord.shortUrl;
  };

  return { addUrl };
};
