import React from "react";
import Head from "next/head";

const TaxesAndDutiesFrPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Taxes & Droits de douane | Dosalga</title>
        <meta
          name="description"
          content="Politique sur les taxes et droits de douane pour les commandes Dosalga : frais potentiels, TVA et détails pour les livraisons aux États-Unis et au Mexique."
        />
        <link rel="canonical" href={`${siteUrl}/fr/taxes-and-duties`} />

        <link rel="alternate" hrefLang="en" href={`${siteUrl}/taxes-and-duties`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/impuestos-y-aranceles`} />
        <link rel="alternate" hrefLang="de" href={`${siteUrl}/de/taxes-and-duties`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr/taxes-and-duties`} />
        <link rel="alternate" hrefLang="it" href={`${siteUrl}/it/taxes-and-duties`} />
        <link rel="alternate" hrefLang="pt" href={`${siteUrl}/pt/taxes-and-duties`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/taxes-and-duties`} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Taxes &amp; Droits</h1>

                <div className="policy-section mt-5">
                  <h2>Taxes et droits d’importation</h2>
                  <p>
                    Dosalga opère comme détaillant en ligne international. Selon le pays de destination, des droits de douane, frais ou taxes locales (TVA) peuvent s’appliquer. Ils ne sont pas inclus dans le prix et restent à la charge du client.
                  </p>
                  <p>Nous ne contrôlons pas ces frais et ne pouvons en prévoir le montant.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Commandes vers les États-Unis</h2>
                  <p>En général, pas de Sales Tax américaine sauf obligation légale contraire. Dosalga n’a ni entrepôts ni bureaux aux États-Unis.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Commandes vers le Mexique</h2>
                  <p>Les livraisons au Mexique peuvent être soumises à des taxes d’importation ou TVA perçues par les douanes ou transporteurs à la livraison; elles sont dues par le client.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxesAndDutiesFrPage;
