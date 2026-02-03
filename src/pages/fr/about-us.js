import React from "react";
import Head from "next/head";

const AboutPageFr = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>À propos de Dosalga - Produits du quotidien | Histoire, vision & valeurs</title>
        <meta
          name="description"
          content="Dosalga simplifie l’achat de produits pensés pour la vie quotidienne, livrés chez vous ou au bureau. Découvrez notre origine en 2013, notre vision, mission et valeurs."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={`${siteUrl}/fr/about-us`} />

        <link rel="alternate" hrefLang="en" href={`${siteUrl}/about-us`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/about-us`} />
        <link rel="alternate" hrefLang="de" href={`${siteUrl}/de/about-us`} />
        <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr/about-us`} />
        <link rel="alternate" hrefLang="it" href={`${siteUrl}/it/about-us`} />
        <link rel="alternate" hrefLang="pt" href={`${siteUrl}/pt/about-us`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/about-us`} />
      </Head>

      <div className="about-page pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center mb-60">
            <div className="col-lg-8 text-center">
              <h1 className="mb-3">À propos de Dosalga</h1>
              <p className="text-muted">
                Dosalga facilite l’accès à des produits du quotidien, livrés chez vous, au bureau ou à l’adresse de votre choix. Nous privilégions la praticité, l’accessibilité et l’efficacité.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Des produits pensés pour tous les jours</h2>
                <p>
                  Nous sélectionnons des articles confortables, simples et polyvalents, qui s’intègrent naturellement à la routine et apportent de la fonctionnalité sans complication.
                </p>
                <p>Chaque produit répond à un besoin réel en conciliant utilité, design et facilité d’usage.</p>
              </div>

              <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Comment tout a commencé</h2>
                <p>
                  Dosalga a démarré en 2013 en fournissant des produits commerciaux à divers marchés. Avec l’expérience, l’entreprise a évolué pour améliorer le service, optimiser les processus et s’adapter aux nouveaux usages d’achat.
                </p>
                <p>Aujourd’hui, nous continuons de développer des solutions plus efficaces pour simplifier la vie quotidienne de nos clients.</p>
              </div>

              <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Vision</h2>
                <p>Devenir la meilleure option pour l’approvisionnement en produits essentiels et accompagner un style de vie moderne, pratique et fonctionnel.</p>
              </div>

              <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Mission</h2>
                <p>
                  Répondre aux attentes de nos clients grâce à des solutions innovantes, compétitives et rentables, avec une expérience d’achat claire et fiable, centrée sur la qualité de service.
                </p>
              </div>

              <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
                <h2 className="h4 mb-3">Nos valeurs</h2>
                <ul className="mb-0">
                  <li><strong>Intégrité</strong> : honnêteté, transparence et cohérence.</li>
                  <li><strong>Innovation</strong> : encourager la créativité et la recherche de solutions efficaces.</li>
                  <li><strong>Responsabilité</strong> : respecter nos engagements et agir en conscience.</li>
                  <li><strong>Respect</strong> : valoriser les personnes, la diversité et les points de vue.</li>
                  <li><strong>Travail d’équipe</strong> : collaborer pour atteindre des objectifs communs.</li>
                  <li><strong>Orientation client</strong> : prioriser satisfaction, confiance et besoins.</li>
                  <li><strong>Durabilité</strong> : agir de manière responsable envers l’environnement et la société.</li>
                </ul>
              </div>

              <div className="about-card bg-light p-4 p-lg-5 rounded-3 mb-40">
                <h2 className="h4 mb-3">Ce que propose Dosalga</h2>
                <ul className="mb-0">
                  <li>Un parcours d’achat pratique</li>
                  <li>Une sélection simple des produits</li>
                  <li>Un service fiable</li>
                  <li>Des articles adaptés au quotidien</li>
                </ul>
              </div>

              <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
                <h2 className="h4 mb-3">Pourquoi choisir Dosalga</h2>
                <p>
                  Pour celles et ceux qui recherchent commodité, simplicité et accès rapide aux produits essentiels, intégrés facilement à la vie de tous les jours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPageFr;
