import React from "react";
import Head from "next/head";
import Link from "next/link";

const ServicesPagePt = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/services', es: '/services', de: '/services', fr: '/services', it: '/services', pt: '/services' };
  const currentLocale = 'pt';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'pt_PT';
  return (
    <>
    <Head>
      <title>Serviços Dosalga | Guia, suporte e estilo</title>
      <meta name="description" content="Serviços da Dosalga: guia de produto, suporte ao cliente e inspiração de estilo para seu activewear." />
      <link rel="canonical" href={hrefFor(currentLocale)} />
      {locales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={hrefFor(currentLocale)} />
      <meta property="og:title" content="Serviços Dosalga" />
      <meta property="og:description" content="Guia de produto, atendimento ao cliente e ideias de estilo para suas compras de activewear." />
    </Head>
    <div className="services-page pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-8 text-center">
            <h1 className="mb-3">Nossos Serviços</h1>
            <p className="text-muted">
              Os serviços da Dosalga apoiam sua experiência de compra com orientação clara, atendimento rápido e inspiração de estilo para um lifestyle ativo.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="service-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Guia de produto e tamanhos</h2>
              <p>Ajudamos você a escolher o tamanho e o ajuste certos com descrições claras e dicas simples para cada peça.</p>
            </div>

            <div className="service-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Atendimento ao cliente & suporte de pedidos</h2>
              <p>De pedidos e envios a devoluções fáceis, nossa equipe oferece assistência rápida e processos transparentes em cada etapa.</p>
            </div>

            <div className="service-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Inspiração de estilo e lifestyle</h2>
              <p>Encontre ideias de looks e dicas para levar o activewear do estúdio à rua, construindo um guarda-roupa versátil.</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <Link href="/pt/contact" className="btn btn-dark">
              Precisa de ajuda? Fale com nosso suporte.
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ServicesPagePt;
