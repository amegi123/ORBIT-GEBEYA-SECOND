'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Headphones, Sparkles, Volume2 } from 'lucide-react';

export const PromoBanners: React.FC = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 font-sans space-y-6">
      {/* 1. Main Wide Blue Audio Showcase Banner (Matching Blue Headphones Banner in Image) */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-[#003685] via-[#0047AB] to-[#00A9E0] p-6 sm:p-10 text-white min-h-[220px] flex items-center justify-between">
        <div className="relative z-10 max-w-lg space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow">
            <Volume2 className="w-3 h-3 fill-slate-950" />
            PREMIUM AUDIO EXPERIENCE
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight drop-shadow-md">
            Dive Into 3D Crystal Sound
          </h2>

          <p className="text-xs sm:text-sm text-slate-100 font-medium">
            Discover Orbit Wireless Noise-Canceling Soundbars & Hi-Fi Headphones with 40-hour Battery Life
          </p>

          <div className="pt-2">
            <Link
              href="/all-products"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
            >
              <span>Explore Audio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Headphones Feature Image (Right side) */}
        <div className="hidden md:block relative w-64 h-48 shrink-0">
          <Image
            src="/img/hero3.webp"
            alt="Wireless Headphones"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* 2. Dual Promotional Category Banner Cards (Matching Dual Banners in Image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Banner Card (Beige Theme) */}
        <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#F5EBE6] to-[#EBDCD0] border border-amber-200/60 shadow-md flex items-center justify-between overflow-hidden group">
          <div className="space-y-2 z-10 max-w-[60%]">
            <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest bg-amber-200/80 px-2.5 py-1 rounded-full">
              TRENDING APPLIANCES
            </span>
            <h3 className="text-lg font-black text-slate-900 leading-tight">
              Smart Water Dispensers & Purification
            </h3>
            <p className="text-xs text-slate-600 font-medium">Pure hot & cold water instantly for your family</p>
            <div className="pt-1">
              <Link
                href="/#category-dispensers"
                className="inline-flex items-center gap-1 text-xs font-black text-[#0047AB] hover:underline"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="relative w-36 h-36 shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/img/water1_compressed.webp"
              alt="Water Dispenser"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Right Banner Card (Light Blue Theme) */}
        <div className="relative rounded-2xl p-6 bg-gradient-to-r from-[#E6F3FF] to-[#D5E9FF] border border-blue-200 shadow-md flex items-center justify-between overflow-hidden group">
          <div className="space-y-2 z-10 max-w-[60%]">
            <span className="text-[10px] font-black text-[#0047AB] uppercase tracking-widest bg-blue-200/80 px-2.5 py-1 rounded-full">
              KITCHEN ESSENTIALS
            </span>
            <h3 className="text-lg font-black text-slate-900 leading-tight">
              Gas Cookers & Built-in Ovens
            </h3>
            <p className="text-xs text-slate-600 font-medium">Professional 4-burner stoves with electric oven</p>
            <div className="pt-1">
              <Link
                href="/#category-stoves"
                className="inline-flex items-center gap-1 text-xs font-black text-[#0047AB] hover:underline"
              >
                <span>Shop Stoves</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <div className="relative w-36 h-36 shrink-0 group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/img/stoves50X50.jpeg"
              alt="Stoves"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
