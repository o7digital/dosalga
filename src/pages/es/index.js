import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import CategoryBanners from "../../components/home-uomo/CategoryBanners";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";
import BrandsSlider from "../../components/home-uomo/BrandsSlider";

export default function HomeEs() {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Dosalga - Activewear y estilo de vida</title>
        <meta name="description" content="Activewear cómodo y versátil para el día a día. Calidad y estilo para todos." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
      </Head>

      <HeroSlider />
      <CategoryBanners />
      <BrandsSlider />
      <TrendingNow />
      <VideoSection />
    </>
  );
}
