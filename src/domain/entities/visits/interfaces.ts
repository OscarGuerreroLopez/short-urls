import { ID } from "../../utils";

export interface Visits {
  id?: string;
  url: string;
  longUrl?: string;
  visits?: number;
}

export interface VisitsEntity {
  getId: () => string;
  getUrl: () => string;
  getLongUrl: () => string;
  getVisits: () => number;
}

export interface BuildVisitsParams {
  Id: ID;
}

export type MakeVisits = (visitParams: Visits) => VisitsEntity;

export interface BuildMakeVisits {
  makeVisits: MakeVisits;
}
