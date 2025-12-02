import Head from "next/head";
import HeroSlider from "../components/home-uomo/HeroSlider";
import CategoryBanners from "../components/home-uomo/CategoryBanners";
import VideoSection from "../components/home-uomo/VideoSection";
import TrendingNow from "../components/home-uomo/TrendingNow";
import BrandsSlider from "../components/home-uomo/BrandsSlider";

export default function Home() {
  return (
    <>
      <Head>
        <title>Dosalga - Premium Sportswear & Active Lifestyle</title>
        <meta name="description" content="Discover premium sportswear and active lifestyle products for everyone. Quality meets performance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
      </Head>

      <HeroSlider />
      <CategoryBanners />
      <VideoSection />
      <BrandsSlider />
      <TrendingNow />
    </>
  );
}
