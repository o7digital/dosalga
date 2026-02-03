import React from "react";
import Head from "next/head";

const ShippingPolicyFrPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/shipping-policy', es: '/shipping-policy', de: '/shipping-policy', fr: '/shipping-policy', it: '/shipping-policy', pt: '/shipping-policy' };
  const currentLocale = 'fr';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'fr_FR';

  return (
    <>
      <Head>
        <title>Politique d’expédition | Dosalga</title>
        <meta
          name="description"
          content="Politique d’expédition pour les commandes internationales Dosalga : délais, traitement des commandes et responsabilités."
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
                <h1 className="mb-4">Politique d’expédition</h1>

                <div className="policy-section mt-5">
                  <h2>Politique d’expédition</h2>
                  <p>
                    Dosalga expédie à l’international via des partenaires logistiques de confiance. Les produits partent directement de nos centres de fulfillment hors du pays de destination.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Délais de livraison</h3>
                  <p>
                    Délais estimés : 10–20 jours ouvrés selon la destination, le dédouanement et le transporteur. Ce sont des estimations susceptibles de varier.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Traitement des commandes</h3>
                  <p>
                    Les commandes sont généralement traitées sous 2 à 5 jours ouvrés avant l’expédition. Un numéro de suivi est fourni lorsqu’il est disponible.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Responsabilité d’expédition</h3>
                  <p>
                    Une fois le colis remis au transporteur, la responsabilité lui incombe. Dosalga n’est pas responsable des retards, blocages douaniers ou problèmes de livraison dus aux autorités, transporteurs ou informations de livraison incorrectes.
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

export default ShippingPolicyFrPage;
