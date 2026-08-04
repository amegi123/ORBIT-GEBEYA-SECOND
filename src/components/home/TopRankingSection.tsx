'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { topRankingProducts } from '@/data/homeData';
import { useCart } from '@/context/CartContext';
import { Award, ChevronRight, Star, ShoppingCart } from 'lucide-react';

export const TopRankingSection: React.FC = () => {
  const router = useRouter();
  const { addToCart, triggerPageLoading } = useCart();

  return (
    <section id="top-ranking" className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4 font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-md">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0047AB] text-amber-300 flex items-center justify-center shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Top Ranking <span className="text-[#0047AB]">& Best Sellers</span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">Most popular items bought by Orbit shoppers</p>
            </div>
          </div>

          <Link
            href="/all-products"
            className="text-xs font-bold text-[#0047AB] hover:underline flex items-center gap-1"
          >
            <span>View Full Ranking</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Top Ranking Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topRankingProducts.map((prod, idx) => (
            <div
              key={prod.id}
              onClick={(e) => {
                e.preventDefault();
                triggerPageLoading();
                router.push(`/product/${prod.id}`);
              }}
              className="group bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between hover:shadow-xl hover:border-[#0047AB] transition-all duration-300 cursor-pointer relative"
            >
              {/* Rank Badge */}
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow">
                {prod.rankBadge || `#${idx + 1} Best Seller`}
              </div>

              <div>
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-white rounded-lg p-3 overflow-hidden mb-3 border border-slate-100 flex items-center justify-center">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Rating & Category */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-700">({prod.reviewCount})</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-[#0047AB] transition-colors">
                    {prod.name}
                  </h3>
                </div>
              </div>

              {/* Price & Cart */}
              <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-black text-slate-900">
                    {prod.price.toLocaleString()} ETB
                  </div>
                  {prod.oldPrice && (
                    <div className="text-[10px] text-slate-400 line-through">
                      {prod.oldPrice.toLocaleString()} ETB
                    </div>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    addToCart({
                      id: prod.id,
                      name: prod.name,
                      currentPrice: prod.price,
                      oldPrice: prod.oldPrice || Math.round(prod.price * 1.2),
                      discountPercentage: 15,
                      rating: prod.rating,
                      reviewCount: prod.reviewCount,
                      images: [prod.image],
                      sku: 'ORB-TOP-SKU',
                      brand: 'Orbit',
                      category: prod.category,
                      categoryHierarchy: ['Home', prod.category, prod.name],
                      model: 'MOD-ORBIT',
                      availability: 'In Stock',
                      stockCount: 20,
                      warranty: '2 Years Warranty',
                      shortDescription: prod.name,
                      features: ['Top Ranking Quality', 'Express Addis Delivery'],
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
                  className="w-8 h-8 rounded-full bg-[#0047AB] hover:bg-[#002F75] text-white flex items-center justify-center transition-colors shadow"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
