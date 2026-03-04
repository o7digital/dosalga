import React from "react";
import Head from "next/head";

const TermsAndConditionsEsPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/terms-and-conditions', es: '/terms-and-conditions', de: '/terms-and-conditions', fr: '/terms-and-conditions', it: '/terms-and-conditions', pt: '/terms-and-conditions' };
  const currentLocale = 'es';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'es_ES';

  return (
    <>
      <Head>
        <title>Términos y Condiciones | Dosalga</title>
        <meta
          name="description"
          content="Términos y Condiciones de Venta para compras en Dosalga. Incluye información sobre precios, pagos, envíos, devoluciones, responsabilidad y ley aplicable."
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
                <h1 className="mb-4">Términos y Condiciones</h1>

                <div className="policy-section mt-5">
                  <h2>Términos y Condiciones de Venta</h2>
                </div>

                <div className="policy-section mt-4">
                  <h3>1. Información de la empresa</h3>
                  <p>
                    Dosalga opera como un minorista internacional en línea. La empresa está legalmente registrada en México. Toda
                    comunicación relacionada con pedidos debe realizarse a través de la información de contacto publicada en el sitio
                    web.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>2. Ámbito de aplicación</h3>
                  <p>
                    Estos Términos y Condiciones de Venta aplican a todas las compras realizadas a través del sitio web
                    https://www.dosalga.store. Al realizar un pedido, el cliente confirma haber leído, entendido y aceptado estos
                    Términos sin reserva.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>3. Productos</h3>
                  <p>
                    Dosalga vende productos físicos mediante un modelo de dropshipping internacional. Los productos se envían
                    directamente desde socios de fulfillment externos ubicados fuera del país de residencia del cliente. Las imágenes
                    y descripciones de los productos se proporcionan con fines ilustrativos y pueden diferir ligeramente del artículo
                    entregado.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>4. Precios</h3>
                  <p>
                    Todos los precios mostrados en el sitio web se presentan en la moneda seleccionada y no incluyen aranceles de
                    importación, cargos aduanales ni impuestos locales, salvo que se indique expresamente. Dosalga se reserva el
                    derecho de modificar los precios en cualquier momento. El precio cobrado es el que se muestra en el momento en
                    que se confirma el pedido.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>5. Pago</h3>
                  <p>
                    Los pagos se procesan a través de proveedores de pago externos y seguros. El pedido se considera confirmado solo
                    cuando se ha recibido el pago completo. Dosalga no almacena información de pago.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>6. Impuestos y derechos de aduana</h3>
                  <p>
                    Los aranceles de importación, cargos aduanales, IVA, impuestos sobre las ventas u otros cargos similares impuestos
                    por las autoridades locales no están incluidos en el precio del producto y son responsabilidad exclusiva del
                    cliente. Dosalga no tiene control sobre estos cargos ni puede prever su importe.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>7. Envío y entrega</h3>
                  <p>
                    Los productos se envían internacionalmente. Los plazos de entrega son estimados y pueden variar debido a
                    procedimientos aduanales, demoras del transportista u otros factores externos ajenos al control de Dosalga. Una
                    vez que el pedido se entrega al transportista, la responsabilidad por la entrega recae en el transportista.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>8. Derecho de desistimiento</h3>
                  <p>
                    Debido a la naturaleza internacional y personalizada de la cadena de suministro, el derecho de desistimiento es
                    limitado. Las devoluciones se aceptan únicamente bajo las condiciones descritas en la Política de Devoluciones y
                    Reembolsos.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>9. Devoluciones y reembolsos</h3>
                  <p>
                    Las devoluciones y los reembolsos se rigen por la Política de Devoluciones y Reembolsos disponible en el sitio
                    web. Dosalga se reserva el derecho de rechazar cualquier solicitud de devolución o reembolso que no cumpla con las
                    condiciones establecidas.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>10. Responsabilidad</h3>
                  <p>
                    Dosalga no es responsable de los retrasos causados por autoridades aduaneras o transportistas, restricciones de
                    importación impuestas por los países de destino, ni de daños indirectos o consecuentes relacionados con el uso del
                    producto. La responsabilidad se limita estrictamente al monto pagado por el pedido.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>11. Propiedad intelectual</h3>
                  <p>
                    Todo el contenido del sitio web, incluidos textos, imágenes, logotipos y diseños, es propiedad exclusiva de
                    Dosalga y no puede utilizarse sin consentimiento previo por escrito.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>12. Ley aplicable y jurisdicción</h3>
                  <p>
                    Estos Términos y Condiciones se rigen por la legislación mexicana. Cualquier disputa estará sujeta a la
                    jurisdicción exclusiva de los tribunales competentes en México.
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

export default TermsAndConditionsEsPage;
