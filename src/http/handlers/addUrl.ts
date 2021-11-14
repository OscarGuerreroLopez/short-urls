import { Handler, Response, Request } from "express";
import { validationResult } from "express-validator";
import { ErrorHandler, Severity, SanitiseBody } from "../../utils";
import { UrlService } from "../../domain/useCases/urls";
import { VisitService } from "../../domain/useCases/visits";

export const AddUrl: Handler = async (request: Request, response: Response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      let message = "";

      errors.array().map((err) => {
        message += `${err.msg || ""} ,`;
      });

      throw new Error(message);
    }

    const { shortUrl, longUrl } = await UrlService.addUrl(request.body);

    const { visits } = await VisitService.addVisit({ url: longUrl });

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
        body: SanitiseBody(request.body),
        headers: request.headers
      }
    });

    return response.status(500).send({
      message: "URLcannot be registered, check logs",
      errorCode: request.code
    });
  }
};
