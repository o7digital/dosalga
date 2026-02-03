import React from "react";
import Head from "next/head";

const PrivacyPolicyFr = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/privacy-policy', es: '/privacy-policy', de: '/privacy-policy', fr: '/privacy-policy', it: '/privacy-policy', pt: '/privacy-policy' };
  const currentLocale = 'fr';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'fr_FR';
  return (
    <>
    <Head>
      <title>Politique de Confidentialité | Dosalga</title>
      <meta name="description" content="Politique de confidentialité de Dosalga : données collectées, usages et vos droits." />
      <link rel="canonical" href={hrefFor(currentLocale)} />
      {locales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={hrefFor(currentLocale)} />
      <meta property="og:title" content="Politique de Confidentialité | Dosalga" />
      <meta property="og:description" content="Découvrez comment Dosalga collecte et protège vos données et vos droits en matière de vie privée." />
    </Head>
    <div className="privacy-policy-section pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="privacy-content">
              <h1 className="mb-4">Politique de Confidentialité</h1>
              <p className="last-updated"><strong>Dernière mise à jour :</strong> 28 novembre 2025</p>

              <div className="policy-section mt-5">
                <h2>1. Informations sur l’entreprise</h2>
                <p>
                  Cette politique est émise par <strong>DOSALGA</strong>. Nous protégeons vos données personnelles et votre vie privée.
                </p>
                <p>Contact : info@dosalga.store | Tél. : 2-965-871-8617</p>
              </div>

              <div className="policy-section mt-5">
                <h2>2. Données collectées</h2>
                <p><strong>Que vous fournissez :</strong> nom, contact, paiement, identifiants de compte, préférences, historique d’achat.</p>
                <p><strong>Collectées automatiquement :</strong> IP, navigateur, usage des pages, localisation approximative, cookies.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>3. Utilisation des données</h2>
                <ul>
                  <li>Traitement des commandes et gestion de compte</li>
                  <li>Support client et communications</li>
                  <li>Marketing (avec votre consentement)</li>
                  <li>Amélioration du service et obligations légales</li>
                  <li>Prévention de la fraude</li>
                </ul>
              </div>

              <div className="policy-section mt-5">
                <h2>4. Bases légales (RGPD)</h2>
                <p>Exécution du contrat, consentement, intérêt légitime ou obligation légale selon le contexte.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>5. Vos droits</h2>
                <p>Accès, rectification, suppression, limitation, opposition, portabilité et retrait du consentement.</p>
                <p>Pour exercer vos droits : info@dosalga.store.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>6. Conservation & sécurité</h2>
                <p>Les données sont conservées aussi longtemps que nécessaire. Mesures de sécurité techniques et organisationnelles en place, sans garantie absolue.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>7. Cookies & suivi</h2>
                <p>Nous utilisons des cookies pour la fonctionnalité et l’analyse. Gérez vos préférences via le navigateur ou l’outil de cookies.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>8. Transferts internationaux</h2>
                <p>Les données peuvent être traitées hors de votre pays; des garanties reconnues sont appliquées (clauses types, etc.).</p>
              </div>

              <div className="policy-section mt-5">
                <h2>9. Mineurs</h2>
                <p>Nos services ne visent pas les personnes de moins de 13 ans.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>10. Modifications</h2>
                <p>Nous pouvons mettre à jour cette politique; la date ci-dessus fait foi. En cas de changement important, nous informerons séparément.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>11. Contact</h2>
                <p>Pour toute question ou demande : <strong>info@dosalga.store</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyFr;
