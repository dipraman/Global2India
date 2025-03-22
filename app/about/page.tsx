import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Us | Global2India',
  description: 'Learn about Global2India - our mission, vision, and values in providing reliable international forwarding services to India.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">About Global2India</h1>
        <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
          Your trusted partner for reliable international forwarding services to India.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
          <p className="mb-6 text-muted-foreground">
            At Global2India, our mission is to provide reliable, efficient, and cost-effective international forwarding services that connect the world to India. We strive to simplify the complex process of international shipping, making it accessible to businesses and individuals alike.
          </p>
          <h2 className="mb-4 text-2xl font-bold">Our Vision</h2>
          <p className="text-muted-foreground">
            We aspire to be the most trusted international forwarding service provider to India, known for our reliability, transparency, and customer-focused approach. Our vision is to build a global network that makes shipping to India as simple as sending a package locally.
          </p>
        </div>
        <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-muted sm:min-h-[400px]">
          {/* Placeholder for an image - in production, replace with an actual image */}
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <p>Company Image</p>
          </div>
        </div>
      </div>

      <div className="my-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Core Values</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
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
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Reliability</h3>
            <p className="text-muted-foreground">
              We deliver on our promises, ensuring your shipments arrive safely and on time, every time.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
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
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <line x1="10" x2="8" y1="9" y2="9" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Transparency</h3>
            <p className="text-muted-foreground">
              We believe in clear communication and honest pricing with no hidden fees or surprises.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
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
                <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18" />
                <path d="M8 9h8" />
                <path d="M8 15h8" />
                <path d="M9.5 9v6" />
                <path d="M14.5 9v6" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-medium">Excellence</h3>
            <p className="text-muted-foreground">
              We strive for excellence in every aspect of our service, continually improving our processes and systems.
            </p>
          </div>
        </div>
      </div>

      <div className="my-16 rounded-xl bg-muted p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
            <p className="text-muted-foreground">
              Global2India was founded with a simple yet powerful vision: to make international shipping to India accessible, reliable, and hassle-free. Our founders, having experienced the challenges of sending packages to India firsthand, decided to create a service that addresses these pain points.
            </p>
            <p className="mt-4 text-muted-foreground">
              Starting with a small team passionate about customer service, we've grown to become a trusted name in international forwarding. Today, we serve thousands of customers worldwide, connecting them to India with our reliable shipping services.
            </p>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold">Why Choose Us</h2>
            <ul className="space-y-2">
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
                <span className="text-muted-foreground">Experienced team with deep knowledge of India's shipping regulations</span>
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
                <span className="text-muted-foreground">Competitive pricing with no hidden fees</span>
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
                <span className="text-muted-foreground">Reliable tracking system that provides real-time updates</span>
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
                <span className="text-muted-foreground">Dedicated customer support available to assist you at every step</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 