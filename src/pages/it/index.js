import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import CategoryBanners from "../../components/home-uomo/CategoryBanners";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";

export default function HomeIt() {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const currentLocale = 'it';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}`;
  const ogLocale = 'it_IT';
  const keywords = 'abbigliamento fitness Miami Florida, negozio abbigliamento fitness Miami Florida, abbigliamento palestra donna Miami Florida, abbigliamento palestra uomo Miami Florida, abbigliamento da allenamento Miami Florida, abbigliamento sportivo fitness Miami Florida, abbigliamento fitness premium Miami Florida, abbigliamento fitness performance Miami Florida, abbigliamento yoga fitness Miami Florida, abbigliamento running fitness Miami Florida, abbigliamento fitness Città del Messico, abbigliamento fitness CDMX, negozio abbigliamento fitness Città del Messico, abbigliamento palestra donna CDMX, abbigliamento palestra uomo CDMX, abbigliamento da allenamento Città del Messico, abbigliamento sportivo fitness CDMX, abbigliamento fitness premium Città del Messico, abbigliamento fitness performance CDMX, abbigliamento yoga fitness CDMX';

  return (
    <>
      <Head>
        <title>Dosalga - Activewear Premium & Stile di Vita Attivo | Abbigliamento di qualità</title>
        <meta
          name="description"
          content="Scopri l’activewear premium di Dosalga: capi tecnici e confortevoli per la vita quotidiana e l’allenamento, progettati per durare."
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
