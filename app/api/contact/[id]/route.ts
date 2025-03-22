import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getAuth } from '@clerk/nextjs/server'

// Get a specific contact inquiry by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = getAuth(req)
  
  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const supabase = createClient()
    
    // Get the contact inquiry with the given ID
    const { data: inquiry, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (error) {
      console.error('Error fetching contact inquiry:', error)
      return NextResponse.json({ error: 'Failed to fetch contact inquiry' }, { status: 500 })
    }
    
    if (!inquiry) {
      return NextResponse.json({ error: 'Contact inquiry not found' }, { status: 404 })
    }
    
    return NextResponse.json({ inquiry }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
} 