import { NextResponse } from 'next/server';

// Simple implementation that replaces the Stripe webhook handler
export async function POST(req: Request) {
  try {
    // For now, we'll just acknowledge the webhook without processing
    // This prevents build errors when Stripe credentials aren't set
    
    console.log('Webhook received - placeholder implementation');
    
    // Just return a success response
    return NextResponse.json({ 
      received: true, 
      message: 'Webhook received successfully (placeholder implementation)' 
    });
    
  } catch (error) {
    console.error('Error in webhook handler:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
