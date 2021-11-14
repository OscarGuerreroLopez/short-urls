import { MakeVisit } from "./index";
import { Id } from "../../utils";

const urlId = "1c32f955-312a-472d-97d9-69c075445e46";
const uuid = "89c860a0-d44b-4806-9234-479f867e3618";

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

describe("Visits test", () => {
  let spyIsValidId:
    | jest.Mock<any, any>
    | jest.SpyInstance<boolean, [uuid: string]>;
  let spyMakeId: jest.Mock<any, any> | jest.SpyInstance<any, any>;

  beforeAll(() => {
    spyIsValidId = jest.fn();
    spyIsValidId = jest.spyOn(Id, "isValidId");
    spyMakeId = jest.fn();
    spyMakeId = jest.spyOn(Id, "makeId");
  });

  afterEach(() => {
    spyIsValidId.mockRestore();
    spyMakeId.mockRestore();
  });

  it("should return the right entity", () => {
    spyIsValidId.mockReturnValueOnce(true);
    spyMakeId.mockReturnValueOnce(uuid);

    const result = MakeVisit({ url: urlId });

    expect(spyMakeId).toHaveBeenCalledTimes(1);
    expect(result.getId()).toStrictEqual(uuid);
    expect(result.getUrl()).toStrictEqual(urlId);
    expect(result.getVisits()).toStrictEqual(0);
  });

  it("should return an error", () => {
    spyIsValidId.mockReturnValueOnce(false);
    spyMakeId.mockReturnValueOnce(uuid);

    try {
      MakeVisit({ url: urlId });
    } catch (error) {
      let message = "";

      if (error instanceof Error) {
        message = error.message;
      }

      expect(error).toBeInstanceOf(Error);
      expect(message).toStrictEqual("invalid urlId");
    }
  });
});
