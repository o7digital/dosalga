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
        <title>Dosalga - Ropa Deportiva Premium y Estilo de Vida Activo | Activewear</title>
        <meta name="description" content="Compra ropa deportiva premium en Dosalga. Descubre activewear de alto rendimiento, ropa de gimnasio y prendas lifestyle diseñadas para comodidad, estilo y durabilidad. Envío gratis disponible." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={`${siteUrl}/es`} />
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
