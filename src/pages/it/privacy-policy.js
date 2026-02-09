import React from "react";
import Head from "next/head";

const PrivacyPolicyIt = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/privacy-policy', es: '/privacy-policy', de: '/privacy-policy', fr: '/privacy-policy', it: '/privacy-policy', pt: '/privacy-policy' };
  const currentLocale = 'it';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'it_IT';
	  return (
	    <>
	    <Head>
      <title>Informativa Privacy | Dosalga</title>
      <meta name="description" content="Informativa privacy di Dosalga: quali dati raccogliamo, come li usiamo e i tuoi diritti." />
      <link rel="canonical" href={hrefFor(currentLocale)} />
      {locales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={hrefFor(currentLocale)} />
      <meta property="og:title" content="Informativa Privacy | Dosalga" />
      <meta property="og:description" content="Scopri come Dosalga gestisce i dati personali e i tuoi diritti sulla privacy." />
    </Head>
    <div className="privacy-policy-section pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="privacy-content">
              <h1 className="mb-4">Informativa sulla Privacy</h1>
              <p className="last-updated"><strong>Ultimo aggiornamento:</strong> 28 novembre 2025</p>

              <div className="policy-section mt-5">
                <h2>1. Informazioni sull’azienda</h2>
                <p>
                  Questa informativa è emessa da <strong>DOSALGA</strong>. Proteggiamo i tuoi dati personali e la tua privacy.
                </p>
                <p>Contatto: info@dosalga.store | Tel: 2-965-871-8617</p>
              </div>

              <div className="policy-section mt-5">
                <h2>2. Dati che raccogliamo</h2>
                <p><strong>Forniti da te:</strong> nome, contatti, pagamenti, credenziali di accesso, preferenze, storico ordini.</p>
                <p><strong>Automatici:</strong> IP, browser, uso delle pagine, posizione approssimativa, cookie.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>3. Per cosa usiamo i dati</h2>
                <ul>
                  <li>Gestione ordini e account</li>
                  <li>Assistenza clienti e comunicazioni</li>
                  <li>Marketing (con consenso)</li>
                  <li>Miglioramento del servizio e obblighi legali</li>
                  <li>Prevenzione frodi</li>
                </ul>
              </div>

              <div className="policy-section mt-5">
                <h2>4. Basi giuridiche (GDPR)</h2>
                <p>Esecuzione del contratto, consenso, interessi legittimi o obbligo di legge a seconda del contesto.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>5. I tuoi diritti</h2>
                <p>Accesso, rettifica, cancellazione, limitazione, opposizione, portabilità e revoca del consenso.</p>
                <p>Per esercitarli: info@dosalga.store.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>6. Conservazione & sicurezza</h2>
                <p>Conserviamo i dati solo finché necessario. Applichiamo misure di sicurezza tecniche e organizzative, pur senza garanzia assoluta.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>7. Cookie & tracking</h2>
                <p>Usiamo cookie per funzionalità e analisi. Puoi gestire le preferenze tramite browser o tool cookie.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>8. Trasferimenti internazionali</h2>
                <p>I dati possono essere trattati fuori dal tuo paese; usiamo salvaguardie riconosciute (es. clausole standard) se richiesto.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>9. Minori</h2>
                <p>I servizi non sono destinati a minori di 13 anni.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>10. Modifiche</h2>
                <p>Possiamo aggiornare questa informativa; fa fede la data sopra. In caso di cambiamenti rilevanti informeremo separatamente.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>11. Contatto</h2>
                <p>Domande o richieste: <strong>info@dosalga.store</strong>.</p>
              </div>
            </div>
          </div>
	        </div>
	      </div>
	    </div>
	    </>
	  );
	};

export default PrivacyPolicyIt;
