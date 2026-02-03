import React from "react";
import Head from "next/head";

const AboutPageDe = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Über Dosalga - Produkte für den Alltag | Geschichte, Vision & Werte</title>
        <meta
          name="description"
          content="Dosalga macht es einfach, alltagstaugliche Produkte zu bestellen – geliefert nach Hause oder ins Büro. Erfahre mehr über unseren Start 2013, Vision, Mission und Werte."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={`${siteUrl}/de/about-us`} />

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
              <h1 className="mb-3">Über Dosalga</h1>
              <p className="text-muted">
                Dosalga macht den Zugang zu Produkten für den Alltag einfach – mit Lieferung an dein Zuhause, Büro oder jeden gewünschten Ort. Wir setzen auf Bequemlichkeit, Zugänglichkeit und Effizienz.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Produkte für den täglichen Gebrauch</h2>
                <p>
                  Unsere Produkte sind darauf ausgelegt, mit deinem Alltag Schritt zu halten. Wir fokussieren Komfort, Einfachheit und Vielseitigkeit – Artikel, die sich natürlich in die Routine einfügen und Funktionalität ohne Aufwand bieten.
                </p>
                <p>Jedes Produkt adressiert reale Bedürfnisse und balanciert Nutzen, Design und Benutzerfreundlichkeit.</p>
              </div>

              <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Wie Dosalga begann</h2>
                <p>
                  Dosalga startete 2013 mit der Belieferung verschiedener Märkte und Branchen. Mit der Zeit entwickelten wir uns weiter, um Service und Prozesse zu optimieren und neue Kaufgewohnheiten zu bedienen.
                </p>
                <p>Heute entwickeln wir uns stetig weiter, um effizientere Lösungen für den Alltag unserer Kund*innen zu bieten.</p>
              </div>

              <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Vision</h2>
                <p>Die beste Option für Handelswaren zu sein und essenzielle Produkte für einen modernen, praktischen Lebensstil zu liefern.</p>
              </div>

              <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Mission</h2>
                <p>
                  Erwartungen mit innovativen, wettbewerbsfähigen und rentablen Lösungen erfüllen – mit einer klaren, vertrauenswürdigen Einkaufserfahrung und Servicequalität.
                </p>
              </div>

              <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Unsere Werte</h2>
                <ul className="mb-0">
                  <li><strong>Integrität</strong>: Ehrlichkeit, Transparenz und Konsequenz.</li>
                  <li><strong>Innovation</strong>: Kreativität und die Suche nach besseren Lösungen fördern.</li>
                  <li><strong>Verantwortung</strong>: Zusagen einhalten und bewusst handeln.</li>
                  <li><strong>Respekt</strong>: Menschen, Vielfalt und Perspektiven wertschätzen.</li>
                  <li><strong>Teamarbeit</strong>: Gemeinsam Ziele erreichen.</li>
                  <li><strong>Kundenfokus</strong>: Zufriedenheit, Vertrauen und Bedürfnisse priorisieren.</li>
                  <li><strong>Nachhaltigkeit</strong>: Verantwortungsbewusstsein gegenüber Umwelt und Gesellschaft.</li>
                </ul>
              </div>

              <div className="about-card bg-light p-4 p-lg-5 rounded-3 mb-40">
                <h2 className="h4 mb-3">Was Dosalga bietet</h2>
                <ul className="mb-0">
                  <li>Bequeme Kaufabwicklung</li>
                  <li>Einfache Produktauswahl</li>
                  <li>Zuverlässiger Service</li>
                  <li>Produkte für den Alltag</li>
                </ul>
              </div>

              <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
                <h2 className="h4 mb-3">Warum Dosalga</h2>
                <p>
                  Für alle, die Bequemlichkeit, Praktikabilität und einfachen Zugang zu wichtigen Produkten schätzen – integriert in den Alltag, ohne Aufwand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPageDe;
