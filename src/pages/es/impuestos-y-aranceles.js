import React from "react";
import Head from "next/head";

const ImpuestosYArancelesPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Impuestos y Aranceles de Importación | Dosalga</title>
        <meta
          name="description"
          content="Política de Impuestos y Aranceles de Importación de Dosalga para pedidos internacionales, incluyendo entregas a Estados Unidos y México."
        />
        <link rel="canonical" href={`${siteUrl}/es/impuestos-y-aranceles`} />

        <link rel="alternate" hrefLang="en" href={`${siteUrl}/taxes-and-duties`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/impuestos-y-aranceles`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/taxes-and-duties`} />

        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/es/impuestos-y-aranceles`} />
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
                <h1 className="mb-4">Impuestos y Aranceles de Importación</h1>
                <p>
                  Dosalga opera como un minorista internacional en línea. Todos los productos se envían directamente desde nuestros
                  socios internacionales de cumplimiento y logística.
                </p>

                <div className="policy-section mt-5">
                  <h2>Impuestos y Aranceles de Importación</h2>
                  <p>Dependiendo del país de destino, su pedido puede estar sujeto a:</p>
                  <ul>
                    <li>Aranceles de importación</li>
                    <li>Gastos aduanales</li>
                    <li>Impuestos locales (incluyendo IVA u otros impuestos similares)</li>
                  </ul>
                  <p>
                    Estos cargos no están incluidos en el precio del producto, salvo que se indique expresamente, y son
                    responsabilidad exclusiva del cliente. Dosalga no tiene control sobre dichos cargos ni puede prever su importe.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Pedidos a Estados Unidos</h2>
                  <p>
                    Los pedidos enviados a Estados Unidos no están sujetos al impuesto sobre las ventas (Sales Tax), salvo que la ley
                    aplicable disponga lo contrario. Dosalga no opera actualmente oficinas físicas, almacenes ni inventario dentro de
                    los Estados Unidos.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Pedidos a México</h2>
                  <p>
                    Para los pedidos entregados en México, las autoridades aduaneras o los transportistas pueden aplicar impuestos de
                    importación o IVA en el momento de la entrega. Dichos cargos se determinan conforme a la normativa local y deben
                    ser cubiertos por el cliente.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <p>
                    Al realizar un pedido, usted acepta cumplir con las regulaciones aduaneras de su país y pagar los impuestos o
                    aranceles que correspondan.
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
