[![CodeGuide](/codeguide-backdrop.svg)](https://codeguide.dev)


# CodeGuide Starter Pro

A modern web application starter template built with Next.js 14, featuring authentication, database integration, and payment processing capabilities.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Payments:** [Stripe](https://stripe.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

## Prerequisites

Before you begin, ensure you have the following:
- Node.js 18+ installed
- A [Clerk](https://clerk.com/) account for authentication
- A [Supabase](https://supabase.com/) account for database
- A [Stripe](https://stripe.com/) account for payments (optional)
- Generated project documents from [CodeGuide](https://codeguide.dev/) for best development experience

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codeguide-starter-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables Setup**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in the environment variables in `.env` (see Configuration section below)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

## Configuration

### Clerk Setup
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Go to API Keys
4. Copy the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

### Supabase Setup
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Go to Project Settings > API
4. Copy the `Project URL` as `NEXT_PUBLIC_SUPABASE_URL`
5. Copy the `anon` public key as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Stripe Setup (Optional)
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from the Developers section
3. Add the required keys to your `.env` file

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## Features

- 🔐 Authentication with Clerk
- 📦 Supabase Database
- 💳 Stripe Payments Integration
- 🎨 Modern UI with Tailwind CSS
- 🚀 App Router Ready
- 🔄 Real-time Updates
- 📱 Responsive Design

## Project Structure

```
codeguide-starter/
├── app/                # Next.js app router pages
├── components/         # React components
├── utils/             # Utility functions
├── public/            # Static assets
├── styles/            # Global styles
├── documentation/     # Generated documentation from CodeGuide
└── supabase/          # Supabase configurations and migrations
```

## Documentation Setup

To implement the generated documentation from CodeGuide:

1. Create a `documentation` folder in the root directory:
   ```bash
   mkdir documentation
   ```

2. Place all generated markdown files from CodeGuide in this directory:
   ```bash
   # Example structure
   documentation/
   ├── project_requirements_document.md             
   ├── app_flow_document.md
   ├── frontend_guideline_document.md
   └── backend_structure_document.md
   ```

3. These documentation files will be automatically tracked by git and can be used as a reference for your project's features and implementation details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# Global2India - International Shipping & Logistics

![Global2India Logo](public/logo.png)

Global2India is a modern, responsive web application for an international forwarding service connecting the world to India. The platform provides comprehensive information about shipping services and allows users to request quotes, contact the company, and access an admin dashboard for managing inquiries.

## 🚀 Features

- **Responsive Design**: Built with a mobile-first approach using Next.js 14, Tailwind CSS, and TypeScript
- **Service Information**: Detailed pages about international courier, parcel delivery, medicine delivery, and other services
- **Quote Request System**: Online form for users to request quotes for their shipments
- **Contact System**: Form for general inquiries with Google Maps integration
- **Admin Dashboard**: Secure admin area for managing quote requests and inquiries
- **Authentication**: Protected routes using Clerk Auth
- **Database Integration**: Supabase for storing and retrieving data
- **Toast Notifications**: User-friendly notifications for form submissions
- **SEO Optimized**: Metadata and structured data for better search engine visibility
- **Accessibility**: ARIA attributes and proper semantic HTML

## 📋 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk Auth](https://clerk.dev/)
- **Database**: [Supabase](https://supabase.io/)
- **Maps Integration**: [Google Maps API](https://developers.google.com/maps)
- **Deployment**: [Vercel](https://vercel.com/)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/global2india.git
   cd global2india
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Google Maps API Key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Development Mode Features

In development mode:
- The admin dashboard is accessible without authentication
- A mock Supabase client is used if real credentials are not provided
- Form submissions are stored in-memory

## 📊 Project Structure

```
global2india/
├── app/                 # Next.js app router
│   ├── about/           # About page
│   ├── admin/           # Admin dashboard
│   ├── api/             # API routes
│   ├── contact/         # Contact page
│   ├── request-quote/   # Quote request page
│   ├── services/        # Services page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── layout/          # Layout components
│   │   ├── site-footer.tsx
│   │   ├── site-header.tsx
│   │   └── site-layout.tsx
│   └── ui/              # UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── middleware.ts        # Next.js middleware
├── public/              # Static assets
└── utils/               # Utility functions
    └── supabase/        # Supabase client utilities
```

## 🚢 Deployment

The application is configured for deployment on Vercel. A GitHub Actions workflow is included for CI/CD:

1. Push to the main branch to trigger automatic deployment
2. The workflow runs linting, tests, and builds before deploying
3. Environment variables must be configured in your Vercel project and GitHub repository secrets

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

For any inquiries about this project, please contact info@global2india.com.

## 🙏 Acknowledgements

- [CodeGuide Starter Pro](https://github.com/codeGuide-dev/codeguide-starter-pro) - The starter template used for this project
- [Shadcn UI](https://ui.shadcn.com/) - For the beautifully designed UI components
- All contributors and supporters of the Global2India project
