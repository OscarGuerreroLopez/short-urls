import { URL } from "url";

export interface UrlCheck {
  href: string;
  origin: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
}

export const ValidateUrl = (url: string): UrlCheck => {
  try {
    const validatedUrl = new URL(url);

    return {
      href: validatedUrl.href,
      origin: validatedUrl.origin,
      protocol: validatedUrl.protocol,
      host: validatedUrl.host,
      hostname: validatedUrl.hostname,
      port: validatedUrl.port,
      pathname: validatedUrl.pathname,
      search: validatedUrl.search
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(`Invalid URL ${url}`);
  }
};
