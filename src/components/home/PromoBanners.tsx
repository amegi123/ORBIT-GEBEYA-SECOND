'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const PromoBanners: React.FC = () => {
  return (
    <section className="w-full max-w-[1650px] mx-auto px-4 md:px-8 py-6 font-sans space-y-6">
      {/* 1. Main Full-Width Promotional Banner Image */}
      <Link href="/all-products" className="block relative w-full h-[220px] sm:h-[300px] md:h-[360px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 group">
        <Image
          src="/img/hero3.webp"
          alt="Audio Showcase Banner"
          fill
          className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
        />
      </Link>

      {/* 2. Dual Promotional Category Banner Cards (Full Banner Images) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Banner Card */}
        <Link href="/#category-dispensers" className="block relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
          <Image
            src="/img/hero2.png"
            alt="Water Dispensers Banner"
            fill
            className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
          />
        </Link>

        {/* Right Banner Card */}
        <Link href="/#category-stoves" className="block relative w-full h-[150px] sm:h-[180px] rounded-2xl overflow-hidden shadow-md border border-slate-200 group">
          <Image
            src="/img/catagories4.webp"
            alt="Kitchen Stoves Banner"
            fill
            className="object-cover object-center group-hover:scale-103 transition-transform duration-500"
          />
        </Link>
      </div>
    </section>
  );
};
