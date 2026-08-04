'use client';

import React from 'react';
import { Truck, ShieldCheck, Headphones, RefreshCw } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <Truck className="w-6 h-6 text-[#0047AB]" />,
      title: 'Express Local Delivery',
      subtitle: 'Free shipping on orders over 5,000 ETB in Addis Ababa',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#0047AB]" />,
      title: '100% Safe Payment',
      subtitle: 'Verified Telebirr, CBE Bank & Chapa Encrypted Checkout',
    },
    {
      icon: <Headphones className="w-6 h-6 text-[#0047AB]" />,
      title: '24/7 Dedicated Support',
      subtitle: 'Call customer hotline 6226 anytime for immediate support',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#0047AB]" />,
      title: 'Easy 30-Day Return',
      subtitle: 'Official warranty & money-back satisfaction guarantee',
    },
  ];

  return (
    <section className="w-full max-w-[1650px] mx-auto px-4 md:px-8 py-6 font-sans">
      <div className="bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50 rounded-2xl border border-blue-100 p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-3.5 p-2">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-blue-100 flex items-center justify-center shrink-0">
                {badge.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-slate-900">{badge.title}</h4>
                <p className="text-[11px] text-slate-500 font-medium leading-snug">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
