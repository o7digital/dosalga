import React from "react";

const AboutPage = () => {
  return (
    <div className="about-page pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-8 text-center">
            <h1 className="mb-3">About Dosalga</h1>
            <p className="text-muted">
              Dosalga is a modern activewear lifestyle brand built around comfortable sportswear that moves with you every day.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <span className="text-uppercase small text-muted d-block mb-2">Who We Are</span>
              <h2 className="h4 mb-3">A Modern Activewear & Lifestyle Brand</h2>
              <p>
                Dosalga is a modern activewear and lifestyle brand shaped around comfort, versatility, and everyday movement. We create pieces that feel premium yet easy, keeping you ready for school runs, coffee stops, and everything between—real life over extreme performance.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <span className="text-uppercase small text-muted d-block mb-2">Our Philosophy</span>
              <h2 className="h4 mb-3">Designed for Everyday Movement</h2>
              <p>
                Comfort comes first so you can move without pressure. Our everyday activewear works for light workouts, walks, or stretching at home, and transitions smoothly from studio to street with a clean, minimal look.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <span className="text-uppercase small text-muted d-block mb-2">What We Create</span>
              <h2 className="h4 mb-3">Versatile Activewear Essentials</h2>
              <p>
                We design comfortable sportswear for men, women, and kids—everyday joggers, breathable tops, and light layers made for mild and transitional climates. Every piece is built to mix, match, and keep up with your day-to-day routine.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
              <span className="text-uppercase small text-muted d-block mb-2">Our Commitment</span>
              <h2 className="h4 mb-3">Quality, Simplicity & Confidence</h2>
              <p>
                We focus on quality materials, clean design, and long-lasting comfort so you feel confident in every wear. Dosalga champions an inclusive, modern lifestyle with dependable, everyday activewear essentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
