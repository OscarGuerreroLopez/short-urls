import { DatabaseMethods } from "../../../infra/db/databaseMethods";
import { MakeAddUrl } from "./addUrl";

import { UrlServiceMethods } from "./interfaces";
import { DbAdapter } from "../../../infra/db/db";

jest.mock("../../utils/validateEnv.ts", () => {
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

const { addUrl } = MakeAddUrl({ DbMethods });

export const UrlService: Readonly<UrlServiceMethods> = {
  addUrl
};

describe("addUrl usecase test", () => {
  let spyDatabaseMethodsFindOne:
    | jest.Mock<any, any>
    | jest.SpyInstance<any, any>;

  let spyDatabaseMethodsInsert:
    | jest.Mock<any, any>
    | jest.SpyInstance<any, any>;

  beforeEach(() => {
    spyDatabaseMethodsFindOne = jest.fn();
    spyDatabaseMethodsFindOne = jest.spyOn(DbMethods, "findOne");
    spyDatabaseMethodsInsert = jest.fn();
    spyDatabaseMethodsInsert = jest.spyOn(DbMethods, "insert");
  });

  afterEach(() => {
    spyDatabaseMethodsFindOne.mockRestore();
    spyDatabaseMethodsInsert.mockRestore();
  });
  it("should add a url to the database", async () => {
    spyDatabaseMethodsFindOne.mockResolvedValueOnce({});
    spyDatabaseMethodsInsert.mockImplementation(() => {
      return true;
    });
    const result = await addUrl({
      longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
    });

    expect(spyDatabaseMethodsInsert).toHaveBeenCalledWith("urls", {
      id: "1c32f955-312a-472d-97d9-69c075445e46",
      longUrl: "https://github.com/OscarGuerreroLopez/short-urls",
      shortUrl: "tier.app.8YZfTnxj5",
      urlCode: "8YZfTnxj5"
    });

    expect(result).toStrictEqual("tier.app.8YZfTnxj5");
  });

  it("should return a short url cause it already exixts", async () => {
    spyDatabaseMethodsFindOne.mockReturnValueOnce({
      id: "1c32f955-312a-472d-97d9-69c075445e46",
      longUrl: "https://github.com/OscarGuerreroLopez/short-urls",
      shortUrl: "tier.app.8YZfTnxj5",
      urlCode: "8YZfTnxj5"
    });

    const result = await addUrl({
      longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
    });

    expect(result).toStrictEqual("tier.app.8YZfTnxj5");

    expect(spyDatabaseMethodsInsert).not.toHaveBeenCalled();
  });
});
