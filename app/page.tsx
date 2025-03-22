"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-32">
          <h1 className="text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-primary">Global2India</span>
            <span className="mt-2 block text-3xl font-medium sm:text-4xl md:text-5xl">
              Reliable International Forwarding Services
            </span>
          </h1>
          
          <p className="max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
            Connecting the world to India with reliable, efficient, and affordable international forwarding services. From packages to cargo, we deliver with care.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/request-quote">
                Request a Quote <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <Link href="/services">
                Our Services <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Promotional Banners */}
        <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Banner 1 */}
          <div className="group relative overflow-hidden rounded-lg bg-primary/10 p-6 transition-all hover:bg-primary/20">
            <div className="mb-4 text-2xl font-bold">International Courier</div>
            <p className="text-muted-foreground">Fast and reliable delivery services to and from India, ensuring your packages arrive safely and on time.</p>
            <Link href="/services#international-courier" className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              Learn more <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {/* Banner 2 */}
          <div className="group relative overflow-hidden rounded-lg bg-primary/10 p-6 transition-all hover:bg-primary/20">
            <div className="mb-4 text-2xl font-bold">Medicine Delivery</div>
            <p className="text-muted-foreground">Specialized service for delivering essential medications to India with proper handling and regulatory compliance.</p>
            <Link href="/services#medicine-delivery" className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              Learn more <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {/* Banner 3 */}
          <div className="group relative overflow-hidden rounded-lg bg-primary/10 p-6 transition-all hover:bg-primary/20">
            <div className="mb-4 text-2xl font-bold">Cargo Services</div>
            <p className="text-muted-foreground">Complete cargo solutions for businesses and individuals shipping goods to India, with competitive rates.</p>
            <Link href="/services#cargo-services" className="mt-4 inline-flex items-center text-sm font-medium text-primary">
              Learn more <MoveRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Why Choose Us Section */}
        <div className="my-16 flex flex-col items-center">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">Why Choose Global2India</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">Reliability</h3>
              <p className="text-muted-foreground">Count on us to deliver your shipments safely and on time, every time.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">Competitive Pricing</h3>
              <p className="text-muted-foreground">Get the best rates for your international shipments with transparent pricing.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4" />
                  <path d="M17 8l-5-5-5 5" />
                  <path d="M12 3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium">Easy Tracking</h3>
              <p className="text-muted-foreground">Track your shipments in real-time with our user-friendly tracking system.</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="my-16 rounded-xl bg-primary/10 p-8 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Ready to Ship?</h2>
          <p className="mb-6 text-lg text-muted-foreground">Get a quote for your international shipment to India today.</p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/request-quote">
              Request a Quote <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
