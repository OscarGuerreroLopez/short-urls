import { Url } from "../../entities/urls";
import { DatabaseMethodsRepo } from "../../../infra/db/databaseMethods";

export type AddUrl = (urlInfo: Url) => Promise<Url>;
export type FindUrl = (code: string) => Promise<Url>;

export interface MakeAddUrlParams {
  DbMethods: DatabaseMethodsRepo;
}

export interface MakeFindUrlParams {
  DbMethods: DatabaseMethodsRepo;
}

export interface AddUrlUseCase {
  addUrl: AddUrl;
}

export interface FindUrlUseCase {
  findUrl: FindUrl;
}

export interface UrlServiceMethods {
  addUrl: AddUrl;
  findUrl: FindUrl;
}
