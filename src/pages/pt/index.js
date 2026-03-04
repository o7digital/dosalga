import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import CategoryBanners from "../../components/home-uomo/CategoryBanners";
import VideoSection from "../../components/home-uomo/VideoSection";
import TrendingNow from "../../components/home-uomo/TrendingNow";

export default function HomePt() {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const currentLocale = 'pt';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}`;
  const ogLocale = 'pt_PT';
  const keywords = 'roupa fitness Miami Florida, loja de roupa fitness Miami Florida, roupa de academia feminina Miami Florida, roupa de academia masculina Miami Florida, roupa de treino Miami Florida, roupa esportiva fitness Miami Florida, roupa fitness premium Miami Florida, roupa fitness de performance Miami Florida, roupa de yoga fitness Miami Florida, roupa fitness para corrida Miami Florida, roupa fitness Cidade do México, roupa fitness CDMX, loja de roupa fitness Cidade do México, roupa de academia feminina CDMX, roupa de academia masculina CDMX, roupa de treino Cidade do México, roupa esportiva fitness CDMX, roupa fitness premium Cidade do México, roupa fitness de performance CDMX, roupa de yoga fitness CDMX';

  return (
    <>
      <Head>
        <title>Dosalga - Activewear Premium & Estilo de Vida Ativo | Roupas de qualidade</title>
        <meta
          name="description"
          content="Conheça o activewear premium da Dosalga: peças técnicas e confortáveis para o dia a dia e treinos, feitas para durar."
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
