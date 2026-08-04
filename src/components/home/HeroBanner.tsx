'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Smart Home Banner',
    image: '/img/hero2.png',
  },
  {
    id: 2,
    title: 'Cooling Technology Banner',
    image: '/img/hero3.webp',
  },
  {
    id: 3,
    title: 'Cooking Stoves Banner',
    image: '/img/catagories4.webp',
  },
];

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-[1650px] mx-auto px-4 md:px-8 pt-4 pb-4 font-sans">
      {/* 16:9 ASPECT RATIO FULL WIDTH HERO BANNER */}
      <div className="relative w-full aspect-[16/9] max-h-[580px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 group bg-slate-900">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Slider Left/Right Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-[#0056B3] text-white flex items-center justify-center backdrop-blur-sm transition-colors shadow-md cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-[#0056B3] text-white flex items-center justify-center backdrop-blur-sm transition-colors shadow-md cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Progress Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
