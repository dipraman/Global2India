'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@clerk/nextjs'
import { createClient } from '@/utils/supabase/client'

type QuoteRequest = {
  id: string
  name: string
  email: string
  phone: string
  weight: number
  calculated_rate: number
  admin_override_rate: number | null
  admin_notes: string | null
  origin_country: string
  origin_pincode: string
  destination_country: string
  destination_pincode: string
  hsn_code: string | null
  additional_info: string | null
  status: string
  created_at: string
}

export default function QuoteDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { isLoaded, userId } = useAuth()
  
  const [quote, setQuote] = useState<QuoteRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [adminOverrideRate, setAdminOverrideRate] = useState<string>('')
  const [saving, setSaving] = useState(false)
  
  // Check if user is authenticated
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/admin/login')
    }
  }, [isLoaded, userId, router])
  
  // Load quote data
  useEffect(() => {
    async function loadQuoteData() {
      if (!userId || !params.id) return
      
      try {
        setLoading(true)
        setError(null)
        
        const supabase = createClient()
        
        // Get the quote with the given ID
        const { data, error } = await supabase
          .from('quote_requests')
          .select('*')
          .eq('id', params.id)
          .single()
        
        if (error) throw new Error('Failed to load quote data')
        
        setQuote(data as QuoteRequest)
        setAdminNotes(data.admin_notes || '')
        setAdminOverrideRate(data.admin_override_rate?.toString() || '')
      } catch (err) {
        console.error('Error loading quote:', err)
        setError('Failed to load quote data. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    if (userId && params.id) {
      loadQuoteData()
    }
  }, [userId, params.id])
  
  // Update quote status
  const updateQuoteStatus = async (status: string) => {
    if (!quote) return
    
    try {
      setSaving(true)
      
      const supabase = createClient()
      
      const { error } = await supabase
        .from('quote_requests')
        .update({ status })
        .eq('id', quote.id)
      
      if (error) throw new Error('Failed to update status')
      
      // Update local state
      setQuote(prev => prev ? { ...prev, status } : null)
    } catch (err) {
      console.error('Error updating status:', err)
      setError('Failed to update status. Please try again.')
    } finally {
      setSaving(false)
    }
  }
  
  // Save quote changes
  const saveQuoteChanges = async () => {
    if (!quote) return
    
    try {
      setSaving(true)
      
      const supabase = createClient()
      
      const updates = {
        admin_notes: adminNotes,
        admin_override_rate: adminOverrideRate ? parseFloat(adminOverrideRate) : null
      }
      
      const { error } = await supabase
        .from('quote_requests')
        .update(updates)
        .eq('id', quote.id)
      
      if (error) throw new Error('Failed to save changes')
      
      // Update local state
      setQuote(prev => prev ? { ...prev, ...updates } : null)
    } catch (err) {
      console.error('Error saving changes:', err)
      setError('Failed to save changes. Please try again.')
    } finally {
      setSaving(false)
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
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  if (!isLoaded || !userId) {
    return <div className="container py-12 text-center">Loading...</div>
  }
  
  if (loading) {
    return <div className="container py-12 text-center">Loading quote details...</div>
  }
  
  if (error) {
    return (
      <div className="container py-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error}
        </div>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.push('/admin')}
        >
          Back to Admin
        </Button>
      </div>
    )
  }
  
  if (!quote) {
    return (
      <div className="container py-12 text-center">
        <p>Quote not found</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => router.push('/admin')}
        >
          Back to Admin
        </Button>
      </div>
    )
  }
  
  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quote Details</h1>
          <p className="text-muted-foreground">
            Viewing quote from {quote.name} - {formatDate(quote.created_at)}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.push('/admin')}
        >
          Back to Admin
        </Button>
      </div>
      
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Details provided by the customer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Status</p>
                <div className="mt-1">{renderStatusBadge(quote.status)}</div>
              </div>
              <div>
                <p className="text-sm font-medium">Name</p>
                <p>{quote.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{quote.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p>{quote.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Weight</p>
                <p>{quote.weight} kg</p>
              </div>
              <div>
                <p className="text-sm font-medium">HSN Code</p>
                <p>{quote.hsn_code || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Additional Information</p>
                <p className="whitespace-pre-wrap">{quote.additional_info || 'None'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Shipment Details</CardTitle>
            <CardDescription>Origin and destination information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Origin Country</p>
                <p>{quote.origin_country}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Origin Pincode</p>
                <p>{quote.origin_pincode}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Destination Country</p>
                <p>{quote.destination_country}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Destination Pincode</p>
                <p>{quote.destination_pincode}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Rate Information</CardTitle>
            <CardDescription>Calculated and override rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium">System Calculated Rate</p>
                <p className="text-xl font-bold">₹{quote.calculated_rate.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on weight: {quote.weight} kg
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Override Rate</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Input 
                    type="number"
                    placeholder="Set override rate" 
                    value={adminOverrideRate}
                    onChange={(e) => setAdminOverrideRate(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Leave empty to use system calculated rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Admin Notes</CardTitle>
            <CardDescription>Internal notes for this quote</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Add notes about this quote request"
              className="min-h-32"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={() => updateQuoteStatus('approved')}
                disabled={saving || quote.status === 'approved'}
              >
                Approve
              </Button>
              <Button 
                variant="outline"
                onClick={() => updateQuoteStatus('rejected')}
                disabled={saving || quote.status === 'rejected'}
              >
                Reject
              </Button>
              <Button 
                variant="outline"
                onClick={() => updateQuoteStatus('pending')}
                disabled={saving || quote.status === 'pending'}
              >
                Mark as Pending
              </Button>
            </div>
            <Button 
              onClick={saveQuoteChanges}
              disabled={saving}
            >
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 