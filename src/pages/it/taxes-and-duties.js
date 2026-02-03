import React from "react";
import Head from "next/head";

const TaxesAndDutiesItPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Tasse e Dazi | Dosalga</title>
        <meta
          name="description"
          content="Informazioni su tasse e dazi di importazione per gli ordini Dosalga, incluse possibili imposte doganali, IVA e dettagli per consegne negli USA e in Messico."
        />
        <link rel="canonical" href={`${siteUrl}/it/taxes-and-duties`} />

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
