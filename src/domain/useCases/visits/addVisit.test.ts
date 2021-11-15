import { DatabaseMethods } from "../../../infra/db/databaseMethods";

import { MakeAddVisit } from "./addVisit";

// import { VisitServiceMethods } from "./interfaces";
import { DbAdapter } from "../../../infra/db/db";

jest.mock("../../../utils/validateEnv.ts", () => {
  const EnvVars = {
    NODE_ENV: "development",
    PORT: "5000",
    BASEURL: "tier.app."
  };
  return {
    EnvVars
  };
});

const uuid = "1c32f955-312a-472d-97d9-69c075445e46";

jest.mock("../../utils/id.ts", () => {
  const Id = {
    makeId: () => uuid,
    isValidId: () => {
      return true;
    }
  };
  return { Id };
});

const littleCode = "8YZfTnxj5";

jest.mock("shortid", () => {
  const generate = () => littleCode;

  return { generate };
});

const database: Database = DbAdapter();
const DbMethods = DatabaseMethods(database);

const { addVisit } = MakeAddVisit({ DbMethods });

describe("Testing Visits UseCase", () => {
  let spyDatabaseMethodsFindOne:
    | jest.Mock<any, any>
    | jest.SpyInstance<any, any>;

  let spyDatabaseMethodsInsert:
    | jest.Mock<any, any>
    | jest.SpyInstance<any, any>;

  let spyDatabaseMethodsUpdateOne:
    | jest.Mock<any, any>
    | jest.SpyInstance<any, any>;

  beforeEach(() => {
    spyDatabaseMethodsFindOne = jest.fn();
    spyDatabaseMethodsFindOne = jest.spyOn(DbMethods, "findOne");
    spyDatabaseMethodsInsert = jest.fn();
    spyDatabaseMethodsInsert = jest.spyOn(DbMethods, "insert");
    spyDatabaseMethodsUpdateOne = jest.fn();
    spyDatabaseMethodsUpdateOne = jest.spyOn(DbMethods, "updateOne");
  });

  afterEach(() => {
    spyDatabaseMethodsFindOne.mockRestore();
    spyDatabaseMethodsInsert.mockRestore();
    spyDatabaseMethodsUpdateOne.mockRestore();
  });
  it("should return the new visit entity", async () => {
    spyDatabaseMethodsFindOne.mockResolvedValueOnce({});
    spyDatabaseMethodsInsert.mockImplementation(() => {
      return true;
    });
    const result = await addVisit({ url: "tier.app.8YZfTnxj5" });
    expect(spyDatabaseMethodsInsert).toHaveBeenCalledWith("visits", {
      id: "1c32f955-312a-472d-97d9-69c075445e46",
      url: "tier.app.8YZfTnxj5",
      visits: 0
    });

    expect(result).toStrictEqual({
      id: "1c32f955-312a-472d-97d9-69c075445e46",
      url: "tier.app.8YZfTnxj5",
      visits: 0
    });
  });

  it("should return the updated visit entity", async () => {
    spyDatabaseMethodsFindOne.mockResolvedValueOnce({
      id: "1c32f955-312a-472d-97d9-69c075445e46",
      url: "tier.app.8YZfTnxj5",
      visits: 2
    });

    spyDatabaseMethodsUpdateOne.mockImplementation(() => {
      return {
        id: "1c32f955-312a-472d-97d9-69c075445e46",
        url: "tier.app.8YZfTnxj5",
        visits: 3
      };
    });

    const result = await addVisit({ url: "tier.app.8YZfTnxj5" });

    expect(spyDatabaseMethodsUpdateOne).toHaveBeenCalledWith(
      "visits",
      { url: "tier.app.8YZfTnxj5" },
      { visits: 3 }
    );

    expect(result).toStrictEqual({
      id: "1c32f955-312a-472d-97d9-69c075445e46",
      url: "tier.app.8YZfTnxj5",
      visits: 3
    });
  });

  it("should return the updated visit entity with zero visits if undefined", async () => {
    spyDatabaseMethodsFindOne.mockResolvedValueOnce({
      id: "1c32f955-312a-472d-97d9-69c075445e46",
      url: "tier.app.8YZfTnxj5",
      visits: undefined
    });

    spyDatabaseMethodsUpdateOne.mockImplementation(() => {
      return {
        id: "1c32f955-312a-472d-97d9-69c075445e46",
        url: "tier.app.8YZfTnxj5",
        visits: 0
      };
    });

    const result = await addVisit({ url: "tier.app.8YZfTnxj5" });

    expect(spyDatabaseMethodsUpdateOne).toHaveBeenCalledWith(
      "visits",
      { url: "tier.app.8YZfTnxj5" },
      { visits: 0 }
    );

    expect(result).toStrictEqual({
      id: "1c32f955-312a-472d-97d9-69c075445e46",
      url: "tier.app.8YZfTnxj5",
      visits: 0
    });
  });
});
