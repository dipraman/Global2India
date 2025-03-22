import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { clerkClient } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs'

// Get a specific quote by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = auth()
  
  // Check if user is authenticated
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    const supabase = createClient()
    
    // Get the quote with the given ID
    const { data: quote, error } = await supabase
      .from('quote_requests')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (error) {
      console.error('Error fetching quote:', error)
      return NextResponse.json({ error: 'Failed to fetch quote' }, { status: 500 })
    }
    
    if (!quote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }
    
    return NextResponse.json({ quote }, { status: 200 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
  }
} 