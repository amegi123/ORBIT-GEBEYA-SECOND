'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Tv,
  Refrigerator,
  WashingMachine,
  Flame,
  Droplets,
  CookingPot,
  Headphones,
  Smartphone,
  Tag,
  Zap,
} from 'lucide-react';
import { homeCategories } from '@/data/homeData';

const categoryIcons: Record<string, React.ReactNode> = {
  'category-electronics': <Tv className="w-4 h-4 text-[#0047AB]" />,
  'category-[#fridges]': <Refrigerator className="w-4 h-4 text-[#0047AB]" />,
  'category-washers': <WashingMachine className="w-4 h-4 text-[#0047AB]" />,
  'category-kitchen': <Flame className="w-4 h-4 text-[#0047AB]" />,
  'category-phones': <Smartphone className="w-4 h-4 text-[#0047AB]" />,
  'category-computers': <Headphones className="w-4 h-4 text-[#0047AB]" />,
  'category-dispensers': <Droplets className="w-4 h-4 text-[#0047AB]" />,
};

const slides = [
  {
    id: 1,
    tag: 'SMART HOME, SMART SAVINGS!',
    title: 'Upgrade Your Home with Orbit Smart Appliances',
    subtitle: 'Free Express Delivery in Addis Ababa + Official 2-Year Warranty',
    image: '/img/hero2.png',
    ctaLink: '/all-products',
    ctaText: 'Shop Now',
  },
  {
    id: 2,
    tag: 'PREMIUM COOLING TECHNOLOGY',
    title: 'Orbit Inverter Side-by-Side Refrigerators',
    subtitle: 'Keep Food Fresh Longer with Low Power Energy Efficiency',
    image: '/img/hero3.webp',
    ctaLink: '/#category-fridges',
    ctaText: 'Explore Collection',
  },
  {
    id: 3,
    tag: 'HIGH EFFICIENCY COOKING',
    title: 'Heavy Duty Stainless Steel Gas & Electric Stoves',
    subtitle: 'Professional Kitchen Cooking Experience at Unbeatable Prices',
    image: '/img/catagories4.webp',
    ctaLink: '/#category-stoves',
    ctaText: 'Shop Stoves',
  },
];

export const HeroBanner: React.FC = () => {
  const { triggerPageLoading } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  // Auto slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-[1650px] mx-auto px-4 md:px-8 pt-4 pb-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[480px]">
        {/* LEFT COLUMN: Vertical Category Menu Sidebar */}
        <div className="hidden lg:block lg:col-span-3 bg-white rounded-xl shadow-md border border-slate-200 p-3.5 select-none flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="px-3 py-2 text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between mb-1">
              <span>Categories</span>
              <span className="text-[10px] text-[#0047AB] font-bold">Top Picks</span>
            </div>

            {homeCategories.map((cat, idx) => (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveCategoryIndex(idx)}
                onMouseLeave={() => setActiveCategoryIndex(null)}
                className="relative"
              >
                <Link
                  href={`/all-products?category=${encodeURIComponent(cat.name)}`}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategoryIndex === idx
                      ? 'bg-[#0047AB] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0047AB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {categoryIcons[cat.id] || <CookingPot className="w-4.5 h-4.5" />}
                    <span className="truncate text-xs sm:text-sm font-semibold">{cat.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 ${
                      activeCategoryIndex === idx ? 'text-amber-300' : 'text-slate-400'
                    }`}
                  />
                </Link>

                {/* Subcategory Hover Flyout Box */}
                {activeCategoryIndex === idx && cat.subcategories && (
                  <div className="absolute top-0 left-full ml-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-50 animate-fadeIn">
                    <h4 className="text-xs font-black text-[#0047AB] mb-2 border-b pb-1">
                      {cat.name} Subcategories
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {cat.subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            href={`/all-products?category=${encodeURIComponent(sub)}`}
                            className="hover:text-[#0047AB] hover:underline block py-0.5"
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Promotional Pill */}
          <div className="mt-3 p-2.5 bg-gradient-to-r from-[#0047AB]/10 to-amber-400/20 rounded-lg border border-[#0047AB]/20 text-[11px] text-slate-800 flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-[#0047AB]">
              <Tag className="w-3.5 h-3.5 text-amber-500" />
              Member Coupon
            </span>
            <span className="text-amber-600 font-black">500 ETB Off</span>
          </div>
        </div>

        {/* MAIN HERO BANNER CAROUSEL (Expands to 9 columns) */}
        <div className="col-span-1 lg:col-span-9 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 min-h-[420px] sm:min-h-[500px] group bg-slate-900">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image */}
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
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-[#0047AB] text-white flex items-center justify-center backdrop-blur-sm transition-colors shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-[#0047AB] text-white flex items-center justify-center backdrop-blur-sm transition-colors shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Progress Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
