import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup'

  const token = request.cookies.get('accessToken')?.value || ''
 //console.log(token);
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
    
}

//new changes done 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
     '/',
     '/profile',
     '/login',
     '/signup',
     '/post',
     '/verifyemail'
  ]
}