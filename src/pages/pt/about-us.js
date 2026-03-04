import React from "react";
import Head from "next/head";

const AboutPagePt = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Sobre a Dosalga - Produtos para o dia a dia | História, visão e valores</title>
        <meta
          name="description"
          content="A Dosalga facilita comprar produtos pensados para o cotidiano, entregues em casa ou no escritório. Conheça nossa origem em 2013, visão, missão e valores."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={`${siteUrl}/pt/about-us`} />

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
              <h1 className="mb-3">Sobre a Dosalga</h1>
              <p className="text-muted">
                A Dosalga facilita o acesso a produtos para o dia a dia, entregando-os em casa, no escritório ou onde você preferir. Priorizamos conveniência, acessibilidade e eficiência.
              </p>
            </div>
          </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Produtos pensados para o cotidiano</h2>
              <p>
                Selecionamos itens confortáveis, simples e versáteis, que se encaixam naturalmente na rotina e agregam funcionalidade sem complicação.
              </p>
              <p>Cada produto busca equilibrar utilidade, design e facilidade de uso.</p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Como a Dosalga começou</h2>
              <p>
                A Dosalga iniciou em 2013 fornecendo produtos comerciais para diferentes mercados. Com a experiência, evoluímos para melhorar o serviço, otimizar processos e acompanhar novos hábitos de compra.
              </p>
              <p>Hoje seguimos desenvolvendo soluções mais eficientes para facilitar o dia a dia dos clientes.</p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Visão</h2>
              <p>Ser a melhor opção para suprir produtos essenciais, apoiando um estilo de vida moderno, prático e funcional.</p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Missão</h2>
              <p>
                Atender expectativas com soluções inovadoras, competitivas e rentáveis, garantindo uma experiência de compra clara, confiável e centrada na qualidade do serviço.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Nossos valores</h2>
              <ul className="mb-0">
                <li><strong>Integridade</strong>: agir com honestidade, transparência e consistência.</li>
                <li><strong>Inovação</strong>: estimular criatividade e busca por soluções melhores.</li>
                <li><strong>Responsabilidade</strong>: cumprir compromissos e agir com consciência.</li>
                <li><strong>Respeito</strong>: valorizar pessoas, diversidade e diferentes perspectivas.</li>
                <li><strong>Trabalho em equipe</strong>: colaborar para metas comuns.</li>
                <li><strong>Foco no cliente</strong>: priorizar satisfação, confiança e necessidades.</li>
                <li><strong>Sustentabilidade</strong>: compromisso responsável com o meio ambiente e a sociedade.</li>
              </ul>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 rounded-3 mb-40">
              <h2 className="h4 mb-3">O que a Dosalga oferece</h2>
              <ul className="mb-0">
                <li>Processo de compra conveniente</li>
                <li>Seleção simples de produtos</li>
                <li>Serviço confiável</li>
                <li>Itens pensados para o dia a dia</li>
              </ul>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Por que a Dosalga</h2>
              <p>
                Para quem valoriza praticidade, simplicidade e acesso rápido a produtos essenciais, integrados de forma fácil à rotina.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AboutPagePt;
