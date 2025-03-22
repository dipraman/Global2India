'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/components/ui/use-toast'

// Define country options
const countries = [
  { value: 'USA', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'China', label: 'China' },
  { value: 'India', label: 'India' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Other', label: 'Other' }
]

export default function RequestQuotePage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weight: '',
    originCountry: '',
    originPincode: '',
    destinationCountry: '',
    destinationPincode: '',
    hsnCode: '',
    additionalInfo: ''
  })
  
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [calculatedRate, setCalculatedRate] = useState<number | null>(null)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    
    try {
      // Create a CSRF token (in a real app, this would be more secure)
      const csrfToken = `quote-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`
      
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request')
      }
      
      setCalculatedRate(data.calculatedRate)
      setSuccess(true)
      toast({
        title: "Quote Request Submitted",
        description: "Your quote request has been successfully submitted.",
      })
      
      // Reset form after successful submission if not showing the rate
      if (!data.calculatedRate) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          weight: '',
          originCountry: '',
          originPincode: '',
          destinationCountry: '',
          destinationPincode: '',
          hsnCode: '',
          additionalInfo: ''
        })
      }
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || 'Failed to submit quote request',
      })
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">Request a Quote</h1>
        <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
          Fill out the form below to get a customized shipping quote for your cargo. Our team will review your requirements and provide you with competitive rates.
        </p>
      </div>
      
      {success && calculatedRate ? (
        <div className="mx-auto max-w-2xl rounded-lg border bg-card p-8 shadow-sm">
          <div className="text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-3 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Your Quote is Ready!</h2>
            <p className="text-muted-foreground mb-6">Based on your requirements, we have calculated the following rate:</p>
            
            <div className="bg-muted p-6 rounded-md mb-8">
              <span className="text-4xl font-bold text-primary">₹{calculatedRate.toLocaleString()}</span>
              <p className="text-muted-foreground">Estimated shipping cost</p>
            </div>
            
            <p className="mb-6 text-muted-foreground">
              This is an initial estimate based on the information provided. Our team will contact you shortly to confirm the details and discuss any specific requirements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => router.push('/')}>Return to Home</Button>
              <Button variant="outline" onClick={() => { setSuccess(false); setCalculatedRate(null); }}>Request Another Quote</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name" 
                  required 
                />
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address" 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your contact number" 
                    required 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Shipment Details</h2>
              
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight" 
                  name="weight" 
                  type="number" 
                  min="0.1" 
                  step="0.1" 
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight in kilograms" 
                  required 
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Origin</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="originCountry">Country</Label>
                    <Select 
                      value={formData.originCountry} 
                      onValueChange={(value) => handleSelectChange('originCountry', value)}
                    >
                      <SelectTrigger id="originCountry">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="originPincode">ZIP/Postal Code</Label>
                    <Input 
                      id="originPincode" 
                      name="originPincode" 
                      value={formData.originPincode}
                      onChange={handleChange}
                      placeholder="Origin postal code" 
                      required 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Destination</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="destinationCountry">Country</Label>
                    <Select 
                      value={formData.destinationCountry} 
                      onValueChange={(value) => handleSelectChange('destinationCountry', value)}
                    >
                      <SelectTrigger id="destinationCountry">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="destinationPincode">ZIP/Postal Code</Label>
                    <Input 
                      id="destinationPincode" 
                      name="destinationPincode" 
                      value={formData.destinationPincode}
                      onChange={handleChange}
                      placeholder="Destination postal code" 
                      required 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="hsnCode">HSN Code (Optional)</Label>
                <Input 
                  id="hsnCode" 
                  name="hsnCode" 
                  value={formData.hsnCode}
                  onChange={handleChange}
                  placeholder="Harmonized System Code" 
                />
                <p className="text-sm text-muted-foreground mt-1">
                  If you know the HSN code for your product, please provide it for more accurate quotes.
                </p>
              </div>
              
              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea 
                  id="additionalInfo" 
                  name="additionalInfo" 
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any special requirements or details about your shipment" 
                  className="h-24"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={submitting} 
              size="lg"
            >
              {submitting ? 'Submitting...' : 'Get Quote'}
            </Button>
          </form>
        </div>
      )}
    </div>
  )
} 