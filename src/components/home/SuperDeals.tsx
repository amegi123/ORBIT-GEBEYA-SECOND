'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { superDealsProducts } from '@/data/homeData';
import { useCart } from '@/context/CartContext';
import { Zap, ChevronRight, ShoppingCart, Eye } from 'lucide-react';

export const SuperDeals: React.FC = () => {
  const router = useRouter();
  const { addToCart, setQuickViewProduct, triggerPageLoading } = useCart();

  // Ticking Countdown Timer (Hours, Minutes, Seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 28 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <section id="super-deals" className="w-full max-w-[1650px] mx-auto px-4 md:px-8 py-6 font-sans">
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-amber-50 rounded-2xl border border-blue-200 p-4 sm:p-6 shadow-md">
        {/* Header Bar: Title + Timer + View All Link */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-blue-200/80 pb-4 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#0047AB] text-white px-3 py-1 rounded-lg shadow-sm font-black text-sm uppercase">
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
              <span>SUPER DEALS</span>
            </div>

            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2.5 py-1 rounded-md">
              Min 50% Off
            </span>

            {/* Ticking Timer Box */}
            <div className="flex items-center gap-1 text-xs font-bold text-slate-800 ml-1">
              <span className="text-slate-500 font-medium">Ends in:</span>
              <div className="flex items-center gap-1">
                <span className="bg-[#0047AB] text-white px-2 py-0.5 rounded font-mono text-xs font-black">
                  {formatNumber(timeLeft.hours)}
                </span>
                <span>:</span>
                <span className="bg-[#0047AB] text-white px-2 py-0.5 rounded font-mono text-xs font-black">
                  {formatNumber(timeLeft.minutes)}
                </span>
                <span>:</span>
                <span className="bg-[#0047AB] text-white px-2 py-0.5 rounded font-mono text-xs font-black">
                  {formatNumber(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/all-products"
            className="text-xs font-bold text-[#0047AB] hover:text-[#002F75] flex items-center gap-1 transition-colors"
          >
            <span>View All Deals</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Super Deals Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {superDealsProducts.map((prod) => {
            const soldPercentage = prod.soldCount && prod.totalStock
              ? Math.round((prod.soldCount / prod.totalStock) * 100)
              : 75;

            return (
              <div
                key={prod.id}
                onClick={(e) => {
                  e.preventDefault();
                  triggerPageLoading();
                  router.push(`/product/${prod.id}`);
                }}
                className="group bg-white rounded-xl border border-slate-200 p-3 flex flex-col justify-between hover:shadow-xl hover:border-[#0047AB] transition-all duration-300 cursor-pointer relative"
              >
                <div>
                  {/* Image Container with Discount Badge */}
                  <div className="relative w-full aspect-square bg-slate-50 rounded-lg p-2 overflow-hidden mb-2 border border-slate-100 flex items-center justify-center">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Discount Tag */}
                    {prod.discountPercentage && (
                      <span className="absolute top-1.5 left-1.5 bg-red-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded shadow">
                        -{prod.discountPercentage}%
                      </span>
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
                          oldPrice: prod.oldPrice || Math.round(prod.price * 1.3),
                          discountPercentage: prod.discountPercentage || 25,
                          rating: prod.rating,
                          reviewCount: prod.reviewCount,
                          images: [prod.image],
                          sku: 'ORB-SUPER-SKU',
                          brand: 'Orbit',
                          category: prod.category,
                          categoryHierarchy: ['Home', prod.category, prod.name],
                          model: 'MOD-ORBIT',
                          availability: 'In Stock',
                          stockCount: 15,
                          warranty: '2 Years Warranty',
                          shortDescription: prod.name,
                          features: ['Super Deal Promo', 'Express Addis Delivery'],
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
                      className="hidden sm:flex absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-white/90 text-slate-700 hover:bg-[#0047AB] hover:text-white items-center justify-center shadow transition-colors"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Title & Category */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-[#0047AB] uppercase tracking-wider">
                      {prod.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-[#0047AB] transition-colors">
                      {prod.name}
                    </h3>
                  </div>
                </div>

                {/* Price & Sold Progress Bar */}
                <div className="pt-2 space-y-2 border-t border-slate-100 mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-black text-slate-900">
                      {prod.price.toLocaleString()} ETB
                    </span>
                    {prod.oldPrice && (
                      <span className="text-[10px] text-slate-400 line-through">
                        {prod.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Stock Sold Progress Indicator Bar */}
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                        style={{ width: `${soldPercentage}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-slate-500 font-medium">
                      <span>Sold: {prod.soldCount}</span>
                      <span className="text-amber-600 font-bold">{soldPercentage}%</span>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      addToCart({
                        id: prod.id,
                        name: prod.name,
                        currentPrice: prod.price,
                        oldPrice: prod.oldPrice || Math.round(prod.price * 1.3),
                        discountPercentage: prod.discountPercentage || 25,
                        rating: prod.rating,
                        reviewCount: prod.reviewCount,
                        images: [prod.image],
                        sku: 'ORB-SUPER-SKU',
                        brand: 'Orbit',
                        category: prod.category,
                        categoryHierarchy: ['Home', prod.category, prod.name],
                        model: 'MOD-ORBIT',
                        availability: 'In Stock',
                        stockCount: 15,
                        warranty: '2 Years Warranty',
                        shortDescription: prod.name,
                        features: ['Super Deal Promo', 'Express Addis Delivery'],
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
                    className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-1.5 rounded-lg flex items-center justify-center gap-1.5 shadow transition-colors mt-1"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-slate-950" />
                    <span>Claim Deal</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
