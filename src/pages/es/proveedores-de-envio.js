import React from "react";
import Head from "next/head";

const ProveedoresDeEnvioPage = () => {
  return (
    <>
      <Head>
        <title>Proveedores de Envío | Dosalga</title>
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Proveedores de Envío</h1>

                <p>
                  Dosalga trabaja con proveedores logísticos internacionales reconocidos para garantizar una entrega confiable y
                  eficiente de los pedidos.
                </p>

                <div className="policy-section mt-5">
                  <h2>Empresas de mensajería</h2>
                  <p>Dependiendo del destino y del tipo de producto, los envíos pueden realizarse a través de:</p>
                  <ul>
                    <li>DHL</li>
                    <li>FedEx</li>
                    <li>Otros socios logísticos internacionales</li>
                  </ul>
                  <p>
                    La empresa de mensajería asignada será seleccionada automáticamente según el destino, disponibilidad y
                    condiciones del envío.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Seguimiento de pedidos</h2>
                  <p>
                    Una vez que el pedido ha sido despachado, el cliente recibirá un número de seguimiento cuando esté disponible,
                    permitiendo monitorear el estado de la entrega directamente con el transportista.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Responsabilidad del transporte</h2>
                  <p>
                    Una vez que el pedido es entregado al proveedor de mensajería, la responsabilidad del transporte y los plazos de
                    entrega corresponden al transportista. Retrasos derivados de procesos aduaneros, condiciones logísticas o causas
                    externas están fuera del control de Dosalga.
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

export default ProveedoresDeEnvioPage;

