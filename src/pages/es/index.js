import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import CategoryBanners from "../../components/home-uomo/CategoryBanners";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";
import BrandsSlider from "../../components/home-uomo/BrandsSlider";
import LatestNews from "../../components/home-uomo/LatestNews";

export default function HomeES() {
  return (
    <>
      <Head>
        <title>Dosalga - Ropa Deportiva Premium y Estilo de Vida Activo</title>
        <meta name="description" content="Descubre ropa deportiva premium y productos de estilo de vida activo para todos. La calidad se encuentra con el rendimiento." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
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
