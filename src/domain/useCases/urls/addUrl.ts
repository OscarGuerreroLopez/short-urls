import { MakeAddUrlParams, AddUrlUseCase } from "./interfaces";
import { MakeUrl, Url } from "../../entities/urls";

export const MakeAddUrl = ({ DbMethods }: MakeAddUrlParams): AddUrlUseCase => {
  const addUrl = async (urlInfo: Url): Promise<boolean> => {
    const url = MakeUrl(urlInfo);

    const urlExists = await DbMethods.findOne<Url>("urls", { longUrl: url });

    if (Object.keys(urlExists).length > 0) {
      throw new Error(`URL ${url} already exists`);
    }

    const addUrlToDatabase = await DbMethods.insert("urls", {
      id: url.getId(),
      urlCode: url.getUrlCode(),
      shortUrl: url.getShortUrl(),
      longUrl: url.getLongUrl()
    });

    return addUrlToDatabase;
  };

  return { addUrl };
};
