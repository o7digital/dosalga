import React from "react";
import Head from "next/head";

const ReturnsAndRefundsItPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/returns-and-refunds', es: '/returns-and-refunds', de: '/returns-and-refunds', fr: '/returns-and-refunds', it: '/returns-and-refunds', pt: '/returns-and-refunds' };
  const currentLocale = 'it';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'it_IT';

  return (
    <>
      <Head>
        <title>Resi & Rimborsi | Dosalga</title>
        <meta
          name="description"
          content="Politica di resi e rimborsi di Dosalga: condizioni, casi ammessi, tempi di rimborso e limitazioni."
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
                <h1 className="mb-4">Resi &amp; Rimborsi</h1>

                <div className="policy-section mt-5">
                  <h2>Resi &amp; Rimborsi</h2>
                  <p>A causa della catena di fornitura internazionale applichiamo una politica di reso condizionata.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Resi</h3>
                  <p>I resi sono accettati solo se:</p>
                  <ul>
                    <li>il prodotto arriva danneggiato</li>
                    <li>il prodotto è difettoso</li>
                    <li>il prodotto ricevuto è errato</li>
                  </ul>
                  <p>
                    Contattaci entro 7 giorni dalla consegna con foto, numero ordine e descrizione del problema. Non accettiamo resi per cambio idea, taglia errata o preferenze personali.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Rimborsi</h3>
                  <p>Se approvato, il rimborso viene emesso sul metodo di pagamento originale; l’elaborazione può richiedere 5–10 giorni lavorativi.</p>
                  <p>Spedizione, dazi e tasse non sono rimborsabili.</p>
                  <p>Dosalga può rifiutare richieste che non rispettano le condizioni sopra.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnsAndRefundsItPage;
