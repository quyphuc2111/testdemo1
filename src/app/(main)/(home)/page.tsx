import BannerTop from "./_components/banner-top";
import CarouselFeatures from "./_components/carousel-features";
import ProductionOverviewWrapper from "./_components/production-overview-wrapper";

import ScrollToTop from "@/components/scroll-to-top";

const HomePage = () => {
  return (
    <div className="overflow-x-hidden">
      <BannerTop />
      <CarouselFeatures />
      <ProductionOverviewWrapper />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
