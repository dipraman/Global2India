import { NextResponse } from 'next/server'
import { clerkMiddleware, createClerkClient } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.CLERK_DEV_MODE === 'true'

// Define public routes
const publicRoutes = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/request-quote',
  '/api/contact',
  '/api/quote'
]

// Define admin routes
const adminRoutes = [
  '/admin'
]

// Custom middleware for development mode to bypass Clerk validation
function customMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const { pathname } = url

  // For admin routes in development mode, allow access without authentication
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    console.log(`[Dev Mode] Bypassing auth for admin route: ${pathname}`)
    return NextResponse.next()
  }

  // For public routes, no need to check authentication
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // For any other route, proceed normally
  return NextResponse.next()
}

// Export middleware configuration
export default isDevelopment
  ? customMiddleware
  : clerkMiddleware({
      debug: true,
      publicRoutes,
      beforeAuth: (req) => {
        // You can run code before authentication happens here
        return NextResponse.next()
      },
      afterAuth: (auth, req) => {
        // Handle admin routes - redirect to sign-in if not authenticated
        const url = req.nextUrl.clone()
        const { pathname } = url
        
        // Check for admin routes and enforce authentication
        if (adminRoutes.some(route => pathname.startsWith(route))) {
          if (!auth.userId) {
            const signInUrl = new URL('/sign-in', req.url)
            signInUrl.searchParams.set('redirect_url', pathname)
            return NextResponse.redirect(signInUrl)
          }
        }
        
        return NextResponse.next()
      },
    })

// Configure middleware to run on these paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
