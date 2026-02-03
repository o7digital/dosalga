import React from "react";
import Head from "next/head";

const TermsAndConditionsItPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Termini & Condizioni | Dosalga</title>
        <meta
          name="description"
          content="Termini e condizioni di vendita per gli acquisti Dosalga: informazioni azienda, ambito, prodotti, prezzi, pagamento, tasse, spedizione, resi, responsabilità e legge applicabile."
        />
        <link rel="canonical" href={`${siteUrl}/it/terms-and-conditions`} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Termini &amp; Condizioni</h1>

                <div className="policy-section mt-5">
                  <h2>Condizioni di vendita</h2>
                </div>

                <div className="policy-section mt-4">
                  <h3>1. Azienda</h3>
                  <p>Dosalga è un rivenditore online internazionale registrato in Messico. Le comunicazioni sugli ordini avvengono tramite i contatti presenti sul sito.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>2. Ambito di applicazione</h3>
                  <p>Questi Termini valgono per tutti gli acquisti su https://www.dosalga.store. Effettuando un ordine, il cliente li accetta senza riserve.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>3. Prodotti</h3>
                  <p>Dosalga vende prodotti fisici tramite modello di dropshipping internazionale. Le immagini sono illustrative e possono differire leggermente dal prodotto consegnato.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>4. Prezzi</h3>
                  <p>Mostrati nella valuta scelta e al netto di dazi, oneri doganali o tasse locali salvo diversa indicazione. Vale il prezzo al momento della conferma d’ordine.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>5. Pagamento</h3>
                  <p>Pagamenti tramite fornitori terzi sicuri. L’ordine è confermato solo dopo il pagamento completo. Dosalga non memorizza dati di pagamento.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>6. Tasse e dazi</h3>
                  <p>Imposte d’importazione, dazi, IVA o tasse simili non sono incluse e restano a carico del cliente.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>7. Spedizione e consegna</h3>
                  <p>Spedizione internazionale; tempi indicativi. Dopo la consegna al corriere, la responsabilità passa a quest’ultimo.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>8. Diritto di recesso</h3>
                  <p>Limitato per via del modello. Resi solo come previsto dalla politica “Returns & Refunds”.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>9. Resi e rimborsi</h3>
                  <p>Si applica la politica dedicata. Dosalga può rifiutare richieste non conformi.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>10. Responsabilità</h3>
                  <p>Nessuna responsabilità per ritardi doganali, restrizioni di importazione o danni indiretti. Responsabilità limitata all’importo pagato.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>11. Proprietà intellettuale</h3>
                  <p>Tutti i contenuti del sito sono di Dosalga e non possono essere usati senza consenso scritto.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>12. Legge e foro competente</h3>
                  <p>Si applica la legge messicana; foro esclusivo i tribunali competenti in Messico.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsItPage;
