import React from "react";
import Head from "next/head";

const ReturnsAndRefundsPtPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/returns-and-refunds', es: '/returns-and-refunds', de: '/returns-and-refunds', fr: '/returns-and-refunds', it: '/returns-and-refunds', pt: '/returns-and-refunds' };
  const currentLocale = 'pt';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'pt_PT';

  return (
    <>
      <Head>
        <title>Devoluções & Reembolsos | Dosalga</title>
        <meta
          name="description"
          content="Política de Devoluções e Reembolsos da Dosalga: condições, casos elegíveis, prazos e limitações."
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
                <h1 className="mb-4">Devoluções &amp; Reembolsos</h1>

                <div className="policy-section mt-5">
                  <h2>Devoluções &amp; Reembolsos</h2>
                  <p>Devido à cadeia de fornecimento internacional, aplicamos uma política de devoluções condicional.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Devoluções</h3>
                  <p>São aceitas apenas quando:</p>
                  <ul>
                    <li>o produto chega danificado</li>
                    <li>o produto é defeituoso</li>
                    <li>o produto recebido está incorreto</li>
                  </ul>
                  <p>
                    Contate-nos em até 7 dias após a entrega com fotos, número do pedido e descrição do problema. Não aceitamos devoluções por mudança de ideia, tamanho errado ou preferência pessoal.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Reembolsos</h3>
                  <p>Aprovado o caso, o reembolso é emitido para o meio de pagamento original; o processamento pode levar de 5 a 10 dias úteis.</p>
                  <p>Frete, taxas e impostos não são reembolsáveis.</p>
                  <p>A Dosalga pode negar pedidos que não atendam às condições acima.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnsAndRefundsPtPage;
