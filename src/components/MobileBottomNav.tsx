'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Zap, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#0056B3] text-white border-t border-white/10 shadow-[0_-4px_16px_rgba(0,0,0,0.2)] select-none">
      <div className="flex items-center justify-around py-1.5 px-1">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 transition-colors ${
            pathname === '/' ? 'text-amber-300 font-extrabold' : 'text-white hover:text-amber-300'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* 2. Categories */}
        <Link
          href="/all-products"
          className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 transition-colors ${
            pathname === '/all-products' ? 'text-amber-300 font-extrabold' : 'text-white hover:text-amber-300'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Categories</span>
        </Link>

        {/* 3. Flash Deals */}
        <Link
          href="/#super-deals"
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 text-amber-300 hover:text-amber-400 font-extrabold transition-colors"
        >
          <Zap className="w-5 h-5 fill-amber-300" />
          <span className="text-[10px] tracking-tight">Deals</span>
        </Link>

        {/* 4. Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center gap-0.5 py-1 px-3 text-white hover:text-amber-300 transition-colors"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </button>

        {/* 5. Account */}
        <Link
          href="/login"
          className="flex flex-col items-center justify-center gap-0.5 py-1 px-3 text-white hover:text-amber-300 transition-colors"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Account</span>
        </Link>
      </div>
    </div>
  );
};
