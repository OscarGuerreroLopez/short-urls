import { Visits } from "../../entities/visits";
import { DatabaseMethodsRepo } from "../../../infra/db/databaseMethods";

export type AddVisit = (visitInfo: Visits) => Promise<Visits>;
export type ListVisits = (url: string) => Promise<Visits>;

export interface MakeAddVisitParams {
  DbMethods: DatabaseMethodsRepo;
}

export interface MakeListVisitParams {
  DbMethods: DatabaseMethodsRepo;
}

export interface AddVisitUseCase {
  addVisit: AddVisit;
}

export interface ListVisitUseCase {
  listVisits: ListVisits;
}

export interface VisitServiceMethods {
  addVisit: AddVisit;
  listVisits: ListVisits;
}
