import { MakeFindUrlParams, FindUrlUseCase } from "./interfaces";
import { Url } from "../../entities/urls";

export const MakeFindUrl = ({
  DbMethods
}: MakeFindUrlParams): FindUrlUseCase => {
  const findUrl = async (code: string): Promise<Url> => {
    const result = await DbMethods.findOne<Url>("urls", {
      urlCode: code
    });

    if (Object.keys(result).length === 0) {
      throw new Error(`code ${code} not found in urls`);
    }

    return result;
  };

  return { findUrl };
};
