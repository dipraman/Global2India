'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@clerk/nextjs'
import { createClient } from '@/utils/supabase/client'

type ContactInquiry = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  admin_notes: string | null
  status: string
  created_at: string
}

export default function ContactDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { isLoaded, userId } = useAuth()
  
  const [inquiry, setInquiry] = useState<ContactInquiry | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [saving, setSaving] = useState(false)
  
  // Check if user is authenticated
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/admin/login')
    }
  }, [isLoaded, userId, router])
  
  // Load inquiry data
  useEffect(() => {
    async function loadInquiryData() {
      if (!userId || !params.id) return
      
      try {
        setLoading(true)
        setError(null)
        
        const supabase = createClient()
        
        // Get the inquiry with the given ID
        const { data, error } = await supabase
          .from('contact_inquiries')
          .select('*')
          .eq('id', params.id)
          .single()
        
        if (error) throw new Error('Failed to load inquiry data')
        
        setInquiry(data as ContactInquiry)
        setAdminNotes(data.admin_notes || '')
        
        // Mark as read if it's not already
        if (data.status === 'unread') {
          await supabase
            .from('contact_inquiries')
            .update({ status: 'read' })
            .eq('id', params.id)
          
          setInquiry(prev => prev ? { ...prev, status: 'read' } : null)
        }
      } catch (err) {
        console.error('Error loading inquiry:', err)
        setError('Failed to load inquiry data. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    if (userId && params.id) {
      loadInquiryData()
    }
  }, [userId, params.id])
  
  // Save inquiry changes
  const saveInquiryChanges = async () => {
    if (!inquiry) return
    
    try {
      setSaving(true)
      
      const supabase = createClient()
      
      const updates = {
        admin_notes: adminNotes
      }
      
      const { error } = await supabase
        .from('contact_inquiries')
        .update(updates)
        .eq('id', inquiry.id)
      
      if (error) throw new Error('Failed to save changes')
      
      // Update local state
      setInquiry(prev => prev ? { ...prev, ...updates } : null)
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
      case 'unread':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Unread</Badge>
      case 'read':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Read</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
  
  if (!isLoaded || !userId) {
    return <div className="container py-12 text-center">Loading...</div>
  }
  
  if (loading) {
    return <div className="container py-12 text-center">Loading inquiry details...</div>
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
  
  if (!inquiry) {
    return (
      <div className="container py-12 text-center">
        <p>Contact inquiry not found</p>
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
          <h1 className="text-3xl font-bold">Contact Inquiry Details</h1>
          <p className="text-muted-foreground">
            Viewing inquiry from {inquiry.name} - {formatDate(inquiry.created_at)}
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
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Inquiry Information</CardTitle>
                <CardDescription>Details of the contact inquiry</CardDescription>
              </div>
              <div>{renderStatusBadge(inquiry.status)}</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p>{inquiry.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{inquiry.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p>{inquiry.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Subject</p>
                <p>{inquiry.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Message</p>
                <div className="mt-2 p-4 rounded-md bg-gray-50 whitespace-pre-wrap">
                  {inquiry.message}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Admin Notes</CardTitle>
            <CardDescription>Internal notes for this inquiry</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea 
              placeholder="Add notes about this inquiry"
              className="min-h-32"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={saveInquiryChanges}
              disabled={saving}
            >
              Save Notes
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Respond to this inquiry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button>
                  Reply via Email
                </Button>
                <Button variant="outline">
                  Forward to Team
                </Button>
                <Button variant="outline">
                  Archive
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Note: Email functionality will be connected to your email system later.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 