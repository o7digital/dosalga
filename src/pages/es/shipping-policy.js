import React from "react";
import Head from "next/head";

const ShippingPolicyEsPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Política de Envíos | Dosalga</title>
        <meta
          name="description"
          content="Política de envíos de Dosalga para pedidos internacionales, incluyendo tiempos de envío, procesamiento de pedidos y responsabilidades de envío."
        />
        <link rel="canonical" href={`${siteUrl}/es/shipping-policy`} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Política de Envíos</h1>

                <div className="policy-section mt-5">
                  <h2>Política de Envíos</h2>
                  <p>
                    Dosalga realiza envíos internacionales a través de socios logísticos de confianza. Los productos se despachan
                    directamente desde nuestros centros de fulfillment ubicados fuera del país de destino.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Tiempos de envío</h3>
                  <p>
                    Los plazos estimados de entrega son de 10 a 20 días hábiles, dependiendo del destino, el despacho aduanal y la
                    operación del transportista. Estos plazos son estimaciones y pueden variar debido a factores fuera de nuestro
                    control.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Procesamiento de pedidos</h3>
                  <p>
                    Los pedidos se procesan normalmente dentro de 2 a 5 días hábiles antes del envío. Una vez despachado, se
                    proporcionará un número de rastreo cuando esté disponible.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Responsabilidad de envío</h3>
                  <p>
                    Una vez que el pedido ha sido entregado al transportista, Dosalga no se hace responsable de retrasos, retenciones
                    aduanales o problemas de entrega causados por autoridades aduaneras, transportistas o información de entrega
                    incorrecta proporcionada por el cliente.
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

export default ShippingPolicyEsPage;
