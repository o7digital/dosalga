import React from "react";
import Head from "next/head";

const ShippingProvidersPage = () => {
  return (
    <>
      <Head>
        <title>Shipping Providers | Dosalga</title>
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Shipping Providers</h1>

                <p>
                  Dosalga works with internationally recognized logistics providers to ensure reliable and efficient delivery of
                  customer orders.
                </p>

                <div className="policy-section mt-5">
                  <h2>Shipping partners</h2>
                  <p>Depending on the destination and product type, shipments may be handled by:</p>
                  <ul>
                    <li>DHL</li>
                    <li>FedEx</li>
                    <li>Other international logistics partners</li>
                  </ul>
                  <p>The shipping carrier is automatically selected based on destination, availability, and shipping conditions.</p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Order tracking</h2>
                  <p>
                    Once an order has been dispatched, customers will receive a tracking number when available, allowing them to
                    follow the shipment directly with the carrier’s tracking system.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Shipping responsibility</h2>
                  <p>
                    After the order is handed over to the shipping provider, delivery timelines and transportation responsibility
                    rest with the carrier. Delays related to customs procedures, logistics operations, or external factors are
                    beyond Dosalga’s control.
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

export default ShippingProvidersPage;

