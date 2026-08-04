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
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-4 pb-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[440px]">
        {/* LEFT COLUMN: Vertical Category Menu Sidebar (AliExpress/Alibaba Marketplace Style) */}
        <div className="hidden lg:block lg:col-span-3 bg-white rounded-xl shadow-md border border-slate-200 p-3 select-none flex flex-col justify-between">
          <div className="space-y-1">
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
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeCategoryIndex === idx
                      ? 'bg-[#0047AB] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0047AB]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {categoryIcons[cat.id] || <CookingPot className="w-4 h-4" />}
                    <span className="truncate max-w-[140px]">{cat.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 ${
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

        {/* CENTER COLUMN: Main Banner Carousel */}
        <div className="col-span-1 lg:col-span-6 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 min-h-[380px] sm:min-h-[440px] group bg-slate-900">
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
                className="object-cover object-center filter brightness-[0.82]"
                priority={idx === 0}
              />

              {/* Blue Gradient Overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#002F75]/90 via-[#0047AB]/40 to-transparent" />

              {/* Slide Text Content */}
              <div className="relative z-10 h-full p-6 sm:p-10 flex flex-col justify-end text-white space-y-3">
                <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider w-fit shadow-md">
                  <Zap className="w-3 h-3 fill-slate-950" />
                  {slide.tag}
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
                  {slide.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 max-w-md font-medium">
                  {slide.subtitle}
                </p>

                <div className="pt-2">
                  <Link
                    href={slide.ctaLink}
                    onClick={() => triggerPageLoading()}
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Slider Left/Right Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-[#0047AB] text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-[#0047AB] text-white flex items-center justify-center backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slider Progress Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Promotional Member & Deal Cards */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
          {/* Welcome User Card */}
          <div className="bg-gradient-to-br from-[#0047AB] to-[#002F75] text-white rounded-xl p-4 shadow-md border border-[#0047AB]/40 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">
                  OB
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Welcome to Orbit Gebeya</div>
                  <div className="text-[10px] text-slate-300">Member Exclusive Discounts</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 text-[11px] font-bold py-1.5 rounded-lg text-center transition-colors"
                >
                  Join / Sign In
                </Link>
                <Link
                  href="/all-products"
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold py-1.5 rounded-lg text-center border border-white/20 transition-colors"
                >
                  Deals Center
                </Link>
              </div>
            </div>
          </div>

          {/* Small Feature Promo Card 1 */}
          <div className="flex-1 bg-white rounded-xl p-3.5 shadow-md border border-slate-200 flex items-center justify-between gap-3 group hover:border-[#0047AB] transition-colors">
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                MIN 50% OFF
              </span>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#0047AB]">
                Smart 4K TVs Clearance
              </h3>
              <p className="text-[10px] text-slate-500">Limited Stock Available</p>
            </div>
            <div className="relative w-16 h-16 shrink-0 bg-slate-50 rounded-lg overflow-hidden border">
              <Image src="/img/android20orbit65.webp" alt="TV" fill className="object-contain p-1" />
            </div>
          </div>

          {/* Small Feature Promo Card 2 */}
          <div className="flex-1 bg-white rounded-xl p-3.5 shadow-md border border-slate-200 flex items-center justify-between gap-3 group hover:border-[#0047AB] transition-colors">
            <div className="space-y-1">
              <span className="text-[9px] font-extrabold uppercase text-[#0047AB] bg-blue-50 px-2 py-0.5 rounded">
                BEST SELLER
              </span>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#0047AB]">
                Automatic Washers
              </h3>
              <p className="text-[10px] text-slate-500">Free Home Delivery</p>
            </div>
            <div className="relative w-16 h-16 shrink-0 bg-slate-50 rounded-lg overflow-hidden border">
              <Image src="/img/product-washing1.jpeg" alt="Washer" fill className="object-contain p-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
