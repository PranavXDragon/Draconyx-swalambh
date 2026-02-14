'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-slate-900">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold leading-tight text-white">
            Reduce Machine Downtime in Minutes
          </h1>
          
          <p className="mt-6 text-lg text-white/90 max-w-2xl">
            Instant spare allocation with intelligent supplier matching and optimized delivery routing.
          </p>
          
          <div className="mt-6 space-y-3">
            {[
              'Nearest supplier matching',
              'Urgency-based allocation',
              'Real-time tracking',
              'Downtime cost visibility'
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/90">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-white/90">{item}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/register?role=buyer">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto">
                Request Emergency Spare
              </Button>
            </Link>
            <Link href="/register?role=supplier">
              <Button 
                size="lg" 
                className="border-2 border-white bg-slate-800/80 text-white hover:bg-slate-700/90 w-full sm:w-auto font-medium transition-all duration-300"
              >
                Become a Supplier
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
