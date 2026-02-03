import React from "react";
import Link from "next/link";

const ServicesPageIt = () => {
  return (
    <div className="services-page pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-8 text-center">
            <h1 className="mb-3">I nostri servizi</h1>
            <p className="text-muted">
              I servizi Dosalga supportano il tuo shopping con indicazioni chiare, assistenza rapida e ispirazione di stile per un lifestyle attivo.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="service-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Guida prodotto e taglie</h2>
              <p>Ti aiutiamo a scegliere taglia e fit giusti con descrizioni chiare e consigli semplici per ogni capo.</p>
            </div>

            <div className="service-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Customer care & supporto ordini</h2>
              <p>Da ordini e spedizioni a resi facili, il nostro team offre assistenza veloce e processi trasparenti in ogni fase.</p>
            </div>

            <div className="service-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Ispirazione stile e lifestyle</h2>
              <p>Scopri idee di outfit e consigli per portare l’activewear dallo studio alla strada, costruendo un guardaroba versatile.</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <Link href="/it/contact" className="btn btn-dark">
              Serve aiuto? Contatta il nostro supporto.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPageIt;
