import React from "react";
import Head from "next/head";

const ShippingPolicyItPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Politica di spedizione | Dosalga</title>
        <meta
          name="description"
          content="Politica di spedizione per ordini internazionali Dosalga: tempi di consegna, elaborazione degli ordini e responsabilità."
        />
        <link rel="canonical" href={`${siteUrl}/it/shipping-policy`} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Politica di spedizione</h1>

                <div className="policy-section mt-5">
                  <h2>Politica di spedizione</h2>
                  <p>
                    Dosalga spedisce a livello internazionale tramite partner logistici affidabili. I prodotti partono direttamente dai nostri partner di fulfillment fuori dal paese di destinazione.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Tempi di consegna</h3>
                  <p>
                    Tempi stimati: 10–20 giorni lavorativi a seconda di destinazione, sdoganamento e corriere. Le tempistiche sono indicative e possono variare.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Elaborazione ordini</h3>
                  <p>
                    Gli ordini vengono normalmente elaborati in 2–5 giorni lavorativi prima della spedizione. Forniamo un tracking quando disponibile.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Responsabilità di spedizione</h3>
                  <p>
                    Dopo la consegna al corriere, la responsabilità passa a quest’ultimo. Dosalga non è responsabile di ritardi, blocchi doganali o problemi causati da autorità, corrieri o indirizzi errati.
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

export default ShippingPolicyItPage;
