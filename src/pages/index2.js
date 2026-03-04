import React from "react";
import Banner2 from "../components/banner/Banner2";
import PopularCategory from "../components/home2/PopularCategory";
import FeatureProduct from "../components/home2/FeatureProduct";
import ProductBanner from "../components/home2/ProductBanner";
import SuggestSection from "../components/home2/SuggestSection";
import OfferBanner from "../components/home2/OfferBanner";
import TopSellingProduct from "../components/home2/TopSellingProduct";
import BrandSection from "../components/home2/BrandSection";
import Testimonial from "../components/home2/Testimonial";
import Newsletter from "../components/home2/Newsletter";
import LatestArticle from "../components/home2/LatestArticle";
import BannerFooter from "../components/home2/BannerFooter";
import ProductViewModal from "../components/common/ProductViewModal";

const HomePageTwo = () => {
  return (
    <>
      <ProductViewModal />
      <Banner2 />
      <PopularCategory />
      <FeatureProduct />
      <ProductBanner />
      <SuggestSection />
      <OfferBanner />
      <TopSellingProduct />
      <BrandSection />
      <Testimonial />
      <Newsletter />
      <LatestArticle />
      <BannerFooter />
    </>
  );
};

export default HomePageTwo;
