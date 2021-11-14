import { VisitServiceMethods } from "./interfaces";
import { MakeAddVisit } from "./addVisit";
import { DbMethods } from "../../../infra/db";

const { addVisit } = MakeAddVisit({ DbMethods });

export const VisitService: Readonly<VisitServiceMethods> = {
  addVisit
};
