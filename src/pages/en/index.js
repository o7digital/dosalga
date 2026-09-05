import Head from 'next/head';
import HeroSlider from '../../components/home-uomo/HeroSlider';
import ShopPage from '../shop';

export default function HomeEn() {
  return (
    <>
      <Head>
        <title>Dosalga - Premium Sportswear and Active Lifestyle</title>
        <meta name="description" content="Shop premium sportswear and activewear at Dosalga. Discover performance clothing designed for comfort, style, and durability." />
        <link rel="canonical" href="https://www.dosalga.online/en" />
        <link rel="alternate" hrefLang="en" href="https://www.dosalga.online/en" />
        <link rel="alternate" hrefLang="es" href="https://www.dosalga.online/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.dosalga.online/" />
        <meta property="og:locale" content="en_US" />
      </Head>

      <HeroSlider />
      <ShopPage />
    </>
  );
}
