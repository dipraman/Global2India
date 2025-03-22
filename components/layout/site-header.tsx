"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Globe, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdownOpen(!servicesDropdownOpen);
  };

  const linkClassName = (path: string) => {
    return cn(
      "transition-colors duration-200 hover:text-primary relative py-2 font-medium",
      {
        "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary": pathname === path,
        "text-foreground": pathname !== path,
      }
    );
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Globe size={16} />
              <span className="text-sm">Global Logistics Solutions</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Mail size={14} />
              <a href="mailto:info@global2india.com" className="text-sm hover:underline">info@global2india.com</a>
            </div>
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <a href="tel:+919876543210" className="text-sm hover:underline">+91 98765 43210</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          isScrolled ? "bg-white shadow-blue-sm" : "bg-white"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10">
              {/* Replace with your actual logo or use a placeholder */}
              <div className="w-10 h-10 rounded-full bg-blue-gradient flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-primary">Global<span className="text-secondary">2</span>India</span>
              <span className="text-xs text-foreground-muted">International Logistics</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={linkClassName("/")}>
              Home
            </Link>
            <Link href="/about" className={linkClassName("/about")}>
              About
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className={cn(
                  "flex items-center space-x-1 transition-colors duration-200 py-2 font-medium",
                  pathname.startsWith("/services") ? "text-primary" : "text-foreground hover:text-primary"
                )}
                onClick={() => {
                  if (isMobile) toggleServicesDropdown();
                }}
              >
                <span>Services</span>
                <ChevronDown size={16} className="group-hover:transform group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute left-0 mt-2 w-64 rounded-md shadow-blue-md overflow-hidden bg-white z-20 transform opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 origin-top-left">
                <div className="p-1 grid grid-cols-1 gap-1">
                  <Link href="/services/international-courier" className="block p-3 rounded-md hover:bg-background-alt transition-colors">
                    <div className="font-medium text-primary">International Courier</div>
                    <div className="text-sm text-foreground-muted">Fast global shipping solutions</div>
                  </Link>
                  <Link href="/services/medicine-delivery" className="block p-3 rounded-md hover:bg-background-alt transition-colors">
                    <div className="font-medium text-primary">Medicine Delivery</div>
                    <div className="text-sm text-foreground-muted">Reliable healthcare shipping</div>
                  </Link>
                  <Link href="/services/personal-shopping" className="block p-3 rounded-md hover:bg-background-alt transition-colors">
                    <div className="font-medium text-primary">Personal Shopping</div>
                    <div className="text-sm text-foreground-muted">Shop from anywhere in the world</div>
                  </Link>
                </div>
              </div>
            </div>
            
            <Link href="/request-quote" className={linkClassName("/request-quote")}>
              Request Quote
            </Link>
            <Link href="/contact" className={linkClassName("/contact")}>
              Contact
            </Link>
          </nav>

          {/* CTA Button & Admin Link */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/request-quote" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors duration-200 font-medium text-sm">
              Get a Quote
            </Link>
            <Link href="/admin" className="text-primary hover:text-primary-dark transition-colors duration-200 text-sm font-medium">
              Admin Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center justify-center text-foreground"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="container py-6 h-full flex flex-col">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative h-8 w-8">
                  <div className="w-8 h-8 rounded-full bg-blue-gradient flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                </div>
                <span className="font-bold text-lg text-primary">Global<span className="text-secondary">2</span>India</span>
              </Link>
              
              {/* Close Button */}
              <button 
                className="text-foreground"
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex flex-col space-y-4 mt-8">
              <Link 
                href="/"
                className={cn(
                  "px-4 py-3 rounded-md font-medium text-lg",
                  pathname === "/" ? "bg-background-alt text-primary" : "text-foreground"
                )}
              >
                Home
              </Link>
              <Link 
                href="/about"
                className={cn(
                  "px-4 py-3 rounded-md font-medium text-lg",
                  pathname === "/about" ? "bg-background-alt text-primary" : "text-foreground"
                )}
              >
                About
              </Link>
              
              {/* Services Dropdown */}
              <div>
                <button 
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 rounded-md font-medium text-lg",
                    pathname.startsWith("/services") ? "bg-background-alt text-primary" : "text-foreground"
                  )}
                  onClick={toggleServicesDropdown}
                >
                  <span>Services</span>
                  <ChevronDown 
                    size={20} 
                    className={cn(
                      "transition-transform duration-200",
                      servicesDropdownOpen ? "transform rotate-180" : ""
                    )}
                  />
                </button>
                
                {servicesDropdownOpen && (
                  <div className="mt-2 pl-4 space-y-2 border-l-2 border-primary-light ml-4">
                    <Link 
                      href="/services/international-courier"
                      className="block px-4 py-2 text-foreground hover:text-primary transition-colors"
                    >
                      International Courier
                    </Link>
                    <Link 
                      href="/services/medicine-delivery"
                      className="block px-4 py-2 text-foreground hover:text-primary transition-colors"
                    >
                      Medicine Delivery
                    </Link>
                    <Link 
                      href="/services/personal-shopping"
                      className="block px-4 py-2 text-foreground hover:text-primary transition-colors"
                    >
                      Personal Shopping
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                href="/request-quote"
                className={cn(
                  "px-4 py-3 rounded-md font-medium text-lg",
                  pathname === "/request-quote" ? "bg-background-alt text-primary" : "text-foreground"
                )}
              >
                Request Quote
              </Link>
              <Link 
                href="/contact"
                className={cn(
                  "px-4 py-3 rounded-md font-medium text-lg",
                  pathname === "/contact" ? "bg-background-alt text-primary" : "text-foreground"
                )}
              >
                Contact
              </Link>
            </nav>
            
            {/* CTA Button & Admin Link */}
            <div className="mt-auto pt-6 space-y-4">
              <Link 
                href="/request-quote" 
                className="block w-full bg-primary hover:bg-primary-dark text-white text-center px-4 py-3 rounded-md transition-colors duration-200 font-medium"
              >
                Get a Quote
              </Link>
              <Link 
                href="/admin" 
                className="block w-full border border-primary text-primary hover:bg-background-alt text-center px-4 py-3 rounded-md transition-colors duration-200 font-medium"
              >
                Admin Portal
              </Link>
              
              {/* Contact Info */}
              <div className="pt-4 space-y-2 text-sm text-foreground-muted">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-primary" />
                  <a href="mailto:info@global2india.com" className="hover:text-primary">info@global2india.com</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-primary" />
                  <a href="tel:+919876543210" className="hover:text-primary">+91 98765 43210</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 