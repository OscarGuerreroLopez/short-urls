import { ID } from "../../utils";

export interface Visits {
  id?: string;
  urlId: string;
  visits?: number;
}

export interface VisitsEntity {
  getId: () => string;
  getUrlId: () => string;
  getVisits: () => number;
}

export interface BuildVisitsParams {
  Id: ID;
}

export type MakeVisits = (visitParams: Visits) => VisitsEntity;

export interface BuildMakeVisits {
  makeVisits: MakeVisits;
}
