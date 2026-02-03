import React from "react";
import Head from "next/head";

const ReturnsAndRefundsDePage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/returns-and-refunds', es: '/returns-and-refunds', de: '/returns-and-refunds', fr: '/returns-and-refunds', it: '/returns-and-refunds', pt: '/returns-and-refunds' };
  const currentLocale = 'de';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'de_DE';

  return (
    <>
      <Head>
        <title>Rückgaben & Rückerstattungen | Dosalga</title>
        <meta
          name="description"
          content="Richtlinie zu Rückgaben und Rückerstattungen von Dosalga. Bedingungen, zulässige Fälle, Ablauf und Grenzen."
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
                <h1 className="mb-4">Rückgaben &amp; Rückerstattungen</h1>

                <div className="policy-section mt-5">
                  <h2>Rückgaben &amp; Rückerstattungen</h2>
                  <p>Aufgrund unserer internationalen Lieferkette gilt eine konditionale Rückgaberegel.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Rückgaben</h3>
                  <p>Rückgaben sind nur möglich, wenn:</p>
                  <ul>
                    <li>das Produkt beschädigt ankommt</li>
                    <li>das Produkt defekt ist</li>
                    <li>ein falsches Produkt geliefert wurde</li>
                  </ul>
                  <p>
                    Melde dich innerhalb von 7 Tagen nach Lieferung mit Fotos, Bestellnummer und Problembeschreibung. Rückgaben wegen Meinungsänderung, falscher Größe oder Präferenz sind ausgeschlossen.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Rückerstattungen</h3>
                  <p>Genehmigte Erstattungen erfolgen auf die ursprüngliche Zahlungsart und können 5–10 Werktage dauern.</p>
                  <p>Versandkosten, Zölle und Steuern sind nicht erstattungsfähig.</p>
                  <p>Dosalga kann Erstattungen ablehnen, wenn die genannten Bedingungen nicht erfüllt sind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnsAndRefundsDePage;
