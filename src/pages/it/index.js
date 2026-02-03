import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import CategoryBanners from "../../components/home-uomo/CategoryBanners";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";

export default function HomeIt() {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Dosalga - Activewear Premium & Stile di Vita Attivo | Abbigliamento di qualità</title>
        <meta
          name="description"
          content="Scopri l’activewear premium di Dosalga: capi tecnici e confortevoli per la vita quotidiana e l’allenamento, progettati per durare."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={`${siteUrl}/it`} />

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
