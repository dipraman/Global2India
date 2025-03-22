import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Check if we're in development mode with no real Supabase credentials
const isDevelopmentWithNoSupabase = () => {
  const isDevMode = process.env.NODE_ENV === 'development' || process.env.CLERK_DEV_MODE === 'true'
  const hasSupabaseConfig = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_project_url' &&
    process.env.SUPABASE_SERVICE_ROLE_KEY && 
    process.env.SUPABASE_SERVICE_ROLE_KEY !== 'your_service_role_key'
  
  return isDevMode && !hasSupabaseConfig
}

export const createClient = () => {
  // If in development mode with no Supabase credentials, return a mock client
  if (isDevelopmentWithNoSupabase()) {
    console.log('Using mock Supabase server client in development mode')
    return createMockClient()
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials')
  }

  return createSupabaseClient(supabaseUrl, supabaseKey)
}

// Mock client for development without Supabase credentials
function createMockClient() {
  return {
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: (column: string, value: any) => ({
          single: () => Promise.resolve({ data: mockData[table]?.[0] || null, error: null }),
          order: (column: string, { ascending }: { ascending: boolean }) => 
            Promise.resolve({ data: mockData[table] || [], error: null })
        }),
        order: (column: string, { ascending }: { ascending: boolean }) => 
          Promise.resolve({ data: mockData[table] || [], error: null })
      }),
      insert: (data: any) => ({
        select: (columns?: string) => ({
          single: () => Promise.resolve({ 
            data: { id: `mock-${Date.now()}`, ...data }, 
            error: null 
          })
        })
      }),
      update: (data: any) => ({
        eq: (column: string, value: string) => 
          Promise.resolve({ data: { ...mockData[table]?.[0], ...data }, error: null })
      })
    })
  }
}

// Mock data for development
const mockData = {
  quote_requests: [
    {
      id: 'mock-quote-1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      weight: 10,
      origin_country: 'USA',
      origin_pincode: '12345',
      destination_country: 'India',
      destination_pincode: '400001',
      hsn_code: 'ABC123',
      additional_info: 'Fragile items',
      calculated_rate: 5000,
      admin_override_rate: null,
      status: 'pending',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-quote-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      weight: 5,
      origin_country: 'Canada',
      origin_pincode: 'V6B 3K9',
      destination_country: 'India',
      destination_pincode: '110001',
      hsn_code: 'XYZ789',
      additional_info: 'Electronics',
      calculated_rate: 2500,
      admin_override_rate: 3000,
      status: 'approved',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ],
  contact_inquiries: [
    {
      id: 'mock-contact-1',
      name: 'Michael Johnson',
      email: 'michael@example.com',
      phone: '+1 (555) 123-4567',
      subject: 'Delivery Question',
      message: 'I need information about shipping fragile items to India.',
      status: 'unread',
      created_at: new Date().toISOString()
    },
    {
      id: 'mock-contact-2',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '+1 (555) 987-6543',
      subject: 'Service Inquiry',
      message: 'Do you offer expedited shipping options?',
      status: 'read',
      created_at: new Date(Date.now() - 43200000).toISOString()
    }
  ]
}