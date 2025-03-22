import './globals.css'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { SiteLayout } from '@/components/layout/site-layout'
import { ClerkErrorBoundary } from '@/components/auth/clerk-error-boundary'
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"

// Import good Google Fonts
import { Poppins } from 'next/font/google'

// Configure the font
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'Global2India - International Shipping & Logistics',
    template: '%s | Global2India'
  },
  description: 'Global2India provides international shipping, logistics, and courier services from around the world to India. Fast, reliable, and affordable.',
  metadataBase: new URL('https://global2india.vercel.app'),
  keywords: ['shipping to India', 'international logistics', 'courier services', 'cargo services', 'medicine delivery to India', 'parcel delivery'],
  authors: [{ name: 'Global2India Team' }],
  creator: 'Global2India',
  publisher: 'Global2India',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://global2india.vercel.app',
    title: 'Global2India - International Shipping & Logistics',
    description: 'Global2India provides international shipping, logistics, and courier services from around the world to India. Fast, reliable, and affordable.',
    siteName: 'Global2India',
    images: [
      {
        url: 'https://global2india.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Global2India - International Shipping & Logistics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global2India - International Shipping & Logistics',
    description: 'Global2India provides international shipping, logistics, and courier services from around the world to India. Fast, reliable, and affordable.',
    images: ['https://global2india.vercel.app/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Check if we have valid Clerk credentials
const hasClerkCredentials = 
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_') &&
  process.env.CLERK_SECRET_KEY && 
  process.env.CLERK_SECRET_KEY.startsWith('sk_')

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.CLERK_DEV_MODE === 'true'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable,
        poppins.variable
      )}>
        {hasClerkCredentials ? (
          <ClerkProvider 
            appearance={{
              elements: {
                formButtonPrimary: 'bg-primary hover:bg-primary/80',
                card: 'shadow-md',
              }
            }}
            trustOrigin={isDevelopment}
          >
            <ClerkErrorBoundary>
              <SiteLayout>
                <main id="main-content" tabIndex={-1} role="main">
                  {children}
                </main>
              </SiteLayout>
            </ClerkErrorBoundary>
          </ClerkProvider>
        ) : (
          <SiteLayout>
            <main id="main-content" tabIndex={-1} role="main">
              {children}
            </main>
          </SiteLayout>
        )}
        <Toaster />
      </body>
    </html>
  )
}
