import { VisitServiceMethods } from "./interfaces";
import { MakeAddVisit } from "./addVisit";
import { MakeListVisit } from "./listVisits";
import { DbMethods } from "../../../infra/db";

const { addVisit } = MakeAddVisit({ DbMethods });
const { listVisits } = MakeListVisit({ DbMethods });

export const VisitService: Readonly<VisitServiceMethods> = {
  addVisit,
  listVisits
};
