import { Url } from "../../entities/urls";
import { DatabaseMethodsRepo } from "../../../infra/db/databaseMethods";

export type AddUrl = (urlInfo: Url) => Promise<string>;

export interface MakeAddUrlParams {
  DbMethods: DatabaseMethodsRepo;
}

export interface AddUrlUseCase {
  addUrl: AddUrl;
}

export interface UrlServiceMethods {
  addUrl: AddUrl;
}
