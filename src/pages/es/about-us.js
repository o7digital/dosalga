import React from "react";
import Head from "next/head";

const AboutPageEs = () => {
  const siteUrl = "https://dosalga.com";
  
  return (
    <>
      <Head>
        <title>Sobre Dosalga - Productos para la vida diaria | Historia, visión y valores</title>
        <meta name="description" content="Conoce a Dosalga, empresa fundada en 2013 que facilita la compra de productos esenciales para la vida diaria con entregas en casa u oficina. Descubre su historia, visión, misión y valores." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={`${siteUrl}/es/about-us`} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/about-us`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/about-us`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/about-us`} />
        
        {/* Open Graph */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/es/about-us`} />
        <meta property="og:title" content="Sobre Dosalga - Productos para la vida diaria" />
        <meta property="og:description" content="Empresa dedicada a simplificar la compra de productos esenciales con entregas donde los necesitas. Historia, misión y valores de Dosalga." />
        <meta property="og:site_name" content="Dosalga" />
      </Head>
    <div className="about-page pt-100 pb-100">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-8 text-center">
            <h1 className="mb-3">Sobre Dosalga</h1>
            <p className="text-muted">
              Facilitamos la adquisición de productos diseñados para la vida diaria y los llevamos a tu hogar, oficina o el punto que elijas, priorizando comodidad, accesibilidad y eficiencia.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Qué es Dosalga</h2>
              <p>
                Somos una empresa dedicada a simplificar la compra de artículos esenciales para el día a día. Eliminamos desplazamientos innecesarios y optimizamos la experiencia para que recibas lo que necesitas con claridad y sin fricciones.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Artículos diseñados para la vida diaria</h2>
              <p>
                Seleccionamos productos que acompañan el ritmo cotidiano. Nos enfocamos en comodidad, simplicidad y versatilidad, eligiendo artículos que se integran de forma natural en la rutina y mantienen equilibrio entre utilidad, diseño y facilidad de uso.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Cómo inició Dosalga</h2>
              <p>
                Empezamos en 2013 suministrando productos comerciales para distintos mercados e industrias. La experiencia nos llevó a reestructurarnos para mejorar el servicio, optimizar procesos y adaptarnos a nuevas formas de consumo con un enfoque más ágil y cercano.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Visión</h2>
              <p>
                Ser la mejor opción para el suministro de productos comerciales, generando valor a nuestros clientes con artículos esenciales que acompañen un estilo de vida moderno, práctico y funcional.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Misión</h2>
              <p>
                Satisfacer las expectativas y necesidades de nuestros clientes mediante soluciones innovadoras, competitivas y rentables, garantizando una experiencia de compra confiable, clara y orientada a la calidad del servicio.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Nuestros valores</h2>
              <ul className="mb-0">
                <li>Integridad</li>
                <li>Innovación</li>
                <li>Responsabilidad</li>
                <li>Respeto</li>
                <li>Trabajo en equipo</li>
                <li>Orientación al cliente</li>
                <li>Sostenibilidad</li>
              </ul>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 rounded-3 mb-40">
              <h2 className="h4 mb-3">Qué aporta Dosalga</h2>
              <ul className="mb-0">
                <li>Comodidad en el proceso de compra</li>
                <li>Simplicidad en la selección y adquisición de productos</li>
                <li>Fiabilidad en el servicio</li>
                <li>Productos pensados para el estilo de vida cotidiano</li>
              </ul>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Por qué Dosalga</h2>
              <p>
                Somos la opción para quienes valoran la comodidad, la practicidad y la facilidad para acceder a productos esenciales, integrándolos de forma simple y eficiente en su día a día.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutPageEs;
