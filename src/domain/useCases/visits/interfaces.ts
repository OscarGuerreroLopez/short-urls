import { Visits } from "../../entities/visits";
import { DatabaseMethodsRepo } from "../../../infra/db/databaseMethods";

export type AddVisit = (visitInfo: Visits) => Promise<Visits>;

export interface MakeAddVisitParams {
  DbMethods: DatabaseMethodsRepo;
}

export interface AddVisitUseCase {
  addVisit: AddVisit;
}

export interface VisitServiceMethods {
  addVisit: AddVisit;
}
