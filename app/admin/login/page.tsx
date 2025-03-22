'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SignIn } from '@clerk/nextjs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Check if development mode is enabled
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.CLERK_DEV_MODE === 'true';

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect to admin page if in development mode
  useEffect(() => {
    if (isDevelopment) {
      console.log('Development mode detected - redirecting to admin dashboard')
      router.push('/admin')
    }
  }, [router])

  const handleDemoLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple demo login - in a real app, this would be a proper auth check
    if (username === 'admin' && password === 'password') {
      // Demo login successful
      router.push('/admin')
    } else {
      setError('Invalid credentials. Try admin/password for demo')
      setLoading(false)
    }
  }

  if (isDevelopment) {
    return <div className="container py-12 text-center">Redirecting to admin dashboard...</div>
  }

  return (
    <div className="container flex h-screen items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to access the admin dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Use your admin credentials to sign in
            </CardDescription>
          </CardHeader>
          <CardContent>
            {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
              // Use Clerk if configured
              <SignIn 
                appearance={{
                  elements: {
                    rootBox: 'mx-auto w-full',
                    card: 'shadow-none border-0 p-0',
                  }
                }}
                redirectUrl="/admin"
              />
            ) : (
              // Fallback to demo login form
              <>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleDemoLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>Demo credentials: admin / password</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 