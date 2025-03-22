# Global2India Deployment Guide

This document provides instructions for deploying the Global2India website to production.

## Prerequisites

Before deploying, ensure you have:

1. A Vercel account (recommended) or another hosting provider
2. A Supabase account with a project set up
3. A Clerk account with authentication configured
4. A Google Maps API key
5. Access to the project's GitHub repository

## Environment Variables

The following environment variables need to be configured in your deployment platform:

```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Deployment to Vercel

### Manual Deployment

1. **Create a Vercel Project**:
   - Go to [Vercel](https://vercel.com/) and sign up or log in
   - Click on "New Project"
   - Import your GitHub repository
   - Configure the project settings:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`

2. **Configure Environment Variables**:
   - In the project settings, navigate to the "Environment Variables" section
   - Add all the required environment variables listed above
   - Make sure to mark sensitive variables as "encrypted"

3. **Deploy**:
   - Click "Deploy" to start the deployment process
   - Vercel will build and deploy your application
   - Once completed, you'll receive a URL for your deployed site

### Automated Deployment with GitHub Actions

1. **Set Up GitHub Secrets**:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `VERCEL_TOKEN`: Your Vercel API token
     - `VERCEL_ORG_ID`: Your Vercel organization ID
     - `VERCEL_PROJECT_ID`: Your Vercel project ID
     - Plus all the environment variables listed above

2. **GitHub Actions Workflow**:
   - The project includes a GitHub Actions workflow file at `.github/workflows/deploy.yml`
   - This workflow will automatically build and deploy the application when changes are pushed to the main branch
   - No further configuration is needed if all secrets are set correctly

## Database Setup

### Supabase Tables

Ensure your Supabase database has the following tables:

1. **quote_requests**:
   ```sql
   CREATE TABLE quote_requests (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     weight NUMERIC NOT NULL,
     origin_country TEXT NOT NULL,
     origin_pincode TEXT NOT NULL,
     destination_country TEXT NOT NULL,
     destination_pincode TEXT NOT NULL,
     hsn_code TEXT,
     additional_info TEXT,
     calculated_rate NUMERIC NOT NULL,
     admin_override_rate NUMERIC,
     admin_notes TEXT,
     status TEXT NOT NULL DEFAULT 'pending',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **contact_inquiries**:
   ```sql
   CREATE TABLE contact_inquiries (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     admin_notes TEXT,
     status TEXT NOT NULL DEFAULT 'unread',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

### Row-Level Security Policies

Set up row-level security to protect your data:

```sql
-- Enable RLS on tables
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin)
CREATE POLICY "Allow admins full access to quote_requests"
  ON quote_requests
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admins full access to contact_inquiries"
  ON contact_inquiries
  USING (auth.role() = 'authenticated');

-- Create policies for anonymous users (limited insert access)
CREATE POLICY "Allow anonymous users to create quote requests"
  ON quote_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to create contact inquiries"
  ON contact_inquiries
  FOR INSERT
  WITH CHECK (true);
```

## Custom Domain Configuration

To configure a custom domain for your Global2India website:

1. Purchase a domain name from a domain registrar
2. In your Vercel project settings:
   - Go to "Domains"
   - Add your custom domain
   - Follow Vercel's instructions to update your DNS settings
3. Set up SSL certificates (Vercel handles this automatically)
4. Update the `metadataBase` URL in `app/layout.tsx` to match your custom domain

## Post-Deployment Checks

After deployment, verify the following:

1. **Functionality Check**:
   - Test all forms and submission processes
   - Verify admin dashboard access
   - Test responsive design on various devices

2. **Performance Check**:
   - Run Lighthouse audits to check performance, accessibility, SEO, and best practices
   - Check Core Web Vitals in Google Search Console

3. **Security Check**:
   - Verify that admin routes are properly protected
   - Ensure proper HTTPS implementation
   - Check for exposure of sensitive environment variables

## Monitoring and Maintenance

1. **Set Up Monitoring**:
   - Configure Vercel Analytics for performance monitoring
   - Set up error tracking with a service like Sentry
   - Implement uptime monitoring with a service like UptimeRobot

2. **Regular Maintenance**:
   - Keep dependencies updated
   - Apply security patches promptly
   - Regularly backup your database
   - Monitor server logs for errors

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**:
   - Check build logs for specific errors
   - Verify that all dependencies are correctly installed
   - Ensure environment variables are properly set

2. **API Connection Issues**:
   - Verify Supabase connection settings
   - Check Clerk authentication configuration
   - Ensure correct CORS settings for API routes

3. **White Screen or 500 Errors**:
   - Check server logs for detailed error information
   - Verify that the runtime environment has all required environment variables
   - Check for JavaScript errors in the browser console

For additional support, contact the development team at dev@global2india.com. 