import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-primary to-primary-dark text-white">
      {/* Main Footer Content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Global2India</h3>
            <div className="h-1 w-10 bg-secondary mb-4"></div>
            <p className="text-sm leading-relaxed mb-4 text-white/80">
              We bridge the gap between India and the world, offering reliable international courier, medicine delivery, and personal shopping services with a commitment to reliability and excellence.
            </p>
            <div className="flex space-x-3 mt-6">
              <a href="#" aria-label="Facebook" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200">
                <Linkedin size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <div className="h-1 w-10 bg-secondary mb-4"></div>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/request-quote" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <div className="h-1 w-10 bg-secondary mb-4"></div>
            <ul className="space-y-2">
              <li>
                <Link href="/services/international-courier" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  International Courier
                </Link>
              </li>
              <li>
                <Link href="/services/medicine-delivery" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  Medicine Delivery
                </Link>
              </li>
              <li>
                <Link href="/services/personal-shopping" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  Personal Shopping
                </Link>
              </li>
              <li>
                <Link href="/services/package-consolidation" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  Package Consolidation
                </Link>
              </li>
              <li>
                <Link href="/services/storage" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center">
                  <ChevronRight size={16} className="mr-2 text-secondary" />
                  Storage Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Reach Us</h3>
            <div className="h-1 w-10 bg-secondary mb-4"></div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={20} className="mr-3 mt-1 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-medium">Email Us:</p>
                  <a href="mailto:info@global2india.com" className="text-white/80 hover:text-white transition-colors duration-200">
                    info@global2india.com
                  </a>
                  <br />
                  <a href="mailto:support@global2india.com" className="text-white/80 hover:text-white transition-colors duration-200">
                    support@global2india.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="mr-3 mt-1 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-medium">Call Us:</p>
                  <a href="tel:+919876543210" className="text-white/80 hover:text-white transition-colors duration-200">
                    +91 98765 43210
                  </a>
                  <br />
                  <a href="tel:+919876543211" className="text-white/80 hover:text-white transition-colors duration-200">
                    +91 98765 43211
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 text-secondary flex-shrink-0" />
                <div>
                  <p className="font-medium">Our Location:</p>
                  <p className="text-white/80">
                    123 Logistics Way, Sector 45,<br />
                    Delhi, India - 110001
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Subscribe */}
      <div className="bg-black/10 py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="text-xl font-bold">Subscribe to Our Newsletter</h4>
              <p className="text-white/70 text-sm mt-1">Get latest offers and updates on our services</p>
            </div>
            <div className="w-full md:w-auto">
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3 rounded-l-md w-full md:w-64 outline-none text-foreground"
                  aria-label="Email for newsletter"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-secondary hover:bg-blue-600 text-white px-4 py-3 rounded-r-md transition-colors duration-200 font-medium"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-black/20 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white/60 text-sm">
              © {currentYear} Global2India. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4 text-sm">
              <Link href="/privacy-policy" className="text-white/60 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-white/60 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-white/60 hover:text-white transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 