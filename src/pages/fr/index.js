import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import CategoryBanners from "../../components/home-uomo/CategoryBanners";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";

export default function HomeFr() {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const currentLocale = 'fr';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}`;
  const ogLocale = 'fr_FR';

  return (
    <>
      <Head>
        <title>Dosalga - Activewear Premium & Lifestyle Actif | Tenues de qualité</title>
        <meta
          name="description"
          content="Découvrez l’activewear premium chez Dosalga : vêtements techniques et confortables pour le quotidien et l’entraînement, pensés pour durer."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        <meta property="og:locale" content={ogLocale} />
      </Head>

      <HeroSlider />
      <CategoryBanners />
      <TrendingNow />
      <VideoSection />
    </>
  );
}
