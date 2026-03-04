import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";

export default function HomeEs() {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const currentLocale = 'es';
  const path = '/es';
  const hrefFor = (locale) => {
    if (locale === 'en') return `${siteUrl}/`;
    return `${siteUrl}/${locale}`;
  };
  const ogLocale = 'es_ES';
  const keywords = 'ropa fitness Miami Florida, tienda de ropa fitness Miami Florida, ropa de gimnasio para mujer Miami Florida, ropa de gimnasio para hombre Miami Florida, ropa de entrenamiento Miami Florida, ropa deportiva fitness Miami Florida, ropa fitness premium Miami Florida, ropa fitness de alto rendimiento Miami Florida, ropa de yoga fitness Miami Florida, ropa fitness para correr Miami Florida, ropa fitness Ciudad de México, ropa fitness CDMX, tienda de ropa fitness Ciudad de México, ropa de gimnasio para mujer CDMX, ropa de gimnasio para hombre CDMX, ropa de entrenamiento Ciudad de México, ropa deportiva fitness CDMX, ropa fitness premium Ciudad de México, ropa fitness de alto rendimiento CDMX, ropa de yoga fitness CDMX';

  return (
    <>
      <Head>
        <title>Dosalga - Ropa Deportiva Premium y Estilo de Vida Activo | Activewear</title>
        <meta name="description" content="Compra ropa deportiva premium en Dosalga. Descubre activewear de alto rendimiento, ropa de gimnasio y prendas lifestyle diseñadas para comodidad, estilo y durabilidad. Envío gratis disponible." />
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
      <TrendingNow />
      <VideoSection />
    </>
  );
}
