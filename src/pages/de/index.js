import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import CategoryBanners from "../../components/home-uomo/CategoryBanners";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";

export default function HomeDe() {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const currentLocale = 'de';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}`;
  const ogLocale = 'de_DE';
  const keywords = 'Fitnessbekleidung Miami Florida, Fitnessbekleidung Shop Miami Florida, Damen Fitnessbekleidung Miami Florida, Herren Fitnessbekleidung Miami Florida, Trainingsbekleidung Miami Florida, Sportbekleidung Fitness Miami Florida, Premium Fitnessbekleidung Miami Florida, Performance Fitnessbekleidung Miami Florida, Yoga Fitnessbekleidung Miami Florida, Lauf Fitnessbekleidung Miami Florida, Fitnessbekleidung Mexiko-Stadt, Fitnessbekleidung CDMX, Fitnessbekleidung Shop Mexiko-Stadt, Damen Fitnessbekleidung CDMX, Herren Fitnessbekleidung CDMX, Trainingsbekleidung Mexiko-Stadt, Sportbekleidung Fitness CDMX, Premium Fitnessbekleidung Mexiko-Stadt, Performance Fitnessbekleidung CDMX, Yoga Fitnessbekleidung CDMX';

  return (
    <>
      <Head>
        <title>Dosalga - Premium Sportbekleidung & Active Lifestyle | Qualitäts-Activewear</title>
        <meta
          name="description"
          content="Entdecke hochwertige Sportbekleidung und Activewear bei Dosalga. Performance-orientierte Kleidung für Alltag und Training, entwickelt für Komfort, Stil und Haltbarkeit."
        />
        <meta name="keywords" content={keywords} />
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
