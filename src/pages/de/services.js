import React from "react";
import Head from "next/head";
import Link from "next/link";

const ServicesPageDe = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/services', es: '/services', de: '/services', fr: '/services', it: '/services', pt: '/services' };
  const currentLocale = 'de';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'de_DE';
  return (
    <>
    <Head>
      <title>Dosalga Services | Beratung, Support & Inspiration</title>
      <meta name="description" content="Erfahre mehr über Dosalga: Produkt- und Größenberatung, Kundenservice und Style-Inspiration für Activewear." />
      <link rel="canonical" href={hrefFor(currentLocale)} />
      {locales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={hrefFor(currentLocale)} />
      <meta property="og:title" content="Dosalga Services" />
      <meta property="og:description" content="Beratung, Kundensupport und Style-Ideen für dein Activewear-Shopping." />
    </Head>
    <div className="services-page pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-8 text-center">
            <h1 className="mb-3">Unsere Services</h1>
            <p className="text-muted">
              Die Services von Dosalga unterstützen dein Einkaufserlebnis mit klarer Beratung, schneller Betreuung und Inspiration für einen aktiven Lifestyle.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="service-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Produkt- & Größenberatung</h2>
              <p>
                Wir helfen dir, die passende Größe und den richtigen Fit zu finden – mit klaren Beschreibungen und einfachen Hinweisen zu jeder Activewear.
              </p>
            </div>

            <div className="service-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Kundenservice & Bestell-Support</h2>
              <p>
                Von Bestellung und Versand bis zu unkomplizierten Retouren – wir bieten schnelle Hilfe und transparente Abläufe in jedem Schritt.
              </p>
            </div>

            <div className="service-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Style- & Lifestyle-Inspiration</h2>
              <p>
                Finde Outfit-Ideen und Tipps für Activewear vom Studio bis zur Straße, damit du dir eine vielseitige Garderobe mit Selbstvertrauen aufbaust.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <Link href="/de/contact" className="btn btn-dark">
              Hilfe nötig? Kontaktiere unser Support-Team.
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ServicesPageDe;
