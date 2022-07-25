import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/account/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();
  response.cookies.set("vercel", "fast");
  response.cookies.set("vercel", "fast", { path: "/test" });

  const { value, options } = response.cookies.getWithOptions("vercel");
  console.log(value); // => 'fast'
  console.log(options); // => { Path: '/test' }

  request.cookies.set("token", "12345");
  console.log("cookies", request.cookies.get("token"));

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
