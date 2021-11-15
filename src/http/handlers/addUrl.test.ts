import { mockReq, mockRes } from "sinon-express-mock";

import { AddUrl } from "./addUrl";

import { UrlService } from "../../domain/useCases/urls";
import { VisitService } from "../../domain/useCases/visits";

describe("AddUrl handler", () => {
  const next = () => null;
  let request: ReturnType<typeof mockReq>;
  let response: ReturnType<typeof mockRes>;
  let body: any;
  let status: any;
  let spyUrlService: jest.Mock<any, any> | jest.SpyInstance<any, any>;

  let spyVisitService: jest.Mock<any, any> | jest.SpyInstance<any, any>;

  beforeEach(() => {
    spyUrlService = jest.fn();
    spyUrlService = jest.spyOn(UrlService, "addUrl");
    spyVisitService = jest.fn();
    spyVisitService = jest.spyOn(VisitService, "addVisit");

    // const req = {
    //   body: {
    //     longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
    //   }
    // };
    // request = mockReq(req);
    // response = mockRes({
    //   send: (data: any) => (body = data),
    //   status: (data: any) => {
    //     status = data;
    //     return response;
    //   }
    // });
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
  });

  it("should get Short Url, store visit and return 201", async () => {
    const req = {
      body: {
        longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
      }
    };
    request = mockReq(req);

    spyUrlService.mockImplementation(async () => {
      return {
        id: "eac8d9c7-cc17-4bc9-b7d8-409d473e4305",
        urlCode: "uvwBM5e6W",
        shortUrl: "tier.app.uvwBM5e6W",
        longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
      };
    });

    spyVisitService.mockImplementation(async () => {
      return {
        id: "9ff4c713-15bb-4d27-8361-bd9260639a52",
        url: "https://github.com/OscarGuerreroLopez/short-urls",
        visits: 0
      };
    });
    await AddUrl(request, response, next);
    expect(body).toBeDefined();
    expect(spyUrlService).toHaveBeenCalledWith({
      longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
    });
    expect(spyVisitService).toHaveBeenCalledWith({
      url: "https://github.com/OscarGuerreroLopez/short-urls"
    });
    expect(status).toBe(201);
  });
  it("should throw error if required items not there", async () => {
    const req = {
      body: {
        longUrl: "https://github.com/OscarGuerreroLopez/short-urls"
      }
    };
    request = mockReq(req);
    spyUrlService.mockImplementation(async () => {
      throw new Error("I don't want to work today");
    });

    await AddUrl(request, response, next);
    expect(status).toBe(500);
    expect(body.message).toStrictEqual("URLcannot be registered, check logs");
  });
});
