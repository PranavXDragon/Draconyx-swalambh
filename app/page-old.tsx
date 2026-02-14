import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, TrendingDown, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900">
              <span className="text-base font-bold text-white">S</span>
            </div>
            <span className="text-lg font-semibold text-slate-900">Spedly</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-slate-900 hover:bg-slate-800 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimal */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Emergency Spare Parts.<br/>Delivered Fast.
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Industrial logistics platform connecting factories, suppliers, and technicians for emergency spare part delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register?role=business">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
                For Factories
              </Button>
            </Link>
            <Link href="/register?role=supplier">
              <Button size="lg" variant="outline">
                For Suppliers
              </Button>
            </Link>
            <Link href="/register?role=client">
              <Button size="lg" variant="outline">
                For Technicians
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-semibold text-center text-slate-900 mb-12">
            Industrial Downtime is Expensive
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-semibold text-center text-slate-900 mb-12">
            How Spedly Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      <section id="features" className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-semibold text-center text-slate-900 mb-12">
            Built for Industrial Speed
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 mb-4">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GallerySection />

      <InsightsSection />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-semibold text-center text-slate-900 mb-12">
            Enterprise-Ready Architecture
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, text: 'Secure authentication' },
              { icon: CheckCircle2, text: 'Role-based access control' },
              { icon: Zap, text: 'Scalable infrastructure' },
              { icon: Gauge, text: 'Real-time allocation engine' }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                  <item.icon className="h-6 w-6 text-slate-700" />
                </div>
                <span className="text-lg font-medium text-slate-900">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stop Losing Time to Downtime
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Deploy intelligent spare sourcing across your operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register?role=buyer">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white min-w-[200px] w-full sm:w-auto">
                Get Started Now
              </Button>
            </Link>
            <Link href="/register?role=supplier">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 min-w-[200px] w-full sm:w-auto">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Privacy</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2026 Spedly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
