import React from "react";
import Head from "next/head";

const AboutPageIt = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Chi è Dosalga - Prodotti per la vita quotidiana | Storia, visione e valori</title>
        <meta
          name="description"
          content="Dosalga rende semplice acquistare prodotti pensati per la vita quotidiana, consegnati a casa o in ufficio. Scopri la nostra storia dal 2013, visione, missione e valori."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={`${siteUrl}/it/about-us`} />

        <link rel="alternate" hrefLang="en" href={`${siteUrl}/about-us`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/about-us`} />
        <link rel="alternate" hrefLang="de" href={`${siteUrl}/de/about-us`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr/about-us`} />
        <link rel="alternate" hrefLang="it" href={`${siteUrl}/it/about-us`} />
        <link rel="alternate" hrefLang="pt" href={`${siteUrl}/pt/about-us`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/about-us`} />
      </Head>

      <div className="about-page pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center mb-60">
            <div className="col-lg-8 text-center">
              <h1 className="mb-3">Chi è Dosalga</h1>
              <p className="text-muted">
                Dosalga facilita l’accesso a prodotti pensati per la vita di tutti i giorni, consegnandoli a casa, in ufficio o dove preferisci. Puntiamo su comodità, accessibilità ed efficienza.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Prodotti pensati per ogni giorno</h2>
                <p>
                  Selezioniamo articoli confortevoli, semplici e versatili, che si integrano naturalmente nelle routine quotidiane e aggiungono funzionalità senza complicazioni.
                </p>
                <p>Ogni prodotto risponde a bisogni reali, bilanciando utilità, design e facilità d’uso.</p>
              </div>

              <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Come è iniziata Dosalga</h2>
                <p>
                  Dosalga ha iniziato nel 2013 fornendo prodotti commerciali a diversi mercati. Col tempo ci siamo evoluti per migliorare il servizio, ottimizzare i processi e adattarci ai nuovi modi di acquistare.
                </p>
                <p>Oggi continuiamo a sviluppare soluzioni sempre più efficienti per semplificare la vita quotidiana dei clienti.</p>
              </div>

              <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Visione</h2>
                <p>Essere la migliore opzione per forniture di prodotti essenziali, supportando uno stile di vita moderno, pratico e funzionale.</p>
              </div>

              <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Missione</h2>
                <p>
                  Soddisfare aspettative e necessità con soluzioni innovative, competitive e sostenibili, offrendo un’esperienza di acquisto chiara e affidabile, centrata sulla qualità del servizio.
                </p>
              </div>

              <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">I nostri valori</h2>
                <ul className="mb-0">
                  <li><strong>Integrità</strong>: onestà, trasparenza e coerenza.</li>
                  <li><strong>Innovazione</strong>: stimolare creatività e ricerca di soluzioni migliori.</li>
                  <li><strong>Responsabilità</strong>: rispettare gli impegni e agire con consapevolezza.</li>
                  <li><strong>Rispetto</strong>: valorizzare persone, diversità e punti di vista.</li>
                  <li><strong>Lavoro di squadra</strong>: collaborare per obiettivi comuni.</li>
                  <li><strong>Focus sul cliente</strong>: priorità a soddisfazione, fiducia e bisogni.</li>
                  <li><strong>Sostenibilità</strong>: impegno responsabile verso ambiente e società.</li>
                </ul>
              </div>

              <div className="about-card bg-light p-4 p-lg-5 rounded-3 mb-40">
                <h2 className="h4 mb-3">Cosa offre Dosalga</h2>
                <ul className="mb-0">
                  <li>Processo di acquisto comodo</li>
                  <li>Selezione semplice dei prodotti</li>
                  <li>Servizio affidabile</li>
                  <li>Articoli per la vita quotidiana</li>
                </ul>
              </div>

              <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
                <h2 className="h4 mb-3">Perché scegliere Dosalga</h2>
                <p>
                  Per chi cerca praticità, semplicità e accesso rapido ai prodotti essenziali, da integrare facilmente nella vita di tutti i giorni.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPageIt;
