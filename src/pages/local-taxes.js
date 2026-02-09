import React from "react";
import Head from "next/head";

const LocalTaxesPage = () => {
  return (
    <>
      <Head>
        <title>Local Taxes | Dosalga</title>
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Local Taxes</h1>

                <p>
                  Dosalga operates as an international e-commerce platform. Products are shipped directly from suppliers and
                  fulfillment partners located outside the destination country.
                </p>

                <div className="policy-section mt-5">
                  <h2>Orders to Mexico</h2>
                  <p>Orders delivered to Mexico may be subject to:</p>
                  <ul>
                    <li>Value Added Tax (VAT)</li>
                    <li>Import duties</li>
                    <li>Customs or administrative fees</li>
                  </ul>
                  <p>
                    These charges are determined by Mexican tax authorities, customs offices, or shipping carriers at the time of
                    delivery. Dosalga has no control over these charges and cannot predict their amount. All such fees are the sole
                    responsibility of the customer.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Orders to the United States</h2>
                  <p>
                    Orders shipped to the United States are not subject to U.S. sales tax, unless otherwise required by applicable
                    law. Dosalga does not currently operate offices, warehouses, or physical inventory within the United States.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>General considerations</h2>
                  <p>
                    Tax and customs regulations vary by country. By placing an order, customers agree to comply with local
                    regulations and pay any applicable taxes or fees required by their destination country.
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

export default LocalTaxesPage;

