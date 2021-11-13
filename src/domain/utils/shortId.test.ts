import { MakeShortUrl } from "./shortId";

const littleCode = "8YZfTnxj5";

jest.mock("./validateEnv.ts", () => {
  const EnvVars = {
    NODE_ENV: "development",
    PORT: "5000",
    BASEURL: "https://www.tier.app."
  };
  return {
    EnvVars
  };
});

jest.mock("shortid", () => {
  const generate = () => littleCode;

  return { generate };
});

describe("ShortId tests", () => {
  it("should create the right shortId object", () => {
    const result = MakeShortUrl();

    expect(result).toStrictEqual({
      baseUrl: "https://www.tier.app.",
      urlCode: "8YZfTnxj5"
    });
  });
});
