import React from "react";
import Head from "next/head";

const ImpuestosLocalesPage = () => {
  return (
    <>
      <Head>
        <title>Impuestos Locales | Dosalga</title>
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Impuestos Locales</h1>

                <p>
                  Dosalga opera como una plataforma de comercio electrónico internacional. Los productos ofrecidos se envían
                  directamente desde proveedores y centros logísticos ubicados fuera del país de destino.
                </p>

                <div className="policy-section mt-5">
                  <h2>Pedidos a México</h2>
                  <p>Los pedidos enviados a México pueden estar sujetos a:</p>
                  <ul>
                    <li>Impuesto al Valor Agregado (IVA)</li>
                    <li>Aranceles de importación</li>
                    <li>Gastos administrativos o aduanales</li>
                  </ul>
                  <p>
                    Estos cargos son determinados por las autoridades fiscales y aduaneras mexicanas o por la empresa de mensajería
                    al momento de la entrega. Dosalga no controla ni puede anticipar dichos cargos, los cuales son responsabilidad
                    exclusiva del cliente.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Pedidos a Estados Unidos</h2>
                  <p>
                    Los pedidos enviados a Estados Unidos no están sujetos a Sales Tax, salvo que la legislación aplicable lo
                    requiera. Dosalga no cuenta actualmente con oficinas, almacenes ni inventario físico en territorio
                    estadounidense.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Consideraciones generales</h2>
                  <p>
                    Las regulaciones fiscales y aduaneras pueden variar según el país de destino. Al realizar un pedido, el cliente
                    acepta cumplir con las disposiciones locales y asumir el pago de los impuestos o cargos que correspondan.
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

export default ImpuestosLocalesPage;

