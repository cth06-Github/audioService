import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Unauthorized access
  if (pathname === "/upload" && !request.cookies.get("session")) {
    // pathname != web URL but project file names
    return new Response("Error 401: Unauthorized Access", { status: 401 });
  }

  // User is logged in but access login page without logging out --> redirect to /upload
  if (pathname === "/login" && request.cookies.get("session")) {
    return NextResponse.redirect(new URL("/upload", request.url));
  }

  return NextResponse.next(); // always written like this hmm
}

export const config = {
  // without this, page design isn't applied to the redirected page
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
