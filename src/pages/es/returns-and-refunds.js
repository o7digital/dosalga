import React from "react";
import Head from "next/head";

const ReturnsAndRefundsEsPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/returns-and-refunds', es: '/returns-and-refunds', de: '/returns-and-refunds', fr: '/returns-and-refunds', it: '/returns-and-refunds', pt: '/returns-and-refunds' };
  const currentLocale = 'es';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'es_ES';

  return (
    <>
      <Head>
        <title>Devoluciones y Reembolsos | Dosalga</title>
        <meta
          name="description"
          content="Política de Devoluciones y Reembolsos de Dosalga. Consulta las condiciones de devolución, casos elegibles, procesamiento de reembolsos y limitaciones."
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
                <h1 className="mb-4">Devoluciones y Reembolsos</h1>

                <div className="policy-section mt-5">
                  <h2>Devoluciones y Reembolsos</h2>
                  <p>Debido a la naturaleza internacional de nuestra cadena de suministro, Dosalga aplica una política de devoluciones condicional.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Devoluciones</h3>
                  <p>Las devoluciones se aceptan únicamente en las siguientes circunstancias:</p>
                  <ul>
                    <li>El producto llega dañado</li>
                    <li>El producto es defectuoso</li>
                    <li>El producto recibido es incorrecto</li>
                  </ul>
                  <p>
                    El cliente debe contactarnos dentro de los 7 días posteriores a la entrega y proporcionar evidencia fotográfica
                    clara, el número de pedido y una descripción del problema. Las devoluciones por cambio de opinión, talla
                    incorrecta o preferencia personal no son aceptadas.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Reembolsos</h3>
                  <p>Si se aprueba un reembolso, se emitirá al método de pago original. El procesamiento puede tardar de 5 a 10 días hábiles.</p>
                  <p>Los gastos de envío, derechos de aduana e impuestos no son reembolsables.</p>
                  <p>Dosalga se reserva el derecho de rechazar cualquier solicitud de reembolso que no cumpla con las condiciones anteriores.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnsAndRefundsEsPage;
