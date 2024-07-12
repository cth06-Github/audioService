import { NextResponse, NextRequest } from "next/server";
import { getSession } from "./app/lib-authen.ts";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const securePaths = ["/home", "/upload", "/record"];

  // Unauthorized access
  if (secureRouteChecker(pathname, securePaths)) {
    if (!request.cookies.get("session")) {
      return new Response("Error 401: Unauthorized Access", { status: 401 });
    }

    try {
      // force generate cookie. Not sure if...there's a certain format for JWT hackers can emulate.
      const session = await getSession();
      if (!session) {
        return new Response("Session Expired. Error 401: Unauthorized Access", {
          status: 401,
        });
      }
    } catch {
      return new Response("Error 401: Unauthorized Access", { status: 401 });
    }
  }

  // User is logged in but access login page without logging out --> redirect to /home
  /*try {
    if (pathname === "/login" && request.cookies.get("session")) {
      const session = await getSession(); // if can, means valid user
      if (!session) {
        return new Response(
          "Session Expired. Delete cookies and login the proper way. Error 401: Unauthorized Access",
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } catch {
    return new Response("please delete cookies and login the proper way"); //NextResponse.redirect(new URL("/login", request.url)); // redirect to itself...consequently users need to delete cookies
  }*/

  return NextResponse.next(); // always written like this hmm
}

export const config = {
  // without this, page design isn't applied to the redirected page
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

function secureRouteChecker(pathname: string, pathArray: string[]) {
  return pathArray.filter((path) => path === pathname).length !== 0
    ? true
    : false;
}
