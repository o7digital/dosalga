import React from "react";
import Head from "next/head";

const TaxesAndDutiesPtPage = () => {
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
  const currentLocale = 'pt';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale] || '/taxes-and-duties'}`;
  const ogLocale = 'pt_PT';

  return (
    <>
      <Head>
        <title>Impostos & Taxas | Dosalga</title>
        <meta
          name="description"
          content="Política de impostos e taxas de importação para pedidos Dosalga, incluindo possíveis tarifas, IVA e detalhes para entregas nos EUA e México."
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
                <h1 className="mb-4">Impostos &amp; Taxas</h1>

                <div className="policy-section mt-5">
                  <h2>Impostos e taxas de importação</h2>
                  <p>
                    A Dosalga atua como varejista online internacional. Dependendo do país, os pedidos podem sofrer tarifas de importação, taxas alfandegárias ou impostos locais como IVA. Esses valores não estão incluídos no preço e são de responsabilidade do cliente.
                  </p>
                  <p>Não controlamos esses encargos nem podemos prever seu valor.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Pedidos para os Estados Unidos</h2>
                  <p>Em geral, não se aplica Sales Tax dos EUA, salvo se exigido por lei. A Dosalga não possui escritórios ou estoques nos EUA.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Pedidos para o México</h2>
                  <p>Entregas no México podem ter impostos de importação ou IVA cobrados por alfândega ou transportadoras na entrega; o pagamento é do cliente.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxesAndDutiesPtPage;
