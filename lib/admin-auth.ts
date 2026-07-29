export function isAdminAuthorized(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return false;
  }

  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) {
    return false;
  }

  const base64Credentials = header.split(" ")[1] ?? "";
  const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const password = credentials.split(":")[1] ?? "";

  return password === adminPassword;
}

export function unauthorizedResponse() {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
    },
  });
}
