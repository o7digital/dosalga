import React from "react";
import Head from "next/head";

const TermsOfUsePage = () => {
  return (
    <>
      <Head>
        <title>Terms of Use | Dosalga</title>
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Terms of Use</h1>

                <p>Access to and use of the Dosalga website implies acceptance of these Terms of Use.</p>

                <div className="policy-section mt-5">
                  <h2>Website use</h2>
                  <p>
                    Users agree to use this website in a lawful and responsible manner. Any fraudulent, illegal, or harmful use of
                    the site is strictly prohibited.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Website content</h2>
                  <p>
                    All texts, images, logos, and content displayed on this website are the property of Dosalga or their respective
                    owners and are protected by intellectual property laws.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Liability</h2>
                  <p>
                    Dosalga does not guarantee that the website will be free from errors or interruptions. Use of the website is at
                    the user’s own risk.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Modifications</h2>
                  <p>Dosalga reserves the right to modify these Terms of Use at any time without prior notice.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfUsePage;

