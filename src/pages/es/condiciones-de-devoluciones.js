import React from "react";
import Head from "next/head";

const CondicionesDeDevolucionesPage = () => {
  return (
    <>
      <Head>
        <title>Condiciones de Devoluciones | Dosalga</title>
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Condiciones de Devoluciones</h1>

                <p>
                  Debido a la naturaleza internacional de la cadena de suministro de Dosalga, se aplica una política de devoluciones
                  limitada.
                </p>

                <div className="policy-section mt-5">
                  <h2>Casos aceptados</h2>
                  <p>Las devoluciones solo se aceptan en los siguientes casos:</p>
                  <ul>
                    <li>El producto llega dañado</li>
                    <li>El producto presenta defectos de fabricación</li>
                    <li>El producto recibido es incorrecto</li>
                  </ul>
                  <p>
                    El cliente deberá contactarnos dentro de los 7 días posteriores a la entrega, proporcionando evidencia
                    fotográfica y el número de pedido.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Casos no aceptados</h2>
                  <p>No se aceptan devoluciones por cambio de opinión, uso indebido, desgaste normal o preferencias personales.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Reembolsos</h2>
                  <p>
                    Los reembolsos aprobados se procesarán al método de pago original. Los gastos de envío, impuestos y aranceles no
                    son reembolsables.
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

export default CondicionesDeDevolucionesPage;

