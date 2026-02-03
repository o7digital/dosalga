import React from "react";
import Head from "next/head";

const TaxesAndDutiesPage = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = {
    en: '/taxes-and-duties',
    es: '/impuestos-y-aranceles',
    de: '/taxes-and-duties',
    fr: '/taxes-and-duties',
    it: '/taxes-and-duties',
    pt: '/taxes-and-duties',
  };
  const currentLocale = 'en';
  const hrefFor = (locale) => {
    const slug = slugByLocale[locale] || '/taxes-and-duties';
    return `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slug}`;
  };
  const ogLocale = 'en_US';

  return (
    <>
      <Head>
        <title>Taxes &amp; Duties | Dosalga</title>
        <meta
          name="description"
          content="Taxes & Import Duties policy for Dosalga orders, including potential customs fees, VAT, and details for United States and Mexico deliveries."
        />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:url" content={hrefFor(currentLocale)} />

        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/taxes-and-duties`} />
        <meta property="og:title" content="Taxes & Import Duties | Dosalga" />
        <meta
          property="og:description"
          content="Review Dosalga's Taxes & Import Duties policy for international orders, including United States and Mexico deliveries."
        />
        <meta property="og:site_name" content="Dosalga" />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Taxes &amp; Duties</h1>

                <div className="policy-section mt-5">
                  <h2>Taxes &amp; Import Duties</h2>
                  <p>
                    Dosalga operates as an international online retailer. All products are shipped directly from international
                    fulfillment partners.
                  </p>
                  <p>
                    Depending on the destination country, orders may be subject to import duties, customs fees, or local taxes such
                    as VAT. These charges are not included in the product price unless explicitly stated and are the sole
                    responsibility of the customer.
                  </p>
                  <p>Dosalga has no control over these charges and cannot predict their amount.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>United States Orders</h2>
                  <p>
                    Orders shipped to the United States are not subject to U.S. sales tax unless otherwise required by law. Dosalga
                    does not operate offices, warehouses, or inventory within the United States.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Mexico Orders</h2>
                  <p>
                    Orders delivered to Mexico may be subject to import taxes or VAT assessed by customs authorities or carriers upon
                    delivery. These charges are payable by the customer.
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

export default TaxesAndDutiesPage;
