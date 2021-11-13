import { MakeUrl } from "./index";

jest.mock("../../utils/validateEnv.ts", () => {
  const EnvVars = {
    NODE_ENV: "development",
    PORT: "5000",
    BASEURL: "https://www.tier.app."
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

describe("Testing url entity", () => {
  it("should return the right entity", () => {
    const url = MakeUrl({
      longUrl: "https://www.hello.com/howareyou"
    });
    expect(url.getUrlCode()).toStrictEqual(littleCode);
    expect(url.getId()).toStrictEqual(uuid);
    expect(url.getShortUrl()).toStrictEqual("https://www.tier.app.8yzftnxj5/");
    expect(url.getLongUrl()).toStrictEqual("https://www.hello.com/howareyou");
  });

  it("should return error", () => {
    try {
      MakeUrl({
        longUrl: "hello.com/howareyou"
      });
    } catch (error) {
      let message = "";

      if (error instanceof Error) {
        message = error.message;
      }

      expect(error).toBeInstanceOf(Error);
      expect(message).toStrictEqual("Invalid URL hello.com/howareyou");
    }
  });
});
