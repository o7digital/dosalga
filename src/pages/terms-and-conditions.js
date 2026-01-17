import React from "react";
import Head from "next/head";

const TermsAndConditionsPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Terms &amp; Conditions | Dosalga</title>
        <meta
          name="description"
          content="Terms & Conditions of Sale for purchases made through Dosalga. Review company information, scope, products, prices, payments, taxes, shipping, returns, liability, and governing law."
        />
        <link rel="canonical" href={`${siteUrl}/terms-and-conditions`} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Terms &amp; Conditions</h1>

                <div className="policy-section mt-5">
                  <h2>Terms &amp; Conditions of Sale</h2>
                </div>

                <div className="policy-section mt-4">
                  <h3>1. Company Information</h3>
                  <p>
                    Dosalga operates as an international online retailer. The company is legally registered in Mexico. All
                    communications regarding orders must be made through the contact information provided on the website.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>2. Scope of Application</h3>
                  <p>
                    These Terms and Conditions of Sale apply to all purchases made through the website https://www.dosalga.store. By
                    placing an order, the customer confirms having read, understood, and accepted these Terms without reservation.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>3. Products</h3>
                  <p>
                    Dosalga sells physical products through an international dropshipping model. Products are shipped directly from
                    third-party fulfillment partners located outside the customer’s country of residence. Product images and
                    descriptions are provided for illustrative purposes and may vary slightly from the delivered item.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>4. Prices</h3>
                  <p>
                    All prices displayed on the website are shown in the selected currency and do not include import duties, customs
                    fees, or local taxes unless explicitly stated. Dosalga reserves the right to modify prices at any time. The price
                    charged is the one displayed at the time the order is confirmed.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>5. Payment</h3>
                  <p>
                    Payments are processed through secure third-party payment providers. The order is considered confirmed only once
                    full payment has been received. Dosalga does not store any payment information.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>6. Taxes and Customs Duties</h3>
                  <p>
                    Import duties, customs fees, VAT, sales taxes, or similar charges imposed by local authorities are not included
                    in the product price and remain the sole responsibility of the customer. Dosalga has no control over these
                    charges and cannot predict their amount.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>7. Shipping and Delivery</h3>
                  <p>
                    Products are shipped internationally. Delivery times are estimates only and may vary due to customs procedures,
                    carrier delays, or external factors beyond Dosalga’s control. Once the order is handed over to the carrier,
                    responsibility for delivery rests with the carrier.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>8. Right of Withdrawal</h3>
                  <p>
                    Due to the international and customized nature of the supply chain, the right of withdrawal is limited. Returns
                    are accepted only under the conditions described in the Returns &amp; Refunds Policy.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>9. Returns and Refunds</h3>
                  <p>
                    Returns and refunds are governed by the dedicated Returns &amp; Refunds Policy available on the website. Dosalga
                    reserves the right to refuse any return or refund request that does not comply with the stated conditions.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>10. Liability</h3>
                  <p>
                    Dosalga cannot be held liable for delays caused by customs authorities or carriers, import restrictions imposed
                    by destination countries, or indirect or consequential damages related to product use. Liability is strictly
                    limited to the amount paid for the order.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>11. Intellectual Property</h3>
                  <p>
                    All content on the website, including texts, images, logos, and designs, is the exclusive property of Dosalga and
                    may not be used without prior written consent.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>12. Governing Law and Jurisdiction</h3>
                  <p>
                    These Terms and Conditions are governed by Mexican law. Any dispute shall fall under the exclusive jurisdiction of
                    the competent courts of Mexico.
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

export default TermsAndConditionsPage;
