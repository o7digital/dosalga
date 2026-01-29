import React from "react";
import Head from "next/head";

const AboutPage = () => {
  const siteUrl = "https://dosalga.com";
  
  return (
    <>
      <Head>
        <title>About Dosalga - Products for Everyday Life | Story, Vision & Values</title>
        <meta name="description" content="Dosalga makes it easy to get products designed for everyday life, delivered to your home or office. Learn our 2013 origin, vision, mission, and values." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={`${siteUrl}/about-us`} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/about-us`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/about-us`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/about-us`} />
        
        {/* Open Graph */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/about-us`} />
        <meta property="og:title" content="About Dosalga - Products for Everyday Life" />
        <meta property="og:description" content="Company focused on simplifying the purchase of essential products with delivery wherever you need. Story, vision, mission, and values of Dosalga." />
        <meta property="og:site_name" content="Dosalga" />
      </Head>
      
      <div className="about-page pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center mb-60">
            <div className="col-lg-8 text-center">
            <h1 className="mb-3">About Dosalga</h1>
            <p className="text-muted">
              Dosalga is a company dedicated to making everyday products easy to get, delivering them to your home, office, or any selected location. We prioritize convenience, accessibility, and efficiency.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Products Designed for Daily Life</h2>
              <p>
                The products Dosalga offers are meant to keep pace with day-to-day life. We focus on comfort, simplicity, and versatility—choosing items that naturally fit into daily routines and add functionality without complications.
              </p>
              <p>
                Every product aims to answer real needs, balancing usefulness, design, and ease of use.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">How Dosalga Started</h2>
              <p>
                Dosalga began operating in 2013, supplying commercial products to different markets and serving diverse industries. Over time and through experience, the company evolved and restructured to improve service, optimize processes, and adapt to new ways of buying.
              </p>
              <p>
                Today, Dosalga keeps developing to offer more efficient solutions for acquiring products that make daily life easier, maintaining a modern, customer-focused vision.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Vision</h2>
              <p>
                To be the best option for supplying commercial products, creating value for our customers and offering essential items that support a modern, practical, and functional lifestyle.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Mission</h2>
              <p>
                To meet our customers’ expectations and needs through innovative, competitive, and profitable solutions, ensuring a trustworthy, clear shopping experience focused on service quality.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Our Values</h2>
              <ul className="mb-0">
                <li><strong>Integrity</strong>: Act with honesty, transparency, and consistency in every decision.</li>
                <li><strong>Innovation</strong>: Encourage creativity and the constant search for new, efficient solutions.</li>
                <li><strong>Responsibility</strong>: Honor commitments and answer for our actions consciously.</li>
                <li><strong>Respect</strong>: Value people, diversity, and different perspectives.</li>
                <li><strong>Teamwork</strong>: Collaborate and support each other to reach shared goals.</li>
                <li><strong>Customer Focus</strong>: Prioritize our customers’ satisfaction, trust, and needs.</li>
                <li><strong>Sustainability</strong>: Maintain a responsible commitment to the environment and society.</li>
              </ul>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 rounded-3 mb-40">
              <h2 className="h4 mb-3">What Dosalga Provides</h2>
              <ul className="mb-0">
                <li>Convenience in the purchasing process</li>
                <li>Simplicity in selecting and acquiring products</li>
                <li>Reliability in the service</li>
                <li>Products designed for everyday lifestyles</li>
              </ul>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Why Dosalga</h2>
              <p>
                Dosalga is for those who value convenience, practicality, and easy access to essential products, integrating them simply and efficiently into daily life.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
