import { ValidateUrl } from "./validateUrl";

const urlData = {
  href: "https://www.hello.com/howareyou",
  origin: "https://www.hello.com",
  protocol: "https:",
  host: "www.hello.com",
  hostname: "www.hello.com",
  port: "",
  pathname: "/howareyou",
  search: ""
};

describe("ValidateUrl", () => {
  it("should return a valid url", () => {
    const result = ValidateUrl("https://www.hello.com/howareyou");

    expect(result).toStrictEqual(urlData);
  });

  it("should return an error", () => {
    try {
      ValidateUrl("hello.com/howareyou");
    } catch (error) {
      let message = "";

      if (error instanceof Error) {
        message = error.message;
      }

      expect(error).toBeInstanceOf(Error);
      expect(message).toStrictEqual("Invalid URL hello.com/howareyou");

      expect(true).toBeTruthy();
    }
  });
});
