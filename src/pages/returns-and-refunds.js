import React from "react";
import Head from "next/head";

const ReturnsAndRefundsPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Returns &amp; Refunds | Dosalga</title>
        <meta
          name="description"
          content="Returns & Refunds policy for Dosalga. Learn about return conditions, eligible cases, refund processing, and limitations."
        />
        <link rel="canonical" href={`${siteUrl}/returns-and-refunds`} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Returns &amp; Refunds</h1>

                <div className="policy-section mt-5">
                  <h2>Returns &amp; Refunds</h2>
                  <p>Due to the international nature of our supply chain, Dosalga applies a conditional return policy.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Returns</h3>
                  <p>Returns are accepted only under the following circumstances:</p>
                  <ul>
                    <li>The product arrives damaged</li>
                    <li>The product is defective</li>
                    <li>The product received is incorrect</li>
                  </ul>
                  <p>
                    Customers must contact us within 7 days of delivery and provide clear photographic evidence, the order number, and
                    a description of the issue. Returns based on change of mind, incorrect size selection, or personal preference are
                    not accepted.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Refunds</h3>
                  <p>If a refund is approved, it will be issued to the original payment method. Processing may take 5–10 business days.</p>
                  <p>Shipping fees, customs duties, and taxes are non-refundable.</p>
                  <p>Dosalga reserves the right to refuse any refund request that does not meet the conditions above.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnsAndRefundsPage;
