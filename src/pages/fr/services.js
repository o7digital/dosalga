import React from "react";
import Link from "next/link";

const ServicesPageFr = () => {
  return (
    <div className="services-page pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-8 text-center">
            <h1 className="mb-3">Nos Services</h1>
            <p className="text-muted">
              Les services Dosalga accompagnent votre expérience d’achat avec des conseils clairs, une assistance réactive et des inspirations pour un lifestyle actif.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="service-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Conseil produit & tailles</h2>
              <p>Nous vous aidons à trouver la bonne taille et le bon fit grâce à des descriptions claires et des guides simples pour chaque pièce.</p>
            </div>

            <div className="service-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Service client & suivi de commande</h2>
              <p>De la commande à la livraison en passant par des retours simples, notre équipe offre une aide rapide et un processus transparent.</p>
            </div>

            <div className="service-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Inspiration style & lifestyle</h2>
              <p>Découvrez des idées de looks et des conseils pour porter l’activewear du studio à la rue et construire une garde-robe polyvalente.</p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-auto">
            <Link href="/fr/contact" className="btn btn-dark">
              Besoin d’aide ? Contactez notre équipe support.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPageFr;
