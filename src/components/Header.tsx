'use client';

import React, { useState, useEffect } from 'react';
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
  MapPin,
  Truck,
  Heart,
  User,
  ChevronDown,
  Sparkles,
  Zap,
  Grid,
} from 'lucide-react';

const EthiopiaFlag: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
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

const USFlag: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
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
  const [searchCategory, setSearchCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'am' | 'en'>('am');

  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categoriesList = [
    'All Categories',
    'Televisions & Audio',
    'Refrigerators & Cooling',
    'Washing Machines',
    'Stoves & Cookers',
    'Water Dispensers',
    'Kitchenware & Ovens',
  ];

  const navLinks = [
    { name: 'SUPER DEALS', href: '/#super-deals', highlight: true },
    { name: 'Top Ranking', href: '/#top-ranking' },
    { name: 'New Arrivals', href: '/#new-arrivals' },
    { name: 'Televisions', href: '/#category-tvs' },
    { name: 'Refrigerators', href: '/#category-fridges' },
    { name: 'Washing Machines', href: '/#category-washers' },
    { name: 'Stoves & Cookers', href: '/#category-stoves' },
    { name: 'Water Dispensers', href: '/#category-dispensers' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-[#0047AB] text-white shadow-lg font-sans">
      {/* Top Announcement Ticker Bar */}
      <div className="bg-[#002F75] text-slate-200 text-[11px] py-1 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-amber-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase">
              HOT
            </span>
            <span className="hidden sm:inline">
              Smart Home, Smart Savings! Free Delivery in Addis Ababa on Orders over 5,000 ETB
            </span>
            <span className="sm:hidden truncate">Free Delivery over 5,000 ETB</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:6226" className="flex items-center gap-1 font-bold text-amber-300 hover:underline">
              <Phone className="w-3 h-3" />
              <span>Hotline: 6226</span>
            </a>
            <button
              onClick={() => setCurrentLang(currentLang === 'am' ? 'en' : 'am')}
              className="flex items-center gap-1 hover:text-amber-300 font-medium transition-colors"
            >
              {currentLang === 'am' ? <EthiopiaFlag className="w-4 h-3" /> : <USFlag className="w-4 h-3" />}
              <span>{currentLang === 'am' ? 'አማርኛ' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Marketplace Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-lg bg-[#003685] text-white hover:text-amber-300"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Orbit Brand Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative h-10 w-40 sm:h-12 sm:w-52 hover:scale-102 transition-transform">
            <Image
              src="/img/Orbi logo.svg"
              alt="Orbit Electronics Logo"
              fill
              className="object-contain object-left drop-shadow-md"
              priority
            />
          </div>
        </Link>

        {/* Integrated Multi-Category Search Bar (AliExpress / Marketplace Style) */}
        <div className="hidden lg:flex flex-1 max-w-2xl items-center bg-white rounded-lg p-0.5 shadow-md border border-[#003685]">
          {/* Category Dropdown Selector inside Search Bar */}
          <div className="relative border-r border-slate-200">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-[#0047AB] bg-slate-50 hover:bg-slate-100 rounded-l-md transition-colors"
            >
              <span className="truncate max-w-[120px]">{searchCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50 text-xs text-slate-800">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSearchCategory(cat);
                      setCategoryDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#0047AB]/10 hover:text-[#0047AB] font-medium transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input Field */}
          <input
            type="text"
            placeholder="Search Smart TV, Refrigerator, Washer, Stove..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-xs text-slate-900 bg-transparent focus:outline-none placeholder:text-slate-400"
          />

          {/* Search Action Button */}
          <button className="bg-[#0047AB] hover:bg-[#003685] text-white px-5 py-2 rounded-r-md font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>

        {/* Right User Actions (Wishlist, Cart, Account) */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Wishlist Icon */}
          <Link href="#" className="hidden sm:flex items-center gap-1.5 text-slate-100 hover:text-amber-300 transition-colors relative">
            <div className="relative">
              <Heart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1.5 bg-amber-400 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </div>
            <div className="hidden xl:flex flex-col text-[10px] leading-none font-medium">
              <span className="text-slate-300">Wishlist</span>
              <span className="font-bold text-white">Favorites</span>
            </div>
          </Link>

          {/* Shopping Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 text-slate-100 hover:text-amber-300 transition-colors p-1"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </div>
            <div className="hidden xl:flex flex-col text-[10px] leading-none text-left">
              <span className="text-slate-300">Shopping Cart</span>
              <span className="font-bold text-amber-300 text-xs">{totalCartCount} Items</span>
            </div>
          </button>

          {/* Account Login Button */}
          <Link
            href="/login"
            className="flex items-center gap-2 bg-white text-[#0047AB] hover:bg-amber-300 hover:text-slate-950 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md shrink-0"
          >
            <User className="w-4 h-4 text-[#0047AB]" />
            <span className="hidden sm:inline">Sign In / Register</span>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar (Visible on mobile/tablet) */}
      <div className="lg:hidden px-4 pb-2.5">
        <div className="flex items-center bg-white rounded-md p-0.5 shadow border border-slate-200">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
          />
          <button className="bg-[#0047AB] text-white p-2 rounded-md">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <nav className="bg-[#003685] border-t border-white/10 hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Left Category Button */}
          <div className="flex items-center gap-2 bg-[#002F75] px-4 py-2.5 text-xs font-bold tracking-wide text-white border-x border-white/10 hover:bg-[#00245C] transition-colors cursor-pointer">
            <Grid className="w-4 h-4 text-amber-400" />
            <span>ALL CATEGORIES</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6 text-xs font-bold tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`py-2.5 transition-colors flex items-center gap-1 ${
                  link.highlight
                    ? 'text-amber-300 hover:text-amber-400 font-extrabold'
                    : 'text-slate-100 hover:text-amber-300'
                }`}
              >
                {link.highlight && <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />}
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Customer Tag */}
          <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gebeya Official Store</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#003685] p-4 space-y-3 border-t border-white/10 text-xs">
          <div className="flex flex-col gap-2 font-medium text-slate-100">
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
