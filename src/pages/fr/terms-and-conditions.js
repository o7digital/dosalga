import React from "react";
import Head from "next/head";

const TermsAndConditionsFrPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/terms-and-conditions', es: '/terms-and-conditions', de: '/terms-and-conditions', fr: '/terms-and-conditions', it: '/terms-and-conditions', pt: '/terms-and-conditions' };
  const currentLocale = 'fr';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'fr_FR';

  return (
    <>
      <Head>
        <title>Conditions Générales de Vente | Dosalga</title>
        <meta
          name="description"
          content="CGV pour les achats Dosalga : informations société, champ d’application, produits, prix, paiement, taxes, livraison, retours, responsabilité et droit applicable."
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
                <h1 className="mb-4">Conditions Générales de Vente</h1>

                <div className="policy-section mt-5">
                  <h2>Conditions de vente</h2>
                </div>

                <div className="policy-section mt-4">
                  <h3>1. Société</h3>
                  <p>Dosalga est un détaillant en ligne international immatriculé au Mexique. Toute communication se fait via les contacts indiqués sur le site.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>2. Champ d’application</h3>
                  <p>Ces CGV s’appliquent à tout achat sur https://www.dosalga.store. En commandant, le client les accepte sans réserve.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>3. Produits</h3>
                  <p>Dosalga vend des produits physiques via un modèle de dropshipping international. Les visuels sont illustratifs et peuvent légèrement différer.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>4. Prix</h3>
                  <p>Affichés dans la devise choisie, hors droits d’importation, frais de douane ou taxes locales sauf mention contraire. Le prix appliqué est celui au moment de la commande.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>5. Paiement</h3>
                  <p>Paiements via prestataires sécurisés. La commande est confirmée après encaissement. Dosalga ne stocke pas les données de paiement.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>6. Taxes et droits</h3>
                  <p>Droits d’importation, frais douaniers, TVA ou taxes similaires ne sont pas inclus et restent à la charge du client.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>7. Livraison</h3>
                  <p>Livraison internationale; délais indicatifs. Une fois remis au transporteur, la responsabilité lui incombe.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>8. Droit de rétractation</h3>
                  <p>Limité du fait du modèle. Retours uniquement selon la politique « Returns & Refunds ».</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>9. Retours et remboursements</h3>
                  <p>Suivant la politique dédiée. Dosalga peut refuser toute demande non conforme.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>10. Responsabilité</h3>
                  <p>Pas de responsabilité pour retards douaniers, restrictions d’import ou dommages indirects. Limitation au montant payé.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>11. Propriété intellectuelle</h3>
                  <p>Les contenus du site appartiennent à Dosalga et ne peuvent être utilisés sans accord écrit.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>12. Droit applicable & juridiction</h3>
                  <p>Droit mexicain applicable; compétence exclusive des tribunaux mexicains.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsFrPage;
