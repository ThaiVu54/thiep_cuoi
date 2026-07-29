import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return new NextResponse("ADMIN_PASSWORD chưa được cấu hình", { status: 500 });
  }

  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return new NextResponse("Yêu cầu xác thực", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  const value = Buffer.from(auth.split(" ")[1] ?? "", "base64").toString("utf-8");
  const incomingPassword = value.split(":")[1] ?? "";

  if (incomingPassword !== password) {
    return new NextResponse("Sai mật khẩu", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
