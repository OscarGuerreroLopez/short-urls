import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../utils";
import { UrlService } from "../../domain/useCases/urls";
import { VisitService } from "../../domain/useCases/visits";

export const AddUrl: Handler = async (request: Request, response: Response) => {
  try {
    const { shortUrl, longUrl } = await UrlService.addUrl(request.body);

    const { visits } = await VisitService.addVisit({
      url: shortUrl || "unknown",
      longUrl
    });

    return response.status(201).send({
      shortUrl,
      visits
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "AddUrl handler",
        code: request.code,
        body: request.body,
        headers: request.headers
      }
    });

    return response.status(500).send({
      message: "URL cannot be registered, check logs",
      errorCode: request.code
    });
  }
};
