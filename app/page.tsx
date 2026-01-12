import TopBar from "@/components/layout/header/top-bar";
import Header from "@/components/layout/header/header";
import HeroSlider from "@/components/home/hero-slider";
import SideBanners from "@/components/home/side-banners";
import CategorySection from "@/components/home/category-section";
import ProductSection from "@/components/home/product-section";
import DealSection from "@/components/home/deal-section";
import InstagramFeed from "@/components/home/instagram-feed";
import HeaderNavigation from "@/components/layout/header/header-navigation";

export default function HomePage() {
  return (
    <>
      <section className="py-6">
        <div className="container mx-auto px-4 mt-4">
          <div className="grid grid-cols-[260px_1fr_350px] gap-6 items-stretch">
            <div className="w-[260px]"></div>
            <div className="relative h-[445px] overflow-hidden rounded-xl">
              <HeroSlider />
            </div>
            <div className="w-full h-[445px]">
              <SideBanners />
            </div>
          </div>
        </div>
      </section>
      <CategorySection />
      <ProductSection />
      <DealSection />
      <InstagramFeed />
    </>
  );
}