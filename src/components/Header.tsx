'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import {
  Search,
  ShoppingCart,
  Phone,
  Menu,
  X,
  Heart,
  User,
  ChevronDown,
  LayoutGrid,
  Zap,
  Gavel,
} from 'lucide-react';

const EthiopiaFlag: React.FC<{ className?: string }> = ({ className = 'w-4 h-3' }) => (
  <svg className={`${className} rounded-xs overflow-hidden shadow-xs shrink-0 inline-block`} viewBox="0 0 600 400" aria-hidden="true">
    <rect width="600" height="133.3" fill="#009A44" />
    <rect y="133.3" width="600" height="133.3" fill="#FED100" />
    <rect y="266.6" width="600" height="133.3" fill="#E62727" />
    <circle cx="300" cy="200" r="70" fill="#0033A0" />
    <g fill="#FED100">
      <polygon points="300,145 314,185 356,185 322,210 335,250 300,225 265,250 278,210 244,185 286,185" />
    </g>
  </svg>
);

const USFlag: React.FC<{ className?: string }> = ({ className = 'w-4 h-3' }) => (
  <svg className={`${className} rounded-xs overflow-hidden shadow-xs shrink-0 inline-block`} viewBox="0 0 740 390" aria-hidden="true">
    <rect width="740" height="390" fill="#B22234" />
    <rect y="30" width="740" height="30" fill="#FFFFFF" />
    <rect y="90" width="740" height="30" fill="#FFFFFF" />
    <rect y="150" width="740" height="30" fill="#FFFFFF" />
    <rect y="210" width="740" height="30" fill="#FFFFFF" />
    <rect y="270" width="740" height="30" fill="#FFFFFF" />
    <rect y="330" width="740" height="30" fill="#FFFFFF" />
    <rect width="296" height="210" fill="#3C3B6E" />
    <g fill="#FFFFFF">
      <circle cx="30" cy="25" r="7" />
      <circle cx="80" cy="25" r="7" />
      <circle cx="130" cy="25" r="7" />
    </g>
  </svg>
);

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLang, setCurrentLang] = useState<'en' | 'am'>('en');
  const [currency, setCurrency] = useState<'ETB' | 'USD'>('ETB');
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.product.currentPrice * item.quantity, 0);

  const categories = [
    { name: 'Televisions & Audio', href: '/#category-tvs' },
    { name: 'Refrigerators & Cooling', href: '/#category-fridges' },
    { name: 'Washing Machines', href: '/#category-washers' },
    { name: 'Stoves & Kitchenware', href: '/#category-stoves' },
    { name: 'Water Dispensers', href: '/#category-dispensers' },
    { name: 'Phones & Accessories', href: '/all-products?category=Phones' },
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Products', href: '/all-products' },
    { name: 'Offers ▾', href: '/#super-deals' },
    { name: 'Televisions', href: '/#category-tvs' },
    { name: 'Refrigerators', href: '/#category-fridges' },
    { name: 'Washing Machines', href: '/#category-washers' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white font-sans shadow-sm select-none">
      {/* 1. TOP UTILITY BAR (Light Gray Background: #F8F9FA) */}
      <div className="bg-[#F8F9FA] text-slate-600 text-xs border-b border-slate-200 py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Phone Number */}
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <Phone className="w-3.5 h-3.5 text-[#0056B3]" />
            <a href="tel:6226" className="hover:text-[#0056B3] transition-colors font-bold">
              +251 900 00 6226 (Hotline: 6226)
            </a>
          </div>

          {/* Right: Currency & Language Selector */}
          <div className="flex items-center gap-4 text-xs">
            {/* Currency Selector Dropdown */}
            <div className="relative flex items-center gap-1 font-semibold text-slate-700 cursor-pointer hover:text-[#0056B3]">
              <button
                onClick={() => setCurrency(currency === 'ETB' ? 'USD' : 'ETB')}
                className="flex items-center gap-1 focus:outline-none"
              >
                <span>{currency === 'ETB' ? 'ETB Br' : 'USD $'}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative flex items-center gap-1.5 font-semibold text-slate-700 cursor-pointer hover:text-[#0056B3]">
              <button
                onClick={() => setCurrentLang(currentLang === 'en' ? 'am' : 'en')}
                className="flex items-center gap-1.5 focus:outline-none"
              >
                {currentLang === 'en' ? <USFlag className="w-4 h-3" /> : <EthiopiaFlag className="w-4 h-3" />}
                <span>{currentLang === 'en' ? 'English' : 'አማርኛ'}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE MAIN HEADER (White Background) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-md text-slate-700 hover:text-[#0056B3]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative h-10 w-36 sm:h-12 sm:w-44 hover:scale-102 transition-transform">
            <Image
              src="/img/Orbi logo.svg"
              alt="Orbit Electronics Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Center Clean Search Bar with Blue Button */}
        <div className="hidden lg:flex flex-1 max-w-2xl items-center border border-slate-300 rounded-md overflow-hidden bg-white shadow-xs focus-within:border-[#0056B3] focus-within:ring-1 focus-within:ring-[#0056B3]">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-xs text-slate-800 focus:outline-none placeholder:text-slate-400"
          />
          <button className="bg-[#0056B3] hover:bg-[#004085] text-white px-5 py-2.5 transition-colors flex items-center justify-center shrink-0">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Icons (Wishlist, Account, Cart with Text) */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Circular Wishlist Button */}
          <Link
            href="#"
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-700 hover:text-[#0056B3] flex items-center justify-center transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
              0
            </span>
          </Link>

          {/* Circular User Login Account Button */}
          <Link
            href="/login"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-700 hover:text-[#0056B3] flex items-center justify-center transition-colors"
            title="Sign In / Account"
          >
            <User className="w-5 h-5" />
          </Link>

          {/* Cart Icon & Label (Circular Icon + My Cart + Price) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0056B3] flex items-center justify-center transition-colors">
              <ShoppingCart className="w-5 h-5 text-[#0056B3]" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {totalCartCount}
              </span>
            </div>

            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="text-[11px] text-slate-500 font-medium">My cart</span>
              <span className="text-xs font-bold text-slate-900 flex items-center gap-0.5">
                {totalCartPrice.toLocaleString()} {currency}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Dedicated Search Input */}
      <div className="lg:hidden px-4 pb-3">
        <div className="flex items-center border border-slate-300 rounded-md overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 text-xs text-slate-800 focus:outline-none"
          />
          <button className="bg-[#0056B3] text-white px-4 py-2">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. BOTTOM NAVIGATION BAR (Solid Royal Blue Bar: #0056B3) */}
      <nav className="bg-[#0056B3] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Left White Button: Categories ▾ */}
            <div className="relative">
              <button
                onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                className="bg-white text-[#0056B3] font-bold text-xs px-4 py-2.5 rounded-sm flex items-center gap-2 hover:bg-slate-100 transition-colors cursor-pointer my-1.5 shadow-sm"
              >
                <LayoutGrid className="w-4 h-4 text-[#0056B3]" />
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#0056B3]" />
              </button>

              {/* Dropdown Menu for Categories */}
              {showCategoriesMenu && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white text-slate-800 rounded-md shadow-xl border border-slate-200 py-1.5 z-50 animate-fadeIn">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setShowCategoriesMenu(false)}
                      className="block px-4 py-2 text-xs font-semibold hover:bg-blue-50 hover:text-[#0056B3] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nav Menu Links */}
            <div className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-wide">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="py-3 text-white hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right White Pill Button: Auctions / Deals Zone */}
          <div className="hidden sm:block">
            <Link
              href="/#super-deals"
              className="bg-white text-[#0056B3] font-bold text-xs px-4 py-1.5 rounded-md flex items-center gap-1.5 hover:bg-amber-300 hover:text-slate-950 transition-all shadow-sm"
            >
              <Gavel className="w-3.5 h-3.5 text-amber-600" />
              <span>Deals Zone</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#004085] text-white p-4 space-y-3 border-t border-white/10 text-xs">
          <div className="flex flex-col gap-2 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-white/10 text-sm font-semibold flex items-center justify-between text-white"
              >
                <span>{link.name}</span>
                <span className="text-amber-400">➔</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
