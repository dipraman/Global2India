'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/components/ui/use-toast'
import Script from 'next/script'

// Google Maps component
function GoogleMap() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    // Only proceed if the map has been loaded and the container exists
    if (!mapLoaded || !mapRef.current) return;
    
    // Initialize the map
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 19.0760, lng: 72.8777 }, // Mumbai coordinates
      zoom: 14,
      mapTypeControl: false,
      streetViewControl: false,
    });

    // Add a marker for the office location
    new google.maps.Marker({
      position: { lat: 19.0760, lng: 72.8777 },
      map,
      title: "Global2India Office",
    });
  }, [mapLoaded]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        onLoad={() => setMapLoaded(true)}
      />
      {apiKey ? (
        <div 
          ref={mapRef} 
          className="h-80 w-full rounded-lg border overflow-hidden"
        />
      ) : (
        <div className="h-80 w-full rounded-lg border bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center text-muted-foreground overflow-hidden relative">
          <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1589786742485-0902f0e784d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")'}}></div>
          <div className="z-10 p-4 bg-white/80 rounded-lg shadow-sm">
            <p className="font-medium">Map will appear here with a valid Google Maps API key</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function ContactPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    
    try {
      // Create a CSRF token (in a real app, this would be more secure)
      const csrfToken = `contact-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact form')
      }
      
      setSuccess(true)
      toast({
        title: "Message Sent",
        description: "Your message has been successfully sent. We'll get back to you soon.",
      })
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || 'Failed to send message',
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Contact Us</h1>
        <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
          Have questions or need more information? We're here to help. Get in touch with our team for any inquiries about our services.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Information */}
        <div>
          <h2 className="mb-6 text-2xl font-bold">Our Contact Details</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-primary/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-muted-foreground">info@global2india.com</p>
                <p className="text-muted-foreground">support@global2india.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-primary/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Phone</h3>
                <p className="text-muted-foreground">+1 (123) 456-7890</p>
                <p className="text-muted-foreground">+91 98765 43210</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mr-4 rounded-full bg-primary/10 p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">Address</h3>
                <p className="text-muted-foreground">123 Global Street</p>
                <p className="text-muted-foreground">Mumbai, Maharashtra 400001</p>
                <p className="text-muted-foreground">India</p>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">Our Location</h2>
            <GoogleMap />
          </div>
        </div>
        
        {/* Contact Form */}
        <div>
          <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success ? (
            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3 mx-auto inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Thank You for Your Message!</h3>
              <p className="text-muted-foreground mb-6">
                We have received your inquiry and will get back to you soon.
              </p>
              <Button onClick={() => setSuccess(false)}>Send Another Message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name" 
                  required 
                />
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email" 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number" 
                    required 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Message subject" 
                  required 
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[120px]"
                  placeholder="How can we help you?" 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={submitting}
                size="lg"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
} 