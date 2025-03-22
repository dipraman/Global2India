'use client'

import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from 'next-themes'
import { dark } from '@clerk/themes'

// Check if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.CLERK_DEV_MODE === 'true'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
          footerActionLink: 'text-primary hover:text-primary/90',
        }
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      // Special settings for development mode
      isSatellite={isDevelopment}
      // Trust all origins in development
      trustOrigin={isDevelopment}
    >
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  )
} 