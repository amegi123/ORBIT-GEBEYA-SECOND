'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { superDealsProducts } from '@/data/homeData';
import { useCart } from '@/context/CartContext';
import { ChevronRight, Star, ShoppingCart, Eye } from 'lucide-react';

export const SuperDeals: React.FC = () => {
  const router = useRouter();
  const { addToCart, setQuickViewProduct, triggerPageLoading } = useCart();

  // Ticking Countdown Timer (Days, Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({
    days: 514,
    hours: 6,
    minutes: 43,
    seconds: 36,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 365, hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section id="super-deals" className="w-full max-w-[1650px] mx-auto px-4 md:px-8 py-6 font-sans">
      <div className="bg-[#F0F4FD] rounded-2xl p-4 sm:p-6 border border-blue-100 shadow-sm">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-3">
          <h2 className="text-xl sm:text-2xl font-black text-[#0056B3] tracking-tight uppercase">
            FLASH DEAL
          </h2>

          <Link
            href="/all-products"
            className="text-xs sm:text-sm font-bold text-[#0056B3] hover:underline flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Flash Deal Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* LEFT TIMER BOX (Matching 6Valley Blue Counter Box) */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-2">
            <p className="text-xs font-semibold text-[#0056B3]">
              Hurry Up ! The offer is limited. Grab while it lasts
            </p>

            <div className="bg-[#0056B3] rounded-xl p-4 text-white flex flex-col justify-between flex-1 shadow-md border border-[#004085]">
              {/* 4 Counter Boxes */}
              <div className="grid grid-cols-4 gap-2 pt-2">
                {/* Days */}
                <div className="bg-[#1D68C9] rounded-lg p-2 text-center flex flex-col items-center justify-center">
                  <span className="text-lg sm:text-xl font-black leading-none font-mono">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] text-slate-200 mt-1 font-medium">Days</span>
                </div>

                {/* Hours */}
                <div className="bg-[#1D68C9] rounded-lg p-2 text-center flex flex-col items-center justify-center">
                  <span className="text-lg sm:text-xl font-black leading-none font-mono">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] text-slate-200 mt-1 font-medium">Hours</span>
                </div>

                {/* Minutes */}
                <div className="bg-[#1D68C9] rounded-lg p-2 text-center flex flex-col items-center justify-center">
                  <span className="text-lg sm:text-xl font-black leading-none font-mono">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] text-slate-200 mt-1 font-medium">Minutes</span>
                </div>

                {/* Seconds */}
                <div className="bg-[#1D68C9] rounded-lg p-2 text-center flex flex-col items-center justify-center">
                  <span className="text-lg sm:text-xl font-black leading-none font-mono">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] text-slate-200 mt-1 font-medium">Seconds</span>
                </div>
              </div>

              {/* White Progress Line at Bottom */}
              <div className="pt-6 pb-1">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT CARDS GRID */}
          <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {superDealsProducts.slice(0, 4).map((prod, idx) => (
              <div
                key={prod.id}
                onClick={(e) => {
                  e.preventDefault();
                  triggerPageLoading();
                  router.push(`/product/${prod.id}`);
                }}
                className="group bg-white rounded-xl border border-slate-200/80 p-3 flex flex-col justify-between hover:shadow-lg hover:border-[#0056B3] transition-all duration-300 cursor-pointer relative"
              >
                <div>
                  {/* Image Box */}
                  <div className="relative w-full aspect-square bg-white rounded-lg p-2 overflow-hidden mb-2.5 flex items-center justify-center">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Blue Discount Tag */}
                    {prod.discountPercentage && (
                      <span className="absolute top-1 left-1 bg-[#0056B3] text-white font-black text-[10px] px-2 py-0.5 rounded shadow-sm">
                        -{prod.discountPercentage}%
                      </span>
                    )}

                    {/* Out of Stock banner demo for 1st item */}
                    {idx === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-[#3A3A3A]/90 text-white text-[11px] font-bold text-center py-1">
                        Limited Stock
                      </div>
                    )}

                    {/* Quick View Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setQuickViewProduct({
                          id: prod.id,
                          name: prod.name,
                          currentPrice: prod.price,
                          oldPrice: prod.oldPrice || Math.round(prod.price * 1.2),
                          discountPercentage: prod.discountPercentage || 15,
                          rating: prod.rating,
                          reviewCount: prod.reviewCount,
                          images: [prod.image],
                          sku: 'ORB-FLASH-SKU',
                          brand: 'Orbit',
                          category: prod.category,
                          categoryHierarchy: ['Home', prod.category, prod.name],
                          model: 'MOD-ORBIT',
                          availability: 'In Stock',
                          stockCount: 15,
                          warranty: '2 Years Warranty',
                          shortDescription: prod.name,
                          features: ['Flash Deal Special', 'Fast Addis Ababa Delivery'],
                          colors: [{ name: 'Black', hex: '#000' }],
                          sizes: ['Standard'],
                          specifications: [],
                          fullDescription: '',
                          deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 2, supportedPayments: [] },
                          reviews: [],
                          questions: [],
                          frequentlyBoughtTogether: [],
                        });
                      }}
                      className="hidden sm:flex absolute top-1 right-1 w-7 h-7 rounded-full bg-white/90 text-slate-700 hover:bg-[#0056B3] hover:text-white items-center justify-center shadow transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-[#0056B3] transition-colors">
                    {prod.name}
                  </h3>
                </div>

                {/* Price & Rating */}
                <div className="pt-2 space-y-1 mt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {prod.oldPrice && (
                      <span className="text-[11px] text-slate-400 line-through">
                        {prod.oldPrice.toLocaleString()} ETB
                      </span>
                    )}
                    <span className="text-sm font-black text-slate-900">
                      {prod.price.toLocaleString()} ETB
                    </span>
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center gap-1">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600">({prod.reviewCount})</span>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      addToCart({
                        id: prod.id,
                        name: prod.name,
                        currentPrice: prod.price,
                        oldPrice: prod.oldPrice || Math.round(prod.price * 1.2),
                        discountPercentage: prod.discountPercentage || 15,
                        rating: prod.rating,
                        reviewCount: prod.reviewCount,
                        images: [prod.image],
                        sku: 'ORB-FLASH-SKU',
                        brand: 'Orbit',
                        category: prod.category,
                        categoryHierarchy: ['Home', prod.category, prod.name],
                        model: 'MOD-ORBIT',
                        availability: 'In Stock',
                        stockCount: 15,
                        warranty: '2 Years Warranty',
                        shortDescription: prod.name,
                        features: ['Flash Deal Special', 'Fast Addis Ababa Delivery'],
                        colors: [{ name: 'Black', hex: '#000' }],
                        sizes: ['Standard'],
                        specifications: [],
                        fullDescription: '',
                        deliveryInfo: { freeDelivery: true, location: 'Addis Ababa', estimatedDays: '1 Day', warrantyYears: 2, supportedPayments: [] },
                        reviews: [],
                        questions: [],
                        frequentlyBoughtTogether: [],
                      });
                    }}
                    className="w-full bg-[#0056B3] hover:bg-[#004085] text-white font-bold text-xs py-1.5 rounded-md flex items-center justify-center gap-1 transition-colors shadow-xs mt-2"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-white" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
