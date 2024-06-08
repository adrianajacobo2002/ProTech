import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userCookie = cookies().get("user");

  const currentUrl = req.url;
  const imInLogin = currentUrl.includes("/login");
  if (!userCookie && !imInLogin) {
    return NextResponse.redirect(new URL("/login", currentUrl));
  } else if (userCookie && imInLogin) {
    const userRolesUrl = {
      Administrator: "administrador",
      User: "cliente",
      Support: "soporte",
    };
    const { userCategoryName } = JSON.parse(userCookie.value) as TUser;
    return NextResponse.redirect(
      new URL(
        `/users/${userRolesUrl[userCategoryName as keyof typeof userRolesUrl]}`,
        currentUrl
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
