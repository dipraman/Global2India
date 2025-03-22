import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MoveRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Services | Global2India',
  description: 'Explore Global2India\'s international forwarding services including international courier, parcel delivery, medicine delivery, warehousing & distribution, baggage services, and cargo services.',
}

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Our Services</h1>
        <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
          Global2India offers a comprehensive range of international forwarding services to meet all your shipping needs to India.
        </p>
      </div>

      {/* International Courier */}
      <div id="international-courier" className="scroll-mt-20">
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-muted sm:min-h-[400px]">
            {/* Placeholder for an image - in production, replace with an actual image */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
              <p>International Courier Image</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold">International Courier</h2>
            <p className="mb-6 text-muted-foreground">
              Our International Courier service provides fast and reliable delivery of documents, packages, and small parcels to India from locations worldwide. With our extensive network and partnerships with leading courier companies, we ensure your shipments reach their destination safely and on time.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Express delivery options with tracking</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Door-to-door delivery service</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Competitive rates and transparent pricing</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/request-quote">
                Get a Quote <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Parcel Delivery */}
      <div id="parcel-delivery" className="scroll-mt-20">
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center md:order-1">
            <h2 className="mb-4 text-3xl font-bold">Parcel Delivery</h2>
            <p className="mb-6 text-muted-foreground">
              Our Parcel Delivery service is designed for sending gifts, personal items, and commercial shipments to India. We handle customs clearance and paperwork, making it easy for you to send parcels internationally without any hassle.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Secure packaging options available</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Assistance with customs documentation</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Various delivery speeds to fit your budget</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/request-quote">
                Get a Quote <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-muted sm:min-h-[400px] md:order-2">
            {/* Placeholder for an image - in production, replace with an actual image */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
              <p>Parcel Delivery Image</p>
            </div>
          </div>
        </div>
      </div>

      {/* Medicine Delivery */}
      <div id="medicine-delivery" className="scroll-mt-20">
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-muted sm:min-h-[400px]">
            {/* Placeholder for an image - in production, replace with an actual image */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
              <p>Medicine Delivery Image</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold">Medicine Delivery</h2>
            <p className="mb-6 text-muted-foreground">
              Our specialized Medicine Delivery service ensures that vital medications reach India safely and in compliance with all regulations. We understand the critical nature of medical shipments and take extra care to maintain proper handling throughout the journey.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Temperature-controlled shipping available</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Compliance with pharmaceutical import regulations</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Priority handling for urgent medications</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/request-quote">
                Get a Quote <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Warehousing & Distribution */}
      <div id="warehousing-distribution" className="scroll-mt-20">
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center md:order-1">
            <h2 className="mb-4 text-3xl font-bold">Warehousing & Distribution</h2>
            <p className="mb-6 text-muted-foreground">
              Our Warehousing & Distribution services provide businesses with secure storage facilities and efficient distribution networks in India. Whether you need short-term storage or a comprehensive logistics solution, we've got you covered.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Secure storage facilities across major Indian cities</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Inventory management and order fulfillment services</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Customized distribution solutions for businesses</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/request-quote">
                Get a Quote <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-muted sm:min-h-[400px] md:order-2">
            {/* Placeholder for an image - in production, replace with an actual image */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
              <p>Warehousing & Distribution Image</p>
            </div>
          </div>
        </div>
      </div>

      {/* Baggage Services */}
      <div id="baggage-services" className="scroll-mt-20">
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-muted sm:min-h-[400px]">
            {/* Placeholder for an image - in production, replace with an actual image */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
              <p>Baggage Services Image</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold">Baggage Services</h2>
            <p className="mb-6 text-muted-foreground">
              Our Baggage Services help travelers and expatriates transport their personal belongings to India. Whether you're relocating, returning home, or sending extra luggage, we make the process simple and stress-free.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Excess baggage shipping solutions</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Relocation baggage expertise</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Special handling for valuable and fragile items</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/request-quote">
                Get a Quote <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Cargo Services */}
      <div id="cargo-services" className="scroll-mt-20">
        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center md:order-1">
            <h2 className="mb-4 text-3xl font-bold">Cargo Services</h2>
            <p className="mb-6 text-muted-foreground">
              Our Cargo Services provide comprehensive solutions for shipping large items, commercial goods, and bulk shipments to India. With our expertise in international logistics, we ensure your cargo reaches its destination efficiently and cost-effectively.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Air and sea freight options</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Commercial cargo and bulk shipment expertise</span>
              </li>
              <li className="flex items-start">
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
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <span className="text-muted-foreground">Complete customs clearance and documentation service</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/request-quote">
                Get a Quote <MoveRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-muted sm:min-h-[400px] md:order-2">
            {/* Placeholder for an image - in production, replace with an actual image */}
            <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
              <p>Cargo Services Image</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="my-16 rounded-xl bg-primary/10 p-8 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">Need a Custom Shipping Solution?</h2>
        <p className="mb-6 mx-auto max-w-2xl text-lg text-muted-foreground">
          Can't find what you're looking for? Contact us for a customized shipping solution tailored to your specific needs.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Button size="lg" asChild>
            <Link href="/request-quote">
              Request a Quote <MoveRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">
              Contact Us <MoveRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 