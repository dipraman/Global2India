import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    // Check for CSRF token
    const csrfToken = req.headers.get('x-csrf-token')
    if (!csrfToken) {
      return NextResponse.json({ error: 'CSRF token is missing' }, { status: 403 })
    }
    
    // In a real application, validate the token against a stored token
    // For demo purposes, we just check that it exists
    
    const body = await req.json()
    
    // Required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message']
    
    // Validate required fields
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Field ${field} is required` }, { status: 400 })
      }
    }
    
    // Create Supabase client
    const supabase = createClient()
    
    // Insert into database
    const { data, error } = await supabase
      .from('contact_inquiries')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
        status: 'unread'
      })
      .select('id')
      .single()
    
    if (error) {
      console.error('Error inserting contact inquiry:', error)
      return NextResponse.json({ error: 'Failed to save contact inquiry' }, { status: 500 })
    }
    
    // Return success
    return NextResponse.json({ 
      inquiryId: data.id,
      message: 'Contact inquiry submitted successfully' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
} 