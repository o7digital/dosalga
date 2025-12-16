import React from 'react';
import Head from 'next/head';

const ContactPage = () => {
  const siteUrl = "https://dosalga.com";
  
  return (
    <>
      <Head>
        <title>Contact Dosalga - Get in Touch</title>
        <meta name="description" content="Contact Dosalga for any inquiries about our premium activewear products. Reach us anytime." />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/contact`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/contact`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/contact`} />
        
        {/* Open Graph */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/contact`} />
        <meta property="og:title" content="Contact Dosalga - Get in Touch" />
        <meta property="og:description" content="Contact Dosalga for any inquiries about our premium activewear products. Reach us anytime." />
        <meta property="og:site_name" content="Dosalga" />
      </Head>
      
      <div className="contact-page pt-100 mb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inquiry-form">
                <div className="section-title mb-20">
                  <h4>Reach Us Anytime</h4>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Full Name*</label>
                        <input type="text" placeholder="Jackson Mile" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Phone*</label>
                        <input type="text" placeholder="Ex- +880-13* ** ***" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Email <span>(Optional)</span></label>
                        <input type="email" placeholder="Ex- info@gmail.com" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Subject*</label>
                        <input type="email" placeholder="Subject" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-30">
                        <label>Short Notes*</label>
                        <textarea placeholder="Write Something..." defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <button type="submit" className="primary-btn1 hover-btn3">Submit Now</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
