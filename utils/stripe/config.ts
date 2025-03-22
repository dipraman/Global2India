import Stripe from 'stripe';

// Create a conditional Stripe instance for development environment
// In development with no API key, return a mock Stripe object
const createStripeInstance = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '';
  
  // If we're in development and there's no API key, return a mock
  if (!apiKey && process.env.NODE_ENV === 'development') {
    console.log('Using mock Stripe instance in development mode');
    // Return a mock implementation that does nothing
    return {
      webhooks: {
        constructEvent: () => ({ type: 'mock.event', data: { object: {} } })
      }
    } as unknown as Stripe;
  }
  
  // Otherwise create a real Stripe instance
  return new Stripe(apiKey, {
    apiVersion: '2022-11-15', // Use a specific API version instead of null
    appInfo: {
      name: 'Next.js Subscription Starter',
      version: '0.0.0',
      url: 'https://github.com/vercel/nextjs-subscription-payments'
    }
  });
};

export const stripe = createStripeInstance();
