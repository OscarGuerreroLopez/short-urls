import { MakeAddUrlParams, AddUrlUseCase } from "./interfaces";
import { MakeUrl, Url } from "../../entities/urls";

export const MakeAddUrl = ({ DbMethods }: MakeAddUrlParams): AddUrlUseCase => {
  const addUrl = async (urlInfo: Url): Promise<boolean> => {
    const url = MakeUrl(urlInfo);

    const urlExists = await DbMethods.findOne<Url>("urls", {
      longUrl: url.getLongUrl()
    });

    if (Object.keys(urlExists).length > 0) {
      throw new Error(`URL ${url.getLongUrl()} already exists`);
    }

    const urlRecord = {
      id: url.getId(),
      urlCode: url.getUrlCode(),
      shortUrl: url.getShortUrl(),
      longUrl: url.getLongUrl()
    };

    const addUrlToDatabase = await DbMethods.insert("urls", urlRecord);

    return addUrlToDatabase;
  };

  return { addUrl };
};
