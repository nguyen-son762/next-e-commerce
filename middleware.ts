import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/account/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  // const response = NextResponse.next()

  // // Getting cookies from the request
  // const cookie = request.cookies.get('accessToken')
  // // console.log(cookie) // => 'fast'
  // return response
}

export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
}
