import Head from "next/head";
import HeroSlider from "../components/home-uomo/HeroSlider";
import CategoryBanners from "../components/home-uomo/CategoryBanners";
import VideoSection from "../components/home-uomo/VideoSection";
import TrendingNow from "../components/home-uomo/TrendingNow";
import BrandsSlider from "../components/home-uomo/BrandsSlider";
import LatestNews from "../components/home-uomo/LatestNews";

export default function Home() {
  const siteUrl = "https://dosalga.com";
  
  return (
    <>
      <Head>
        <title>Dosalga - Premium Sportswear & Active Lifestyle</title>
        <meta name="description" content="Discover premium sportswear and active lifestyle products for everyone. Quality meets performance." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
        
        {/* Open Graph */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:title" content="Dosalga - Premium Sportswear & Active Lifestyle" />
        <meta property="og:description" content="Discover premium sportswear and active lifestyle products for everyone. Quality meets performance." />
        <meta property="og:site_name" content="Dosalga" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dosalga - Premium Sportswear & Active Lifestyle" />
        <meta name="twitter:description" content="Discover premium sportswear and active lifestyle products for everyone. Quality meets performance." />
      </Head>

      <HeroSlider />
      <CategoryBanners />
      <BrandsSlider />
      <TrendingNow />
      <VideoSection />
      {/* <LatestNews /> */}
    </>
  );
}
