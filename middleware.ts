import { NextResponse } from 'next/server'
import { clerkMiddleware, createClerkClient } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'

// Check if we're in development mode or if Clerk dev mode is enabled
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.CLERK_DEV_MODE === 'true'

// Check if we have valid Clerk credentials
const hasClerkCredentials = 
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_') &&
  process.env.CLERK_SECRET_KEY && 
  process.env.CLERK_SECRET_KEY.startsWith('sk_')

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/request-quote',
  '/api/contact',
  '/api/quote',
  '/api/webhooks'
]

// Define admin routes that require authentication in production
const adminRoutes = [
  '/admin'
]

// Custom middleware for development mode or when Clerk is not properly configured
function fallbackMiddleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const { pathname } = url

  // For admin routes, we would normally require authentication
  // But in development or when Clerk is not configured, we'll bypass auth
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    console.log(`[Fallback Mode] Bypassing auth for admin route: ${pathname}`)
    return NextResponse.next()
  }

  // For public routes, no need to check authentication
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // For any other route, proceed normally
  return NextResponse.next()
}

// Export middleware configuration based on environment and credentials
const middlewareHandler = (isDevelopment || !hasClerkCredentials)
  ? fallbackMiddleware
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

export default middlewareHandler

// Configure middleware to run on these paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
