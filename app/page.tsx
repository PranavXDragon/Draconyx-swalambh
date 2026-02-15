'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
  ChevronLeft,
  ChevronRight,
  Flame,
  TrendingUp,
  Headphones,
  Rocket,
  Star
} from 'lucide-react';
import { HeroSection } from '@/components/landing/hero-section';
import { GallerySection } from '@/components/landing/gallery-section';
import { InsightsSection } from '@/components/landing/insights-section';

import { Navbar } from '@/components/layout/navbar';

const promoSlides = [
  {
    title: 'Mega Deals on Spare Parts',
    subtitle: 'Up to 40% off on industrial components',
    icon: Flame,
    bg: 'from-orange-500 via-red-500 to-pink-600',
    accent: 'bg-white/20',
    image: '🔥',
  },
  {
    title: 'Trending: Smart Automation',
    subtitle: 'AI-powered allocation is reshaping supply chains',
    icon: TrendingUp,
    bg: 'from-violet-600 via-purple-600 to-indigo-700',
    accent: 'bg-white/20',
    image: '📈',
  },
  {
    title: '24/7 Support & Service',
    subtitle: 'Round-the-clock expert assistance for your operations',
    icon: Headphones,
    bg: 'from-emerald-500 via-teal-500 to-cyan-600',
    accent: 'bg-white/20',
    image: '🎧',
  },
  {
    title: 'Lightning Fast Delivery',
    subtitle: 'Get critical spares delivered in under 4 hours',
    icon: Rocket,
    bg: 'from-amber-500 via-yellow-500 to-orange-500',
    accent: 'bg-white/20',
    image: '🚀',
  },
  {
    title: 'Top Rated by Industry',
    subtitle: 'Trusted by 500+ factories across the nation',
    icon: Star,
    bg: 'from-blue-600 via-sky-500 to-cyan-400',
    accent: 'bg-white/20',
    image: '⭐',
  },
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 2000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <HeroSection />

      {/* Promo Carousel */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-full mx-auto px-2 md:px-4">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* Slides */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {promoSlides.map((slide, i) => {
                const SlideIcon = slide.icon;
                return (
                  <div
                    key={i}
                    className={`min-w-full bg-gradient-to-r ${slide.bg} flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 md:py-20 gap-6 md:gap-12`}
                  >
                    <div className="flex-1 text-center md:text-left">
                      <div className={`inline-flex items-center gap-2 ${slide.accent} rounded-full px-4 py-2 mb-4`}>
                        <SlideIcon className="h-5 w-5 text-white" />
                        <span className="text-white text-sm font-bold uppercase tracking-wider">Featured</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4 leading-tight">
                        {slide.title}
                      </h3>
                      <p className="text-lg md:text-2xl text-white/90 font-medium">
                        {slide.subtitle}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="text-7xl md:text-9xl animate-bounce-subtle">
                        {slide.image}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-2 md:p-3 transition-all duration-200 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5 md:h-7 md:w-7" strokeWidth={3} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white rounded-full p-2 md:p-3 transition-all duration-200 shadow-lg"
            >
              <ChevronRight className="h-5 w-5 md:h-7 md:w-7" strokeWidth={3} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {promoSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
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

      <section id="features" className="bg-slate-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Target, title: 'Intelligent Allocation', anim: 'animate-pulse-glow' },
              { icon: MapPin, title: 'Route Optimization', anim: 'animate-float' },
              { icon: Truck, title: 'Live Tracking', anim: 'animate-bounce-subtle' },
              { icon: BarChart3, title: 'Downtime Analytics', anim: 'animate-graph-rise' },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <feature.icon className={`h-12 w-12 md:h-16 md:w-16 text-orange-400 ${feature.anim}`} strokeWidth={2} />
                <span className="text-base md:text-lg font-extrabold text-white text-center">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white py-2 md:py-3"></div>

      <section className="bg-slate-900 py-4 md:py-6">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex justify-around items-center">
            {[
              { icon: Shield, text: 'Secure Authentication' },
              { icon: CheckCircle2, text: 'Role-based Access' },
              { icon: Zap, text: 'Scalable Infrastructure' },
              { icon: Gauge, text: 'Real-time Engine' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon className="h-8 w-8 md:h-10 md:w-10 text-orange-400" strokeWidth={2} />
                <span className="text-sm md:text-base font-extrabold text-white text-center">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GallerySection />

      <InsightsSection />

      {/* Our Partners Section */}
      <section className="bg-slate-900 py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3 md:mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto px-4">
              Partnering with top manufacturers, suppliers, and technology providers
            </p>
          </div>

          {/* Sliding Partners - Row 1 (left to right) */}
          <div className="relative mb-4 md:mb-6">
            <div className="flex gap-4 md:gap-6 partners-slide-right">
              {[
                { name: 'Tata Steel', category: 'Manufacturing', symbol: '🏭' },
                { name: 'L&T Industries', category: 'Engineering', symbol: '⚙️' },
                { name: 'Mahindra Group', category: 'Automotive', symbol: '🚗' },
                { name: 'Reliance Industries', category: 'Energy', symbol: '⚡' },
                { name: 'JSW Group', category: 'Steel & Energy', symbol: '🔩' },
                { name: 'Adani Ports', category: 'Logistics', symbol: '🚢' },
                { name: 'Tata Steel', category: 'Manufacturing', symbol: '🏭' },
                { name: 'L&T Industries', category: 'Engineering', symbol: '⚙️' },
                { name: 'Mahindra Group', category: 'Automotive', symbol: '🚗' },
                { name: 'Reliance Industries', category: 'Energy', symbol: '⚡' },
                { name: 'JSW Group', category: 'Steel & Energy', symbol: '🔩' },
                { name: 'Adani Ports', category: 'Logistics', symbol: '🚢' },
              ].map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 hover:border-orange-500 transition-all duration-300 min-w-[200px]"
                >
                  <span className="text-2xl md:text-3xl">{partner.symbol}</span>
                  <div>
                    <div className="text-sm md:text-base font-bold text-white whitespace-nowrap">{partner.name}</div>
                    <div className="text-xs text-slate-400">{partner.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sliding Partners - Row 2 (right to left) */}
          <div className="relative mb-8 md:mb-12">
            <div className="flex gap-4 md:gap-6 partners-slide-left">
              {[
                { name: 'Bosch India', category: 'Technology', symbol: '💡' },
                { name: 'ABB India', category: 'Automation', symbol: '🤖' },
                { name: 'Siemens India', category: 'Industrial', symbol: '🔌' },
                { name: 'Hindustan Zinc', category: 'Mining', symbol: '⛏️' },
                { name: 'UltraTech Cement', category: 'Construction', symbol: '🏗️' },
                { name: 'Vedanta Limited', category: 'Resources', symbol: '💎' },
                { name: 'Bosch India', category: 'Technology', symbol: '💡' },
                { name: 'ABB India', category: 'Automation', symbol: '🤖' },
                { name: 'Siemens India', category: 'Industrial', symbol: '🔌' },
                { name: 'Hindustan Zinc', category: 'Mining', symbol: '⛏️' },
                { name: 'UltraTech Cement', category: 'Construction', symbol: '🏗️' },
                { name: 'Vedanta Limited', category: 'Resources', symbol: '💎' },
              ].map((partner, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 hover:border-orange-500 transition-all duration-300 min-w-[200px]"
                >
                  <span className="text-2xl md:text-3xl">{partner.symbol}</span>
                  <div>
                    <div className="text-sm md:text-base font-bold text-white whitespace-nowrap">{partner.name}</div>
                    <div className="text-xs text-slate-400">{partner.category}</div>
                  </div>
                </div>
              ))}
            </div>
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
              <div key={i} className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-sm hover:shadow-md hover:border-orange-500 transition-all duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500/20">
                    <category.icon className="h-7 w-7 text-orange-400" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                <div className="text-2xl font-bold text-orange-400 mb-2">{category.count}</div>
                <p className="text-slate-400 text-sm">{category.description}</p>
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


    </div>
  );
}
