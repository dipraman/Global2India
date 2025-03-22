import React from "react"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"

interface SiteLayoutProps {
  children: React.ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 bg-background">
        <div className="absolute top-0 right-0 -z-10 overflow-hidden">
          <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-gradient-to-b from-blue-400 to-indigo-600 opacity-20 blur-3xl"></div>
        </div>
        <div className="absolute top-1/2 left-1/4 -z-10 overflow-hidden">
          <div className="absolute h-72 w-72 rounded-full bg-gradient-to-tr from-violet-500 to-purple-500 opacity-10 blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 overflow-hidden">
          <div className="absolute left-0 bottom-0 h-80 w-80 translate-y-1/4 -translate-x-1/3 rounded-full bg-gradient-to-t from-teal-400 to-cyan-400 opacity-15 blur-3xl"></div>
        </div>
        {children}
      </div>
      <SiteFooter />
    </div>
  )
} 