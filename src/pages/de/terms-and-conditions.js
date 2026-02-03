import React from "react";
import Head from "next/head";

const TermsAndConditionsDePage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/terms-and-conditions', es: '/terms-and-conditions', de: '/terms-and-conditions', fr: '/terms-and-conditions', it: '/terms-and-conditions', pt: '/terms-and-conditions' };
  const currentLocale = 'de';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'de_DE';

  return (
    <>
      <Head>
        <title>AGB | Dosalga</title>
        <meta
          name="description"
          content="Allgemeine Geschäftsbedingungen für Einkäufe bei Dosalga: Unternehmen, Geltungsbereich, Produkte, Preise, Zahlung, Steuern, Versand, Rückgaben, Haftung und anwendbares Recht."
        />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Allgemeine Geschäftsbedingungen</h1>

                <div className="policy-section mt-5">
                  <h2>Verkaufsbedingungen</h2>
                </div>

                <div className="policy-section mt-4">
                  <h3>1. Unternehmen</h3>
                  <p>Dosalga ist ein internationaler Onlinehändler mit Sitz in Mexiko. Kommunikation zu Bestellungen erfolgt über die auf der Website angegebenen Kontakte.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>2. Geltungsbereich</h3>
                  <p>Diese Bedingungen gelten für alle Käufe über https://www.dosalga.store. Mit der Bestellung akzeptierst du sie ohne Vorbehalt.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>3. Produkte</h3>
                  <p>Dosalga verkauft physische Produkte über ein internationales Dropshipping-Modell. Bilder dienen der Illustration und können leicht abweichen.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>4. Preise</h3>
                  <p>Preise verstehen sich in der gewählten Währung ohne Importabgaben, Zollgebühren oder lokale Steuern, sofern nicht anders angegeben. Der Preis zum Bestellzeitpunkt gilt.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>5. Zahlung</h3>
                  <p>Zahlungen laufen über sichere Drittanbieter. Eine Bestellung gilt als bestätigt, wenn die Zahlung eingegangen ist. Dosalga speichert keine Zahlungsdaten.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>6. Steuern und Zölle</h3>
                  <p>Importabgaben, Zollgebühren, VAT/Sales Tax oder ähnliche Kosten sind nicht im Preis enthalten und liegen in der Verantwortung der Kund*innen.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>7. Versand & Lieferung</h3>
                  <p>Internationale Lieferung; Zeiten sind Schätzungen. Nach Übergabe an den Carrier liegt die Verantwortung bei diesem.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>8. Widerruf</h3>
                  <p>Aufgrund des Modells ist das Widerrufsrecht eingeschränkt. Rückgaben nur gemäß Richtlinie „Returns & Refunds“.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>9. Rückgaben & Erstattungen</h3>
                  <p>Geregelt durch die Rückgabe-/Erstattungsrichtlinie. Dosalga kann Anträge ablehnen, die Bedingungen nicht erfüllen.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>10. Haftung</h3>
                  <p>Keine Haftung für Zollverzögerungen, Importbeschränkungen oder indirekte Schäden. Haftung beschränkt auf den Bestellwert.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>11. Geistiges Eigentum</h3>
                  <p>Alle Inhalte der Website sind Eigentum von Dosalga und dürfen nicht ohne Zustimmung genutzt werden.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>12. Recht & Gerichtsstand</h3>
                  <p>Anwendbar ist mexikanisches Recht; ausschließlicher Gerichtsstand sind die zuständigen Gerichte in Mexiko.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsDePage;
