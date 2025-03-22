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
    const requiredFields = [
      'name', 
      'email', 
      'phone', 
      'weight', 
      'originCountry', 
      'originPincode', 
      'destinationCountry', 
      'destinationPincode'
    ]
    
    // Validate required fields
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Field ${field} is required` }, { status: 400 })
      }
    }
    
    // Validate weight
    const weight = body.weight
    if (isNaN(weight) || weight <= 0) {
      return NextResponse.json({ error: 'Weight must be a positive number' }, { status: 400 })
    }
    
    // Calculate rate (₹500 per kg for demo purpose)
    const calculatedRate = weight * 500
    
    // Create Supabase client
    const supabase = createClient()
    
    // Insert into database
    const { data, error } = await supabase
      .from('quote_requests')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        weight: weight,
        origin_country: body.originCountry,
        origin_pincode: body.originPincode,
        destination_country: body.destinationCountry,
        destination_pincode: body.destinationPincode,
        hsn_code: body.hsnCode || null,
        additional_info: body.additionalInfo || null,
        calculated_rate: calculatedRate,
        status: 'pending'
      })
      .select('id')
      .single()
    
    if (error) {
      console.error('Error inserting quote request:', error)
      return NextResponse.json({ error: 'Failed to save quote request' }, { status: 500 })
    }
    
    // Return success with calculated rate
    return NextResponse.json({ 
      quoteId: data.id,
      calculatedRate: calculatedRate,
      message: 'Quote request submitted successfully' 
    }, { status: 201 })
    
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
} 