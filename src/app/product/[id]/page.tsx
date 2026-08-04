import { Breadcrumb } from '@/components/product/Breadcrumb';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { CustomerReviewsSection } from '@/components/product/CustomerReviewsSection';
import { ProductTabs } from '@/components/product/ProductTabs';
import { FrequentlyBoughtTogether } from '@/components/product/FrequentlyBoughtTogether';
import { SimilarProducts } from '@/components/product/SimilarProducts';
import { MobileStickyBar } from '@/components/product/MobileStickyBar';
import { getProductById } from '@/data/mockProduct';

export function generateStaticParams() {
  return [
    { id: 'orbit-tv-65-smart-4k' },
    { id: 'gas-cooker-stove-4b' },
    { id: '10kg-manual-washer' },
    { id: '8kg-auto-toploader' },
    { id: 'side-by-side-fridge' },
  ];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8 pb-16 font-sans">
      {/* 1. Breadcrumb Navigation */}
      <Breadcrumb hierarchy={product.categoryHierarchy} />

      {/* 2. Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column (Images, Gallery) */}
        <div className="lg:col-span-6">
          <ProductGallery
            images={product.images}
            videoUrl={product.videoUrl}
            has360View={product.has360View}
          />
        </div>

        {/* Right Column (Details, Pricing, Buttons) */}
        <div className="lg:col-span-6">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* 3. Customer Reviews Section */}
      <CustomerReviewsSection
        rating={product.rating}
        reviewCount={product.reviewCount}
      />

      {/* 4. Frequently Bought Together Bundle */}
      <FrequentlyBoughtTogether bundles={product.frequentlyBoughtTogether} />

      {/* 5. Sticky Product Tabs (Specs, Installation, FAQs) */}
      <ProductTabs product={product} />

      {/* 6. Similar Products Recommendation Grid */}
      <SimilarProducts />

      {/* 7. Mobile Sticky CTA Bar */}
      <MobileStickyBar product={product} />
    </div>
  );
}
