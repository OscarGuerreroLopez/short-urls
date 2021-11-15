import { MakeAddVisitParams, AddVisitUseCase } from "./interfaces";
import { MakeVisit, Visits } from "../../entities/visits";

export const MakeAddVisit = ({
  DbMethods
}: MakeAddVisitParams): AddVisitUseCase => {
  const addVisit = async (visitInfo: Visits): Promise<Visits> => {
    const visit = MakeVisit(visitInfo);

    const visitExists = await DbMethods.findOne<Visits>("visits", {
      url: visit.getUrl()
    });

    if (Object.keys(visitExists).length > 0 && visitExists.url) {
      if (visitExists.visits === undefined || visitExists.visits === null) {
        visitExists.visits = 0;
      } else {
        visitExists.visits = visitExists.visits + 1;
      }
      await DbMethods.updateOne(
        "visits",
        { url: visitExists.url },
        { visits: visitExists.visits }
      );
      return visitExists;
    }

    const visitRecord = {
      id: visit.getId(),
      url: visit.getUrl(),
      longUrl: visit.getLongUrl(),
      visits: visit.getVisits()
    };

    await DbMethods.insert("visits", visitRecord);

    return visitRecord;
  };

  return { addVisit };
};
