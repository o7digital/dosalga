import React from "react";
import Link from "next/link";

const ServicesPage = () => {
  return (
    <div className="services-page pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-8 text-center">
            <h1 className="mb-3">Our Services</h1>
            <p className="text-muted">
              Dosalga services are designed to support your shopping experience with clear guidance, responsive care, and inspiration for a modern activewear lifestyle.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="service-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Product Guidance & Fit Support</h2>
              <p>
                We help you find the right size and fit with clear product descriptions and straightforward size guidance for every piece of everyday activewear.
              </p>
            </div>

            <div className="service-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Customer Care & Order Support</h2>
              <p>
                From orders and shipping updates to simple returns, our team offers responsive assistance and a transparent process at every step.
              </p>
            </div>

            <div className="service-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Style & Lifestyle Inspiration</h2>
              <p>
                Explore outfit ideas and everyday activewear tips that move from studio to street, helping you build a versatile wardrobe with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <Link href="/contact" className="btn btn-dark">
              Need help? Contact our support team.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
