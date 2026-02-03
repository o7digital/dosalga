import React from "react";
import Head from "next/head";

const ShippingPolicyPtPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/shipping-policy', es: '/shipping-policy', de: '/shipping-policy', fr: '/shipping-policy', it: '/shipping-policy', pt: '/shipping-policy' };
  const currentLocale = 'pt';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'pt_PT';

  return (
    <>
      <Head>
        <title>Política de Envios | Dosalga</title>
        <meta
          name="description"
          content="Política de envios da Dosalga para pedidos internacionais: prazos, processamento e responsabilidades de envio."
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
                <h1 className="mb-4">Política de Envios</h1>

                <div className="policy-section mt-5">
                  <h2>Política de Envios</h2>
                  <p>
                    A Dosalga envia internacionalmente por parceiros logísticos confiáveis. Os produtos partem diretamente de centros de fulfillment fora do país de destino.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Prazos de entrega</h3>
                  <p>
                    Estimativa de 10–20 dias úteis, dependendo do destino, desembaraço aduaneiro e transportadora. Os prazos são estimativas e podem variar.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Processamento de pedidos</h3>
                  <p>
                    Pedidos são processados normalmente em 2–5 dias úteis antes do envio. Um código de rastreio é fornecido quando disponível.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Responsabilidade de envio</h3>
                  <p>
                    Após a entrega à transportadora, a responsabilidade passa a ela. A Dosalga não se responsabiliza por atrasos, retenções alfandegárias ou problemas causados por autoridades, transportadoras ou informações incorretas de entrega.
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

export default ShippingPolicyPtPage;
