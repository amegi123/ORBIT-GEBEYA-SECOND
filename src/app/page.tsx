import { HeroBanner } from '@/components/home/HeroBanner';
import { SuperDeals } from '@/components/home/SuperDeals';
import { ShopByCategory } from '@/components/home/ShopByCategory';
import { TopRankingSection } from '@/components/home/TopRankingSection';
import { PromoBanners } from '@/components/home/PromoBanners';
import { CategoryShowcaseGrid } from '@/components/home/CategoryShowcaseGrid';
import { ProductGridSection } from '@/components/home/ProductGridSection';
import { TrustBadges } from '@/components/home/TrustBadges';
import {
  newArrivals,
  bestSellers,
  bundlesOfTheWeek,
  recommendedProducts,
  trendingProducts,
  consumerElectronicsSection,
  appliancesSection,
} from '@/data/homeData';

export default function HomePage() {
  return (
    <div className="w-full bg-[#F4F6F9] space-y-4 pb-16 font-sans">
      {/* 1. Category Sidebar + Center Main Banner + Right Member Widget */}
      <HeroBanner />

      {/* 2. Super Deals / Flash Sales (Min 50% Off + Live Countdown Timer) */}
      <SuperDeals />

      {/* 3. Main Container for Marketplace Grid Sections */}
      <div className="space-y-4">
        {/* Shop by Category Icons Carousel */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ShopByCategory />
        </div>

        {/* 4. Top Ranking & Best Sellers Selection */}
        <TopRankingSection />

        {/* 5. Promotional Mid-Page Feature Banners (3D Audio & Category Dual Banners) */}
        <PromoBanners />

        {/* 6. Consumer Electronics Department Grid */}
        <CategoryShowcaseGrid
          id="consumer-electronics"
          title="Televisions, Audio & Sound Systems"
          categoryTag="Consumer Electronics Department"
          products={consumerElectronicsSection}
        />

        {/* 7. Home Appliances Department Grid */}
        <CategoryShowcaseGrid
          id="home-appliances"
          title="Refrigerators, Washers & Kitchen Stoves"
          categoryTag="Home & Kitchen Department"
          products={appliancesSection}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
          {/* 8. New Arrivals Grid */}
          <ProductGridSection
            id="new-arrivals"
            title="New Arrivals"
            subtitle="Discover our latest smart home arrivals"
            products={newArrivals}
            columns={4}
            centeredTitle
          />

          {/* 9. Best Sellers This Week (5-column grid) */}
          <ProductGridSection
            id="best-sellers"
            title="Best Sellers This Week"
            highlightText="Best Sellers"
            products={bestSellers}
            columns={5}
          />

          {/* 10. Bundle of the Week (5-column grid) */}
          <ProductGridSection
            id="bundle-of-the-week"
            title="Bundle of the Week"
            highlightText="Bundle"
            products={bundlesOfTheWeek}
            columns={5}
          />

          {/* 11. Recommended Orbit Products */}
          <ProductGridSection
            id="recommended"
            title="Recommended Orbit Products"
            highlightText="Recommended"
            products={recommendedProducts}
            columns={4}
          />

          {/* 12. Trending Now */}
          <ProductGridSection
            id="trending-now"
            title="Trending Now"
            highlightText="Trending"
            products={trendingProducts}
            columns={4}
          />
        </div>

        {/* 13. Trust & Guarantee Service Badges */}
        <TrustBadges />
      </div>
    </div>
  );
}
