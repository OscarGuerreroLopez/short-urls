import {
  VisitsEntity,
  Visits,
  BuildMakeVisits as BuildMakeVisitsObject,
  BuildVisitsParams
} from "./interfaces";

export const BuildMakeVisits = (
  buildMakeVisits: BuildVisitsParams
): BuildMakeVisitsObject => {
  const makeVisits = (visitParams: Visits): VisitsEntity => {
    const { Id } = buildMakeVisits;

    if (!visitParams.id) {
      visitParams.id = Id.makeId();
    } else {
      if (!Id.isValidId(visitParams.id)) {
        throw new Error("Invalid visitParams ID");
      }
    }

    const isValidUrlId = Id.isValidId(visitParams.url);

    if (!isValidUrlId) {
      throw new Error("invalid urlId");
    }

    return Object.freeze({
      getId: () => visitParams.id || "",
      getUrl: () => visitParams.url,
      getVisits: () => visitParams.visits || 0
    });
  };

  return { makeVisits };
};
