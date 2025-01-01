import {
  lmsListFeatures,
  forumListFeatures,
  mindMapFeatures,
  whyUsListFeatures,
  playToLearnListFeatures,
  stemListFeatures,
} from "../../../contants/overview-list";
import PlayToLearn from "./product-overview/play-to-learn";
import StemOverview from "./product-overview/steam-component";
import MindMapOverview from "./product-overview/mind-map-overview";
import WhyUsOverview from "./product-overview/why-us-overview";
import BKTForumOverview from "./product-overview/bkt-forum-overview";
import LMSOverview from "./product-overview/lms-overview";

const ProductionOverviewWrapper = () => {
  return (
    <>
      <div className="w-full h-max bg-lms-background bg-no-repeat bg-contain flex flex-col gap-y-96 items-center">
        {/* LMS - 1 */}
        <LMSOverview lmsListFeatures={lmsListFeatures} />
        {/* BKT Forum */}
        <BKTForumOverview forumListFeatures={forumListFeatures} />
      </div>

      {/* Play and Learn */}
      <PlayToLearn playToLearnListFeatures={playToLearnListFeatures} />

      {/* STEM */}
      <StemOverview stemListFeatures={stemListFeatures} />

      {/* Mind map*/}
      <MindMapOverview mindMapFeatures={mindMapFeatures} />

      {/* Why US */}
      <WhyUsOverview whyUsListFeatures={whyUsListFeatures} />
    </>
  );
};

export default ProductionOverviewWrapper;
