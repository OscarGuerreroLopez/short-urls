import { MakeListVisitParams, ListVisitUseCase } from "./interfaces";
import { Visits } from "../../entities/visits";

export const MakeListVisit = ({
  DbMethods
}: MakeListVisitParams): ListVisitUseCase => {
  const listVisits = async (url: string): Promise<Visits> => {
    const result = await DbMethods.findOne<Visits>("visits", { url });

    return result;
  };

  return { listVisits };
};
