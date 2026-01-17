import React from "react";
import Head from "next/head";

const TaxesAndDutiesPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Taxes & Import Duties | Dosalga</title>
        <meta
          name="description"
          content="Taxes & Import Duties policy for Dosalga orders. Understand import duties, customs fees, local taxes, and responsibilities for United States and Mexico deliveries."
        />
        <link rel="canonical" href={`${siteUrl}/taxes-and-duties`} />

        <link rel="alternate" hrefLang="en" href={`${siteUrl}/taxes-and-duties`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/impuestos-y-aranceles`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/taxes-and-duties`} />

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
                <h1 className="mb-4">Taxes &amp; Import Duties</h1>
                <p>
                  Dosalga operates as an international online retailer. All products are shipped directly from our international
                  fulfillment partners.
                </p>

                <div className="policy-section mt-5">
                  <h2>Import Duties &amp; Taxes</h2>
                  <p>Depending on the destination country, your order may be subject to:</p>
                  <ul>
                    <li>Import duties</li>
                    <li>Customs fees</li>
                    <li>Local taxes (including VAT or similar taxes)</li>
                  </ul>
                  <p>
                    These charges are not included in the product price unless explicitly stated and are the sole responsibility of
                    the customer. Dosalga has no control over these charges and cannot predict their amount.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>United States Orders</h2>
                  <p>
                    Orders shipped to the United States are not subject to U.S. sales tax unless otherwise required by applicable
                    law. Dosalga does not currently operate physical offices, warehouses, or inventory within the United States.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Mexico Orders</h2>
                  <p>
                    For orders delivered to Mexico, import taxes or VAT may be assessed by customs authorities or carriers upon
                    delivery. These charges are determined by local regulations and are payable by the customer.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <p>
                    By placing an order, you agree to comply with your local customs regulations and to pay any applicable duties or
                    taxes required by your country.
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
