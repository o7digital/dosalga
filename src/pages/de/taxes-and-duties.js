import React from "react";
import Head from "next/head";

const TaxesAndDutiesDePage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Steuern & Abgaben | Dosalga</title>
        <meta
          name="description"
          content="Informationen zu Steuern und Importabgaben für Dosalga-Bestellungen, inklusive möglicher Zollgebühren, VAT und Hinweise zu Lieferungen in die USA und Mexiko."
        />
        <link rel="canonical" href={`${siteUrl}/de/taxes-and-duties`} />

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
                <h1 className="mb-4">Steuern &amp; Abgaben</h1>

                <div className="policy-section mt-5">
                  <h2>Importsteuern & Abgaben</h2>
                  <p>
                    Dosalga agiert als internationaler Onlinehändler. Bestellungen können je nach Zielland Importzöllen, Abgaben oder lokalen Steuern (z.B. MwSt.) unterliegen. Diese Kosten sind nicht im Produktpreis enthalten und liegen in der Verantwortung der Kund*innen.
                  </p>
                  <p>Wir haben keinen Einfluss auf diese Gebühren und können deren Höhe nicht vorhersagen.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Bestellungen in die USA</h2>
                  <p>Lieferungen in die USA unterliegen in der Regel keiner US Sales Tax, sofern gesetzlich nichts anderes verlangt wird. Dosalga betreibt keine Lager oder Büros in den USA.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Bestellungen nach Mexiko</h2>
                  <p>Lieferungen nach Mexiko können Importsteuern oder MwSt. unterliegen, die bei Zustellung von Zollbehörden oder Carriern erhoben werden und vom Kunden zu tragen sind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxesAndDutiesDePage;
