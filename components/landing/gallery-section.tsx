'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: '/gallery/pic2.jpg.jpeg',
    alt: 'Raise Request Form',
    title: 'Raise Request',
    icon: '📝'
  },
  {
    src: '/gallery/pic3.png',
    alt: 'Supplier Matching',
    title: 'Smart Matching',
    icon: '🎯'
  },
  {
    src: '/gallery/pic4.jpg.jpeg',
    alt: 'Order Tracking',
    title: 'Live Tracking',
    icon: '📦'
  },
  {
    src: '/gallery/pic5.jpg.jpeg',
    alt: 'Analytics Dashboard',
    title: 'Analytics',
    icon: '📈'
  },
  {
    src: '/gallery/pic6.jpg.jpeg',
    alt: 'Supplier Panel',
    title: 'Supplier Panel',
    icon: '🏭'
  }
];

export function GallerySection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate images for seamless loop
  const duplicatedImages = [...galleryImages, ...galleryImages, ...galleryImages];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Responsive scroll amount based on card width
      const scrollAmount = window.innerWidth < 640 ? 300 : window.innerWidth < 768 ? 344 : 420;
      const newPosition = scrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-900">
            See Spedly in Action
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
            Explore the platform across buyer, supplier, and admin views.
          </p>
        </div>

        {/* Auto-sliding + Manual scroll gallery */}
        <div className="relative group/gallery">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-slate-900" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 md:p-3 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-slate-900" />
          </button>

          <div 
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className={`flex gap-3 sm:gap-4 md:gap-6 ${!isPaused ? 'gallery-slide' : ''}`}>
              {duplicatedImages.map((image, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] group"
                >
                  <div className="rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden bg-white h-full">
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        draggable="false"
                      />
                    </div>
                    <div className="p-3 sm:p-4 md:p-5">
                      <h3 className="font-semibold text-slate-900 text-base md:text-lg">{image.title}</h3>
                      <p className="text-xs md:text-sm text-slate-600 mt-1">Interactive platform view</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-33.333%));
          }
        }

        .gallery-slide {
          animation: slideLeft 40s linear infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
