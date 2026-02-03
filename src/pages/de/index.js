import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import CategoryBanners from "../../components/home-uomo/CategoryBanners";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";

export default function HomeDe() {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Dosalga - Premium Sportbekleidung & Active Lifestyle | Qualitäts-Activewear</title>
        <meta
          name="description"
          content="Entdecke hochwertige Sportbekleidung und Activewear bei Dosalga. Performance-orientierte Kleidung für Alltag und Training, entwickelt für Komfort, Stil und Haltbarkeit."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={`${siteUrl}/de`} />

        <link rel="alternate" hrefLang="en" href={`${siteUrl}/`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es`} />
        <link rel="alternate" hrefLang="de" href={`${siteUrl}/de`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr`} />
        <link rel="alternate" hrefLang="it" href={`${siteUrl}/it`} />
        <link rel="alternate" hrefLang="pt" href={`${siteUrl}/pt`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />
      </Head>

      <HeroSlider />
      <CategoryBanners />
      <TrendingNow />
      <VideoSection />
    </>
  );
}
