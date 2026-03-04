import React from "react";
import Head from "next/head";

const TaxesAndDutiesItPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = {
    en: '/taxes-and-duties',
    es: '/impuestos-y-aranceles',
    de: '/taxes-and-duties',
    fr: '/taxes-and-duties',
    it: '/taxes-and-duties',
    pt: '/taxes-and-duties',
  };
  const currentLocale = 'it';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale] || '/taxes-and-duties'}`;
  const ogLocale = 'it_IT';

  return (
    <>
      <Head>
        <title>Tasse e Dazi | Dosalga</title>
        <meta
          name="description"
          content="Informazioni su tasse e dazi di importazione per gli ordini Dosalga, incluse possibili imposte doganali, IVA e dettagli per consegne negli USA e in Messico."
        />
        <link rel="canonical" href={hrefFor(currentLocale)} />

        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Tasse &amp; Dazi</h1>

                <div className="policy-section mt-5">
                  <h2>Tasse e dazi di importazione</h2>
                  <p>
                    Dosalga opera come rivenditore online internazionale. In base al paese di destinazione, gli ordini possono essere soggetti a dazi, oneri doganali o tasse locali (es. IVA). Tali costi non sono inclusi nel prezzo e restano a carico del cliente.
                  </p>
                  <p>Non possiamo controllare questi oneri né prevederne l’importo.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Ordini verso gli Stati Uniti</h2>
                  <p>In genere non si applica la Sales Tax USA, salvo diverso obbligo di legge. Dosalga non gestisce magazzini o uffici negli Stati Uniti.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Ordini verso il Messico</h2>
                  <p>Le consegne in Messico possono essere soggette a imposte di importazione o IVA applicate da dogane o corrieri alla consegna e sono a carico del cliente.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxesAndDutiesItPage;
