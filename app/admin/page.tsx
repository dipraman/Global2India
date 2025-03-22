'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { useAuth, SignOutButton } from '@clerk/nextjs'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

// Check if Clerk keys are valid (not placeholders)
const isClerkConfigured = 
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && 
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes('test_') &&
  process.env.CLERK_SECRET_KEY;

// Check if development mode is enabled
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.CLERK_DEV_MODE === 'true';

// Types for data
type QuoteRequest = {
  id: string
  name: string
  email: string
  phone: string
  weight: number
  calculated_rate: number
  admin_override_rate: number | null
  status: string
  created_at: string
}

type ContactInquiry = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  created_at: string
}

// Sample data for development mode
const sampleQuoteRequests = [
  {
    id: 'sample-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 123-456-7890',
    weight: 10,
    calculated_rate: 5000,
    admin_override_rate: null,
    status: 'pending',
    created_at: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 987-654-3210',
    weight: 5,
    calculated_rate: 2500,
    admin_override_rate: 3000,
    status: 'approved',
    created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
  }
];

const sampleContactInquiries = [
  {
    id: 'contact-1',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '+1 555-123-4567',
    subject: 'Delivery Question',
    message: 'I need information about shipping fragile items to India.',
    status: 'unread',
    created_at: new Date().toISOString(),
  },
  {
    id: 'contact-2',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1 555-987-6543',
    subject: 'Service Inquiry',
    message: 'Do you offer expedited shipping options?',
    status: 'read',
    created_at: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('quotes')
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([])
  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  
  const { isLoaded, userId, sessionId, getToken } = useAuth()
  const router = useRouter()
  
  // Check if user is authenticated or if we're in development mode
  useEffect(() => {
    if (isLoaded && !userId && !isDevelopment) {
      router.push('/admin/login')
    }
  }, [isLoaded, userId, router])
  
  // Load data
  useEffect(() => {
    // In development mode, use sample data
    if (isDevelopment) {
      setQuoteRequests(sampleQuoteRequests);
      setContactInquiries(sampleContactInquiries);
      setLoading(false);
      return;
    }
    
    // Only load data if authenticated
    if (userId) {
      loadData();
    }
  }, [userId]);
  
  async function loadData() {
    try {
      setLoading(true)
      setError(null)
      
      const supabase = createClient()
      
      // Get quote requests
      const { data: quoteData, error: quoteError } = await supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (quoteError) throw new Error('Failed to load quote requests')
      
      // Get contact inquiries
      const { data: contactData, error: contactError } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (contactError) throw new Error('Failed to load contact inquiries')
      
      setQuoteRequests(quoteData as QuoteRequest[])
      setContactInquiries(contactData as ContactInquiry[])
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  // Update quote status
  const updateQuoteStatus = async (id: string, status: string) => {
    // In development mode, just update the local state
    if (isDevelopment) {
      setQuoteRequests(prevQuotes => 
        prevQuotes.map(quote => 
          quote.id === id ? { ...quote, status } : quote
        )
      );
      return;
    }
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('quote_requests')
        .update({ status })
        .eq('id', id)
      
      if (error) throw new Error('Failed to update status')
      
      // Refresh data
      loadData()
    } catch (err) {
      console.error('Error updating status:', err)
      setError('Failed to update status. Please try again.')
    }
  }
  
  // Update inquiry status
  const updateInquiryStatus = async (id: string, status: string) => {
    // In development mode, just update the local state
    if (isDevelopment) {
      setContactInquiries(prevInquiries => 
        prevInquiries.map(inquiry => 
          inquiry.id === id ? { ...inquiry, status } : inquiry
        )
      );
      return;
    }
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('contact_inquiries')
        .update({ status })
        .eq('id', id)
      
      if (error) throw new Error('Failed to update status')
      
      // Refresh data
      loadData()
    } catch (err) {
      console.error('Error updating status:', err)
      setError('Failed to update status. Please try again.')
    }
  }
  
  // Update rate override
  const updateRateOverride = async (id: string, rate: number) => {
    // In development mode, just update the local state
    if (isDevelopment) {
      setQuoteRequests(prevQuotes => 
        prevQuotes.map(quote => 
          quote.id === id ? { ...quote, admin_override_rate: rate } : quote
        )
      );
      return;
    }
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('quote_requests')
        .update({ admin_override_rate: rate })
        .eq('id', id)
      
      if (error) throw new Error('Failed to update rate')
      
      // Refresh data
      loadData()
    } catch (err) {
      console.error('Error updating rate:', err)
      setError('Failed to update rate. Please try again.')
    }
  }
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejected</Badge>
      case 'unread':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Unread</Badge>
      case 'read':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Read</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  // Show loading state while checking auth
  if (!isDevelopment && !isLoaded) {
    return <div className="container py-12 text-center">Loading...</div>
  }
  
  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            {isDevelopment ? 'Running in development mode with sample data' : 'Manage quotes and contact inquiries'}
          </p>
        </div>
        {!isDevelopment && userId && (
          <SignOutButton signOutCallback={() => router.push('/admin/login')}>
            <Button variant="outline">Sign Out</Button>
          </SignOutButton>
        )}
        {isDevelopment && (
          <Button 
            variant="outline"
            onClick={() => router.push('/')}
          >
            Back to Home
          </Button>
        )}
      </div>
      
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}
      
      <Tabs defaultValue="quotes" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="quotes">Quote Requests</TabsTrigger>
          <TabsTrigger value="inquiries">Contact Inquiries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="quotes">
          <Card>
            <CardHeader>
              <CardTitle>Quote Requests</CardTitle>
              <CardDescription>
                View and manage customer quote requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center">Loading quote requests...</div>
              ) : quoteRequests.length === 0 ? (
                <div className="py-8 text-center">No quote requests yet</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>List of recent quote requests</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Calculated Rate</TableHead>
                        <TableHead>Override Rate</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quoteRequests.map((quote) => (
                        <TableRow key={quote.id} className="cursor-pointer hover:bg-gray-50" onClick={() => router.push(`/admin/quote/${quote.id}`)}>
                          <TableCell>{formatDate(quote.created_at)}</TableCell>
                          <TableCell>{quote.name}</TableCell>
                          <TableCell>{quote.email}</TableCell>
                          <TableCell>{quote.weight} kg</TableCell>
                          <TableCell>₹{quote.calculated_rate.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Input 
                                type="number" 
                                defaultValue={quote.admin_override_rate || ''} 
                                placeholder="Override"
                                className="w-24"
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  if (e.target.value) {
                                    const rate = parseFloat(e.target.value)
                                    if (!isNaN(rate)) {
                                      updateRateOverride(quote.id, rate)
                                    }
                                  }
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            {renderStatusBadge(quote.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  updateQuoteStatus(quote.id, 'approved')
                                }}
                                disabled={quote.status === 'approved'}
                              >
                                Approve
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  updateQuoteStatus(quote.id, 'rejected')
                                }}
                                disabled={quote.status === 'rejected'}
                              >
                                Reject
                              </Button>
                              <Link href={`/admin/quote/${quote.id}`} passHref>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  View
                                </Button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inquiries">
          <Card>
            <CardHeader>
              <CardTitle>Contact Inquiries</CardTitle>
              <CardDescription>
                View and manage customer contact inquiries
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center">Loading contact inquiries...</div>
              ) : contactInquiries.length === 0 ? (
                <div className="py-8 text-center">No contact inquiries yet</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableCaption>List of recent contact inquiries</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contactInquiries.map((inquiry) => (
                        <TableRow key={inquiry.id} className="cursor-pointer hover:bg-gray-50" onClick={() => router.push(`/admin/contact/${inquiry.id}`)}>
                          <TableCell>{formatDate(inquiry.created_at)}</TableCell>
                          <TableCell>{inquiry.name}</TableCell>
                          <TableCell>{inquiry.email}</TableCell>
                          <TableCell>{inquiry.subject}</TableCell>
                          <TableCell>
                            {renderStatusBadge(inquiry.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  updateInquiryStatus(inquiry.id, inquiry.status === 'unread' ? 'read' : 'unread')
                                }}
                              >
                                {inquiry.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                              </Button>
                              <Link href={`/admin/contact/${inquiry.id}`} passHref>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  View
                                </Button>
                              </Link>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 