import React from "react";
import Head from "next/head";

const ShippingPolicyPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Shipping Policy | Dosalga</title>
        <meta
          name="description"
          content="Shipping Policy for Dosalga international orders, including shipping times, order processing, and shipping responsibilities."
        />
        <link rel="canonical" href={`${siteUrl}/shipping-policy`} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Shipping Policy</h1>

                <div className="policy-section mt-5">
                  <h2>Shipping Policy</h2>
                  <p>
                    Dosalga ships internationally through trusted logistics partners. Products are dispatched directly from our
                    fulfillment partners located outside the destination country.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Shipping Times</h3>
                  <p>
                    Estimated delivery times are 10–20 business days depending on destination, customs clearance, and carrier
                    operations. These timeframes are estimates only and may vary due to factors beyond our control.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Order Processing</h3>
                  <p>
                    Orders are typically processed within 2–5 business days before shipment. Once shipped, a tracking number will be
                    provided when available.
                  </p>
                </div>

                <div className="policy-section mt-4">
                  <h3>Shipping Responsibility</h3>
                  <p>
                    Once an order has been handed over to the carrier, Dosalga is not responsible for delays, customs holds, or
                    delivery issues caused by customs authorities, shipping carriers, or incorrect delivery information provided by
                    the customer.
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

export default ShippingPolicyPage;
