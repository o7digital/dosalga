import React from "react";
import Head from "next/head";

const ReturnsAndRefundsFrPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/returns-and-refunds', es: '/returns-and-refunds', de: '/returns-and-refunds', fr: '/returns-and-refunds', it: '/returns-and-refunds', pt: '/returns-and-refunds' };
  const currentLocale = 'fr';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'fr_FR';

  return (
    <>
      <Head>
        <title>Retours & Remboursements | Dosalga</title>
        <meta
          name="description"
          content="Politique de retours et remboursements Dosalga : conditions d’éligibilité, traitement des remboursements et limites."
        />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:url" content={hrefFor(currentLocale)} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Retours &amp; Remboursements</h1>

                <div className="policy-section mt-5">
                  <h2>Retours &amp; Remboursements</h2>
                  <p>En raison de notre chaîne logistique internationale, une politique de retours conditionnelle s’applique.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Retours</h3>
                  <p>Acceptés uniquement si :</p>
                  <ul>
                    <li>le produit arrive endommagé</li>
                    <li>le produit est défectueux</li>
                    <li>le produit reçu n’est pas le bon</li>
                  </ul>
                  <p>
                    Contactez-nous sous 7 jours après livraison avec photos, numéro de commande et description du problème. Les retours pour changement d’avis, taille ou préférence ne sont pas acceptés.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Remboursements</h3>
                  <p>En cas d’approbation, le remboursement est effectué sur le moyen de paiement initial sous 5 à 10 jours ouvrés.</p>
                  <p>Frais de livraison, droits et taxes ne sont pas remboursables.</p>
                  <p>Dosalga se réserve le droit de refuser toute demande ne respectant pas ces conditions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnsAndRefundsFrPage;
