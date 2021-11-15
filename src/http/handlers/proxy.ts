import { Handler, Response, Request } from "express";
import { ErrorHandler, Severity } from "../../utils";
import { UrlService } from "../../domain/useCases/urls";

import { VisitService } from "../../domain/useCases/visits";

export const Proxy: Handler = async (request: Request, response: Response) => {
  try {
    const code = request.params.id;

    const redirectUrl = await UrlService.findUrl(code);

    const { visits } = await VisitService.addVisit({
      url: redirectUrl.shortUrl || "unknown",
      longUrl: redirectUrl.longUrl
    });

    // here we could simply redirect with if we wanted to as well
    // I am sending the long url instead along with the visits
    // to probe that the visits counter works, not sure if that was the intention
    // return res.redirect(redirectUrl.longUrl)
    return response.status(200).send({
      proxy: redirectUrl.longUrl,
      visits
    });
  } catch (error) {
    ErrorHandler({
      error,
      additionalErrorInfo: {
        severity: Severity.WARN,
        identifier: "proxy handler",
        code: request.code,
        body: request.body,
        headers: request.headers
      }
    });

    return response.status(404).send({
      message: "URL not found, check logs",
      errorCode: request.code
    });
  }
};
