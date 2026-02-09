import React from "react";
import Head from "next/head";

const ReturnsPolicyPage = () => {
  return (
    <>
      <Head>
        <title>Returns Policy | Dosalga</title>
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Returns Policy</h1>

                <p>Due to the international nature of Dosalga’s supply chain, a limited returns policy applies.</p>

                <div className="policy-section mt-5">
                  <h2>Accepted cases</h2>
                  <p>Returns are accepted only in the following situations:</p>
                  <ul>
                    <li>The product arrives damaged</li>
                    <li>The product has manufacturing defects</li>
                    <li>The incorrect product was received</li>
                  </ul>
                  <p>
                    Customers must contact us within 7 days of delivery, providing photographic evidence and the order number.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Non-accepted cases</h2>
                  <p>Returns based on change of mind, improper use, normal wear, or personal preference are not accepted.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Refunds</h2>
                  <p>
                    Approved refunds will be issued to the original payment method. Shipping costs, taxes, and customs duties are
                    non-refundable.
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

export default ReturnsPolicyPage;

