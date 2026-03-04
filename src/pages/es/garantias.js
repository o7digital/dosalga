import React from "react";
import Head from "next/head";

const GarantiasPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Garantías - Dosalga</title>
        <meta name="description" content="Información sobre garantías y soporte de productos Dosalga." />
        <link rel="canonical" href={`${siteUrl}/es/garantias`} />
      </Head>

      <div className="policy-page pt-100 pb-100">
        <div className="container">
          <h1 className="mb-4">Garantías</h1>
          <p className="text-muted mb-3">
            Esta página resume las garantías aplicables a los productos adquiridos en Dosalga.
          </p>
          <ul>
            <li>Cobertura estándar según la normativa local y el fabricante.</li>
            <li>Conserva tu comprobante de compra para gestionar cualquier reclamación.</li>
            <li>Para soporte o dudas, contáctanos en <a href="mailto:contact@dosalga.store">contact@dosalga.store</a>.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default GarantiasPage;
