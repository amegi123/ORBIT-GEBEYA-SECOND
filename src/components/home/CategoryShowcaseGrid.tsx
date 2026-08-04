'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HomeProduct } from '@/data/homeData';
import { useCart } from '@/context/CartContext';
import { ChevronRight, ShoppingCart, Star, Eye } from 'lucide-react';

interface CategoryShowcaseGridProps {
  id?: string;
  title: string;
  categoryTag: string;
  products: HomeProduct[];
}

export const CategoryShowcaseGrid: React.FC<CategoryShowcaseGridProps> = ({
  id,
  title,
  categoryTag,
  products,
}) => {
  const router = useRouter();
  const { addToCart, setQuickViewProduct, triggerPageLoading } = useCart();

  return (
    <section id={id} className="w-full max-w-[1650px] mx-auto px-4 md:px-8 py-4 font-sans">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-md">
        {/* Department Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-6 bg-[#0047AB] rounded-full" />
            <div>
              <span className="text-[10px] font-black text-[#0047AB] uppercase tracking-wider block">
                {categoryTag}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h2>
            </div>
          </div>

          <Link
            href="/all-products"
            className="text-xs font-bold text-[#0047AB] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6-Column Grid Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {products.map((prod) => (
            <div
              key={prod.id}
              onClick={(e) => {
                e.preventDefault();
                triggerPageLoading();
                router.push(`/product/${prod.id}`);
              }}
              className="group bg-[#FAFAFA] rounded-xl border border-slate-200/80 p-2.5 flex flex-col justify-between hover:shadow-lg hover:border-[#0047AB] hover:bg-white transition-all duration-300 cursor-pointer relative"
            >
              <div>
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-white rounded-lg p-2 overflow-hidden mb-2 border border-slate-100 flex items-center justify-center">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Quick View Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setQuickViewProduct({
                        id: prod.id,
                        name: prod.name,
                        currentPrice: prod.price,
                        oldPrice: prod.oldPrice || Math.round(prod.price * 1.15),
                        discountPercentage: 15,
                        rating: prod.rating,
                        reviewCount: prod.reviewCount,
                        images: [prod.image],
                        sku: 'ORB-SHOWCASE-SKU',
                        brand: 'Orbit',
                        category: prod.category,
                        categoryHierarchy: ['Home', prod.category, prod.name],
                        model: 'MOD-ORBIT',
                        availability: 'In Stock',
                        stockCount: 20,
                        warranty: '2 Years Warranty',
                        shortDescription: prod.name,
                        features: ['Official Orbit Quality', 'Fast Addis Ababa Delivery'],
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
                    className="hidden sm:flex absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-slate-700 hover:bg-[#0047AB] hover:text-white items-center justify-center shadow transition-colors"
                    title="Quick View"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                </div>

                {/* Name */}
                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-[#0047AB] transition-colors">
                  {prod.name}
                </h3>
              </div>

              {/* Price & Cart */}
              <div className="pt-2 border-t border-slate-200/60 mt-2 flex items-center justify-between gap-1">
                <div>
                  <div className="text-xs font-black text-slate-900">
                    {prod.price.toLocaleString()} ETB
                  </div>
                  {prod.oldPrice && (
                    <div className="text-[9px] text-slate-400 line-through">
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
                      oldPrice: prod.oldPrice || Math.round(prod.price * 1.15),
                      discountPercentage: 15,
                      rating: prod.rating,
                      reviewCount: prod.reviewCount,
                      images: [prod.image],
                      sku: 'ORB-SHOWCASE-SKU',
                      brand: 'Orbit',
                      category: prod.category,
                      categoryHierarchy: ['Home', prod.category, prod.name],
                      model: 'MOD-ORBIT',
                      availability: 'In Stock',
                      stockCount: 20,
                      warranty: '2 Years Warranty',
                      shortDescription: prod.name,
                      features: ['Official Orbit Quality', 'Fast Addis Ababa Delivery'],
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
                  className="w-6 h-6 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center transition-colors shadow shrink-0"
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-3 h-3 text-slate-950" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
