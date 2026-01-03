import React from 'react';
import Head from 'next/head';

const ContactPageEs = () => {
  const siteUrl = "https://dosalga.com";
  
  return (
    <>
      <Head>
        <title>Contacto Dosalga - Atención al Cliente | Contáctanos</title>
        <meta name="description" content="Contacta con el servicio de atención al cliente de Dosalga para consultas sobre nuestros productos de activewear, pedidos, envíos o devoluciones. Estamos aquí para ayudarte 24/7. Contáctanos por email o teléfono." />
        <link rel="canonical" href={`${siteUrl}/es/contact`} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/contact`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/contact`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/contact`} />
        
        {/* Open Graph */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/es/contact`} />
        <meta property="og:title" content="Contacto Dosalga - Contáctanos" />
        <meta property="og:description" content="Contacta con Dosalga para consultas sobre nuestros productos de activewear premium. Estamos para ayudarte." />
        <meta property="og:site_name" content="Dosalga" />
      </Head>
      <div className="contact-page pt-100 mb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inquiry-form">
                <div className="section-title mb-20">
                  <h4>Contáctanos cuando quieras</h4>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Nombre completo*</label>
                        <input type="text" placeholder="Tu nombre" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Teléfono*</label>
                        <input type="text" placeholder="Ej: +52 55 0000 0000" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Email <span>(Opcional)</span></label>
                        <input type="email" placeholder="Ej: info@correo.com" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Asunto*</label>
                        <input type="text" placeholder="Asunto" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-30">
                        <label>Mensaje*</label>
                        <textarea placeholder="Cuéntanos en qué podemos ayudarte" defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <button type="submit" className="primary-btn1 hover-btn3">Enviar</button>
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

export default ContactPageEs;
