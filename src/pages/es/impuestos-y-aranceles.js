import React from "react";
import Head from "next/head";

const ImpuestosYArancelesPage = () => {
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
  const currentLocale = 'es';
  const hrefFor = (locale) => {
    const slug = slugByLocale[locale] || '/taxes-and-duties';
    return `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slug}`;
  };
  const ogLocale = 'es_ES';

  return (
    <>
      <Head>
        <title>Impuestos y Aranceles de Importación | Dosalga</title>
        <meta
          name="description"
          content="Política de Impuestos y Aranceles de Importación de Dosalga para pedidos internacionales, incluyendo entregas a Estados Unidos y México."
        />
        <link rel="canonical" href={hrefFor(currentLocale)} />

        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />

        <meta property="og:locale" content={ogLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={hrefFor(currentLocale)} />
        <meta property="og:title" content="Impuestos y Aranceles de Importación | Dosalga" />
        <meta
          property="og:description"
          content="Consulta la política de Impuestos y Aranceles de Importación de Dosalga para pedidos internacionales."
        />
        <meta property="og:site_name" content="Dosalga" />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Impuestos y Aranceles</h1>

                <div className="policy-section mt-5">
                  <h2>Impuestos y Aranceles de Importación</h2>
                  <p>
                    Dosalga opera como un minorista internacional en línea. Todos los productos se envían directamente desde socios
                    internacionales de cumplimiento.
                  </p>
                  <p>
                    Dependiendo del país de destino, los pedidos pueden estar sujetos a aranceles de importación, cargos aduanales o
                    impuestos locales como el IVA. Estos cargos no están incluidos en el precio del producto, salvo indicación
                    expresa, y son responsabilidad exclusiva del cliente.
                  </p>
                  <p>Dosalga no tiene control sobre estos cargos ni puede prever su importe.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Pedidos a Estados Unidos</h2>
                  <p>
                    Los pedidos enviados a Estados Unidos no están sujetos al impuesto sobre las ventas (Sales Tax), salvo que la ley
                    disponga lo contrario. Dosalga no opera oficinas físicas, almacenes ni inventario dentro de los Estados Unidos.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Pedidos a México</h2>
                  <p>
                    Los pedidos entregados en México pueden estar sujetos a impuestos de importación o IVA aplicados por las
                    autoridades aduaneras o los transportistas al momento de la entrega. Estos cargos deben ser cubiertos por el
                    cliente.
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

export default ImpuestosYArancelesPage;
