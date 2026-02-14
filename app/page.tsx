'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { 
  Target,
  MapPin,
  Truck,
  BarChart3,
  CheckCircle2,
  Shield,
  Zap,
  Gauge,
  Factory,
  Package,
  Menu,
  X
} from 'lucide-react';
import { HeroSection } from '@/components/landing/hero-section';
import { GallerySection } from '@/components/landing/gallery-section';
import { InsightsSection } from '@/components/landing/insights-section';
import { DevModePanel } from '@/components/dev-mode-panel';
import { ChatWidget } from '@/components/chat-widget';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useAppStore((state) => state.user);

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-8">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-slate-900">
              <span className="text-base md:text-lg font-bold text-white">S</span>
            </div>
            <span className="text-lg md:text-xl font-bold text-slate-900">Spedly</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
              Features
            </a>
            {user ? (
              <Link href={`/${user.role}/dashboard`}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hover:bg-slate-100">Login</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="flex flex-col space-y-1 px-4 py-4">
              <a 
                href="#how-it-works" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 hover:text-slate-900 font-medium py-3 px-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                How It Works
              </a>
              <a 
                href="#features"
                onClick={() => setMobileMenuOpen(false)} 
                className="text-slate-700 hover:text-slate-900 font-medium py-3 px-3 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Features
              </a>
              {user ? (
                <Link href={`/${user.role}/dashboard`} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start hover:bg-slate-100">Login</Button>
                  </Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <HeroSection />

      <section className="bg-slate-50 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-slate-900 mb-8 md:mb-12">
            Industrial Downtime is Expensive
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                title: 'Unplanned Machine Failure',
                description: 'Halts production instantly.'
              },
              {
                title: 'Manual Spare Procurement',
                description: 'Delays emergency response.'
              },
              {
                title: 'High Downtime Costs',
                description: 'Losses increase every hour.'
              }
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition h-full">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-slate-900 mb-8 md:mb-12">
            How Spedly Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                image: '/steps/step1.jpg',
                title: 'Raise Request',
                description: 'Submit spare requirement with urgency.',
              },
              {
                image: '/steps/step2.jpg',
                title: 'Smart Matching',
                description: 'System identifies nearest available supplier.',
              },
              {
                image: '/steps/step3.jpg',
                title: 'Optimized Delivery',
                description: 'Fast routing with live tracking.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="relative aspect-video bg-slate-100">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-slate-900 mb-8 md:mb-12">
            Built for Industrial Speed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                icon: Target,
                title: 'Intelligent Allocation Engine',
                description: 'Prioritizes by urgency, distance, and stock.',
              },
              {
                icon: MapPin,
                title: 'Route Optimization',
                description: 'Calculates fastest delivery path.',
              },
              {
                icon: Truck,
                title: 'Live Order Tracking',
                description: 'Monitor spare movement.',
              },
              {
                icon: BarChart3,
                title: 'Downtime Analytics',
                description: 'Measure cost impact and performance.',
              },
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-orange-100 mb-3 md:mb-4">
                  <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2 md:mb-3">{feature.title}</h3>
                <p className="text-sm md:text-base text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GallerySection />

      <InsightsSection />

      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl font-semibold text-center text-slate-900 mb-8 md:mb-12">
            Enterprise-Ready Architecture
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, text: 'Secure authentication' },
              { icon: CheckCircle2, text: 'Role-based access control' },
              { icon: Zap, text: 'Scalable infrastructure' },
              { icon: Gauge, text: 'Real-time allocation engine' }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 md:space-x-4 rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
                <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-slate-100 flex-shrink-0">
                  <item.icon className="h-5 w-5 md:h-6 md:w-6 text-slate-700" />
                </div>
                <span className="text-base md:text-lg font-medium text-slate-900">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="bg-slate-50 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-semibold text-slate-900 mb-3 md:mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Partnering with top manufacturers, suppliers, and technology providers to deliver excellence
            </p>
          </div>

          {/* Partner Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 mb-8 md:mb-12">
            {[
              { name: 'Tata Steel', category: 'Manufacturing' },
              { name: 'L&T Industries', category: 'Engineering' },
              { name: 'Mahindra Group', category: 'Automotive' },
              { name: 'Reliance Industries', category: 'Energy' },
              { name: 'JSW Group', category: 'Steel & Energy' },
              { name: 'Adani Ports', category: 'Logistics' },
              { name: 'Bosch India', category: 'Technology' },
              { name: 'ABB India', category: 'Automation' },
              { name: 'Siemens India', category: 'Industrial' },
              { name: 'Hindustan Zinc', category: 'Mining' },
              { name: 'UltraTech Cement', category: 'Construction' },
              { name: 'Vedanta Limited', category: 'Resources' },
            ].map((partner, i) => (
              <div 
                key={i} 
                className="group relative rounded-xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm hover:shadow-lg hover:border-orange-300 transition-all duration-300 flex flex-col items-center justify-center min-h-[120px]"
              >
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-slate-800 mb-1 group-hover:text-orange-600 transition-colors">
                    {partner.name.split(' ')[0].substring(0, 1)}{partner.name.split(' ')[1]?.substring(0, 1) || partner.name.substring(1, 2)}
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-slate-900 mb-1 line-clamp-1">
                    {partner.name}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-1">
                    {partner.category}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              </div>
            ))}
          </div>

          {/* Partner Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Factory,
                title: 'Manufacturing Partners',
                count: '50+ Companies',
                description: 'Leading industrial manufacturers',
              },
              {
                icon: Package,
                title: 'Supplier Network',
                count: '200+ Suppliers',
                description: 'Verified spare parts suppliers',
              },
              {
                icon: Zap,
                title: 'Technology Partners',
                count: '15+ Integrations',
                description: 'ERP & IoT platform integrations',
              },
            ].map((category, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100">
                    <category.icon className="h-7 w-7 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{category.title}</h3>
                <div className="text-2xl font-bold text-orange-600 mb-2">{category.count}</div>
                <p className="text-slate-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Stop Losing Time to Downtime
          </h2>
          <p className="text-base md:text-lg text-slate-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Deploy intelligent spare sourcing across your operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=buyer">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white min-w-[200px] w-full sm:w-auto">
                Get Started Now
              </Button>
            </Link>
            <Link href="/register?role=supplier">
              <Button size="lg" className="border-2 border-white bg-slate-800/80 text-white hover:bg-slate-700/90 min-w-[200px] w-full sm:w-auto font-medium transition-all duration-300">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h4 className="font-semibold text-white mb-2 md:mb-3 text-sm md:text-base">Product</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 md:mb-3 text-sm md:text-base">Company</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 md:mb-3 text-sm md:text-base">Contact</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2 md:mb-3 text-sm md:text-base">Privacy</h4>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-6 md:pt-8 text-center text-xs md:text-sm text-slate-400">
            <p>&copy; 2026 Spedly. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Dev Mode Panel - Quick Dashboard Access */}
      <DevModePanel />

      {/* Chat Widget - Customer Support */}
      <ChatWidget />
    </div>
  );
}
