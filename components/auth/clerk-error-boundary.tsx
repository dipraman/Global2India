'use client'

import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ClerkErrorBoundaryProps {
  children: React.ReactNode
}

export function ClerkErrorBoundary({ children }: ClerkErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    // Listen for Clerk errors
    const handleError = (event: ErrorEvent) => {
      if (event.error && (
        // Check for typical Clerk errors
        event.error.message?.includes('Invalid host') ||
        event.error.message?.includes('Clerk') ||
        event.error.message?.includes('Authentication')
      )) {
        console.error('Clerk error caught:', event.error)
        setError(event.error)
        event.preventDefault()
      }
    }
    
    window.addEventListener('error', handleError)
    
    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])
  
  // No error, render children normally
  if (!error) {
    return <>{children}</>
  }
  
  // Handle error state
  return (
    <div className="container py-8 md:py-12">
      <Alert variant="destructive" className="mb-6">
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription>
          There was a problem with authentication. This might be due to:
          <ul className="list-disc pl-5 mt-2">
            <li>Invalid host configuration</li>
            <li>Network connectivity issues</li>
            <li>Authentication service unavailability</li>
          </ul>
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
        <Button variant="outline" onClick={() => router.push('/')}>
          Go to Homepage
        </Button>
        {process.env.NODE_ENV === 'development' && (
          <Button variant="secondary" onClick={() => setError(null)}>
            Ignore Error (Development Only)
          </Button>
        )}
      </div>
      
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-muted rounded-md overflow-auto">
          <h3 className="font-mono text-sm font-bold mb-2">Error Details (Development Only):</h3>
          <pre className="text-xs text-wrap whitespace-pre-wrap">
            {error.stack || error.message}
          </pre>
        </div>
      )}
    </div>
  )
} 