import React from "react";
import Head from "next/head";
import Link from "next/link";

const ServicesPageEs = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/services', es: '/services', de: '/services', fr: '/services', it: '/services', pt: '/services' };
  const currentLocale = 'es';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'es_ES';
  return (
    <>
    <Head>
      <title>Servicios Dosalga | Guía, soporte y estilo</title>
      <meta name="description" content="Conoce los servicios de Dosalga: guía de producto, atención al cliente y inspiración de estilo para tu activewear." />
      <link rel="canonical" href={hrefFor(currentLocale)} />
      {locales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={hrefFor(currentLocale)} />
      <meta property="og:title" content="Servicios Dosalga" />
      <meta property="og:description" content="Guía de producto, atención al cliente y consejos de estilo para tu compra de activewear." />
    </Head>
    <div className="services-page pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-8 text-center">
            <h1 className="mb-3">Nuestros Servicios</h1>
            <p className="text-muted">
              Los servicios de Dosalga están diseñados para acompañar tu experiencia de compra con orientación clara, soporte ágil e inspiración de estilo.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="service-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Guía de producto y tallas</h2>
              <p>
                Te ayudamos a elegir la talla y el fit correctos con descripciones claras y orientación sencilla para cada prenda de activewear diario.
              </p>
            </div>

            <div className="service-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Atención al cliente y soporte de pedidos</h2>
              <p>
                Desde pedidos y envíos hasta devoluciones simples, nuestro equipo ofrece asistencia rápida y transparente en cada paso.
              </p>
            </div>

            <div className="service-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Inspiración de estilo y estilo de vida</h2>
              <p>
                Descubre ideas de outfits y tips de activewear diario que van del estudio a la calle, ayudándote a crear un guardarropa versátil con confianza.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <Link href="/contact" className="btn btn-dark">
              ¿Necesitas ayuda? Contacta a nuestro equipo de soporte.
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ServicesPageEs;
