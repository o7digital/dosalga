import React from "react";
import Head from "next/head";

const ShippingPolicyDePage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/shipping-policy', es: '/shipping-policy', de: '/shipping-policy', fr: '/shipping-policy', it: '/shipping-policy', pt: '/shipping-policy' };
  const currentLocale = 'de';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'de_DE';

  return (
    <>
      <Head>
        <title>Versandrichtlinie | Dosalga</title>
        <meta
          name="description"
          content="Versandrichtlinie für internationale Bestellungen bei Dosalga, inklusive Lieferzeiten, Bearbeitung und Verantwortlichkeiten."
        />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:url" content={hrefFor(currentLocale)} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Versandrichtlinie</h1>

                <div className="policy-section mt-5">
                  <h2>Versandrichtlinie</h2>
                  <p>
                    Dosalga versendet weltweit über vertrauenswürdige Logistikpartner. Produkte werden direkt von internationalen Fulfillment-Partnern verschickt.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Lieferzeiten</h3>
                  <p>
                    Voraussichtliche Lieferzeit: 10–20 Werktage je nach Ziel, Zollabfertigung und Carrier. Dies sind Schätzungen und können variieren.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Auftragsbearbeitung</h3>
                  <p>
                    Bestellungen werden in der Regel innerhalb von 2–5 Werktagen vor dem Versand bearbeitet. Nach Versand stellen wir – wenn verfügbar – eine Sendungsverfolgung bereit.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Versandverantwortung</h3>
                  <p>
                    Nach Übergabe an den Carrier übernimmt dieser die Verantwortung. Dosalga haftet nicht für Verzögerungen, Zollanhalte oder Lieferprobleme durch Behörden, Carrier oder falsche Lieferangaben.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicyDePage;
