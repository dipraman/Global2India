// Stripe service is no longer used in this application
// This is a mock implementation to maintain compatibility with any imports

interface MockStripe {
  webhooks: {
    constructEvent: () => { type: string; data: { object: Record<string, any> } };
  };
}

// Create a mock Stripe interface
export const stripe = {
  webhooks: {
    constructEvent: () => ({ 
      type: 'mock.event', 
      data: { 
        object: {} 
      } 
    })
  }
} as MockStripe;

console.log('Using mock Stripe implementation - Stripe functionality has been disabled');
