export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!origin || !host) {
    return false;
  }

  try {
    const originUrl = new URL(origin);
    if (originUrl.host !== host) {
      return false;
    }

    const forwardedProtocol = request.headers.get("x-forwarded-proto");
    return forwardedProtocol
      ? originUrl.protocol === `${forwardedProtocol}:`
      : true;
  } catch {
    return false;
  }
}
