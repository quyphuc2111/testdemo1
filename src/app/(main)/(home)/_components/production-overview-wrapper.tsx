import {
  lmsListFeatures,
  forumListFeatures,
  mindMapFeatures,
  whyUsListFeatures,
  playToLearnListFeatures,
  stemListFeatures,
} from "@/contants/home-content-list";
import PlayToLearn from "./product-overview/play-to-learn";
import StemOverview from "./product-overview/steam-component";
import MindMapOverview from "./product-overview/mind-map-overview";
import WhyUsOverview from "./product-overview/why-us-overview";
import BKTForumOverview from "./product-overview/bkt-forum-overview";
import LMSOverview from "./product-overview/lms-overview";

const ProductionOverviewWrapper = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Group 1 with Background */}
      <div
        className="w-full relative bg-cover bg-center py-20 xl:py-32 flex flex-col gap-20 xl:gap-32 items-center snap-start min-h-screen justify-center"
        style={{ backgroundImage: "url('/images/lms-background.svg')" }}
      >
        <div className="container mx-auto px-4 md:px-8 xl:px-20 flex flex-col gap-24 xl:gap-32">
          <LMSOverview lmsListFeatures={lmsListFeatures} />
          <BKTForumOverview forumListFeatures={forumListFeatures} />
        </div>
      </div>

      {/* Other Sections */}
      <div className="w-full flex flex-col items-center gap-0">
        <div className="w-full snap-start min-h-screen flex items-center justify-center">
          <PlayToLearn playToLearnListFeatures={playToLearnListFeatures} />
        </div>
        <div className="w-full snap-start min-h-screen flex items-center justify-center">
          <StemOverview stemListFeatures={stemListFeatures} />
        </div>
        <div className="w-full snap-start min-h-screen flex items-center justify-center">
          <MindMapOverview mindMapFeatures={mindMapFeatures} />
        </div>
        <div className="w-full snap-start min-h-screen flex items-center justify-center">
          <WhyUsOverview whyUsListFeatures={whyUsListFeatures} />
        </div>
      </div>
    </div>
  );
};

export default ProductionOverviewWrapper;
