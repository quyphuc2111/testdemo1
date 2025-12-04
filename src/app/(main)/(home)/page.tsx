import BannerTop from "./_components/banner-top"
import CarouselFeatures from "./_components/carousel-features"
import ProductionOverviewWrapper from "./_components/production-overview-wrapper"

const HomePage = () => {
    return (
        <div className="overflow-x-hidden">
            <BannerTop />
            <CarouselFeatures />
            <ProductionOverviewWrapper />
        </div>
    )
}

export default HomePage