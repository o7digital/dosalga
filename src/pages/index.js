import Head from "next/head";
import HeroSlider from "../components/home-uomo/HeroSlider";
import CategoryBanners from "../components/home-uomo/CategoryBanners";
import VideoSection from "../components/home-uomo/VideoSection";
import TrendingNow from "../components/home-uomo/TrendingNow";
import LatestNews from "../components/home-uomo/LatestNews";

export default function Home() {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const currentLocale = 'en';
  const path = '';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${path}`;
  const ogLocale = 'en_US';
  
  return (
    <>
      <Head>
        <title>Dosalga - Premium Sportswear & Active Lifestyle | Quality Athletic Wear</title>
        <meta name="description" content="Shop premium sportswear and activewear at Dosalga. Discover high-performance athletic clothing, gym wear, and lifestyle apparel designed for comfort, style, and durability. Free shipping available." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {/* Hreflang tags */}
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        
        {/* Open Graph */}
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={hrefFor(currentLocale)} />
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
      <TrendingNow />
      <VideoSection />
      {/* <LatestNews /> */}
    </>
  );
}
