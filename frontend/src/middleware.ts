import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./app/lib-authen.ts";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const securePaths = ["/home", "/upload", "/record"];

  // Detecting Unauthorized access
  if (secureRouteChecker(pathname, securePaths)) {
    if (!request.cookies.get("session")) {
      // implies user did not login
      return new Response("Error 401: Unauthorized Access", { status: 401 });
    }

    // Session cookie present. Assumes only 1 session cookie present, which is for authentication
    try {
      const session = await getSession();
      if (!session) {
        // session cookies with no value
        throw new Error(); // goes to catch
      }
    } catch {
      // should be JWT Invalid error.
      // detect session cookies with invalid value
      return new Response("Error 401: Unauthorized Access", { status: 401 });
    }
  }

  // Logged in users: login page to be redirected to home page
  try {
    if (pathname === "/login" && request.cookies.get("session")) {
      // check if users are logged in
      const session = await getSession();
      if (!session) {
        // session cookies with no value
        throw new Error();
      }
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } catch {
    return new Response(
      "Error 401: Unauthorized Access. Session Expired. Delete session cookies and login the proper way.",
      { status: 401 }
    );
  }
  return NextResponse.next();
}

export const config = {
  // to apply corresponding design to the redirected page
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

function secureRouteChecker(pathname: string, pathArray: string[]) {
  return pathArray.filter((path) => path === pathname).length !== 0
    ? true // pathname indeed refers to authorized pages
    : false;
}
