import { mockReq, mockRes } from "sinon-express-mock";
import * as winston from "winston";

import { AddUrl } from "./addUrl";

import { UrlService } from "../../domain/useCases/urls";
import { VisitService } from "../../domain/useCases/visits";
import * as ErrorHandler from "../../utils/errorHandler";

jest.mock("../../utils/logger.ts", () => {
  enum Severity {
    INFO = "info",
    WARN = "warn",
    ERROR = "error"
  }
  const Logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ]
  });

  return { Logger, Severity };
});

const uuid = "1c32f955-312a-472d-97d9-69c075445e46";

describe("AddUrl handler", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;
  let body: any;
  let status: any;
  let spyUrlService: jest.Mock<any, any> | jest.SpyInstance<any, any>;
  let spyVisitService: jest.Mock<any, any> | jest.SpyInstance<any, any>;
  let spyErrorHandler: jest.Mock<any, any> | jest.SpyInstance<any, any>;

  beforeEach(() => {
    spyUrlService = jest.fn();
    spyUrlService = jest.spyOn(UrlService, "addUrl");
    spyVisitService = jest.fn();
    spyVisitService = jest.spyOn(VisitService, "addVisit");
    spyErrorHandler = jest.fn();
    spyErrorHandler = jest.spyOn(ErrorHandler, "ErrorHandler");

    const req = {
      body: {
        longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
      },
      code: uuid
    };
    request = mockReq(req);

    response = mockRes({
      send: (data: any) => (body = data),
      status: (data: any) => {
        status = data;
        return response;
      }
    });
  });

  afterEach(() => {
    spyUrlService.mockRestore();
    spyVisitService.mockRestore();
    spyErrorHandler.mockRestore();
  });

  it("should get Short Url, store visit and return 201", async () => {
    spyUrlService.mockImplementation(async () => {
      return {
        id: "eac8d9c7-cc17-4bc9-b7d8-409d473e4305",
        urlCode: "uvwBM5e6W",
        shortUrl: "http://tier.app/8YZfTnxj5",
        longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
      };
    });

    spyVisitService.mockImplementation(async () => {
      return {
        id: "9ff4c713-15bb-4d27-8361-bd9260639a52",
        url: "http://tier.app/8YZfTnxj5",
        visits: 0
      };
    });
    await AddUrl(request, response, next);
    expect(body).toBeDefined();
    expect(spyUrlService).toHaveBeenCalledWith({
      longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
    });
    expect(spyVisitService).toHaveBeenCalledWith({
      url: "http://tier.app/8YZfTnxj5",
      longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
    });
    expect(status).toBe(201);
  });
  it("should throw error if required items not there", async () => {
    spyUrlService.mockImplementation(async () => {
      throw new Error("I don't want to work today");
    });

    await AddUrl(request, response, next);
    expect(status).toBe(500);
    expect(body.message).toStrictEqual("URL cannot be registered, check logs");
    expect(spyErrorHandler).toHaveBeenCalledWith({
      error: Error("I don't want to work today"),
      additionalErrorInfo: {
        severity: "warn",
        identifier: "AddUrl handler",
        code: uuid,
        body: { longUrl: "https://github.com/OscarGuerreroLopez/short-urls" },
        headers: undefined
      }
    });
  });
});
