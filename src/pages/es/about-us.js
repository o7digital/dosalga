import React from "react";
import Head from "next/head";

const AboutPageES = () => {
  const siteUrl = "https://dosalga.com";
  
  return (
    <>
      <Head>
        <title>Sobre Dosalga - Marca Premium de Ropa Deportiva</title>
        <meta name="description" content="Conoce Dosalga, una marca moderna de ropa deportiva de estilo de vida construida para el movimiento diario. Ropa deportiva cómoda para la vida real." />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/about-us`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/about-us`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/about-us`} />
        
        {/* Open Graph */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/es/about-us`} />
        <meta property="og:title" content="Sobre Dosalga - Marca Premium de Ropa Deportiva" />
        <meta property="og:description" content="Conoce Dosalga, una marca moderna de ropa deportiva de estilo de vida construida para el movimiento diario. Ropa deportiva cómoda para la vida real." />
        <meta property="og:site_name" content="Dosalga" />
      </Head>
      
      <div className="about-page pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center mb-60">
            <div className="col-lg-8 text-center">
            <h1 className="mb-3">Sobre Dosalga</h1>
            <p className="text-muted">
              Dosalga es una marca moderna de estilo de vida de ropa deportiva construida alrededor de ropa deportiva cómoda que se mueve contigo todos los días.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Ropa Deportiva Diseñada para la Vida Real</h2>
              <p>
                Dosalga es una marca moderna de ropa deportiva de estilo de vida construida para el movimiento diario. Nos enfocamos en la comodidad en la que puedes vivir—piezas que se sienten bien para estiramientos matutinos, recados, trabajo remoto o caminar por la ciudad—sin perseguir el rendimiento extremo.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Cómo Comenzó Dosalga</h2>
              <p>
                Lanzamos Dosalga después de darnos cuenta de que la mayoría de las personas pasan más tiempo en rutinas reales que en el gimnasio. El objetivo era simple: crear ropa deportiva que se adapte a la vida diaria, priorizando la simplicidad, la comodidad y la versatilidad sobre el bombo publicitario.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Nuestra Misión</h2>
              <p>
                Nuestra misión es entregar elementos esenciales de ropa deportiva que apoyen los estilos de vida modernos. Cada pieza está diseñada para moverse contigo durante el día—en casa, en recados casuales o durante actividad ligera—para que tu ropa nunca te frene.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Lo Que Hace Diferente a Dosalga</h2>
              <p>
                Elegimos la comodidad cotidiana sobre el rendimiento extremo, con diseños versátiles y siluetas limpias y modernas. Nuestras telas y cortes funcionan para climas suaves y cambiantes, manteniendo el aspecto simple y práctico para que puedas usar cada pieza a menudo.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Lo Que Creamos</h2>
              <p>
                Hacemos joggers, tops transpirables, capas ligeras y elementos esenciales para el día a día para hombres, mujeres y niños. Cada artículo está construido para mezclarse fácilmente, resistir el uso frecuente y entregar ropa deportiva cómoda para la vida real.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Únete a Nosotros</h2>
              <p>
                Dosalga es para personas que valoran la comodidad todos los días. Nos centramos en mantener la vida simple, construir hábitos saludables y movernos a tu propio ritmo. Si buscas ropa deportiva que simplemente funcione, estás en el lugar correcto.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPageES;
