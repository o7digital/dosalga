import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import CategoryBanners from "../../components/home-uomo/CategoryBanners";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";
import BrandsSlider from "../../components/home-uomo/BrandsSlider";
import LatestNews from "../../components/home-uomo/LatestNews";

export default function HomeES() {
  const siteUrl = "https://dosalga.com";
  
  return (
    <>
      <Head>
        <title>Dosalga - Ropa Deportiva Premium y Estilo de Vida Activo</title>
        <meta name="description" content="Descubre ropa deportiva premium y productos de estilo de vida activo para todos. La calidad se encuentra con el rendimiento." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
        
        {/* Open Graph */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/es`} />
        <meta property="og:title" content="Dosalga - Ropa Deportiva Premium y Estilo de Vida Activo" />
        <meta property="og:description" content="Descubre ropa deportiva premium y productos de estilo de vida activo para todos. La calidad se encuentra con el rendimiento." />
        <meta property="og:site_name" content="Dosalga" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dosalga - Ropa Deportiva Premium y Estilo de Vida Activo" />
        <meta name="twitter:description" content="Descubre ropa deportiva premium y productos de estilo de vida activo para todos. La calidad se encuentra con el rendimiento." />
      </Head>

      <HeroSlider />
      <CategoryBanners />
      <BrandsSlider />
      <TrendingNow />
      <VideoSection />
      <LatestNews />
    </>
  );
}
