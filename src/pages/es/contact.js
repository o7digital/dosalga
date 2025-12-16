import React from 'react';
import Head from 'next/head';

const ContactPageES = () => {
  const siteUrl = "https://dosalga.com";
  
  return (
    <>
      <Head>
        <title>Contactar Dosalga - Ponte en Contacto</title>
        <meta name="description" content="Contacta a Dosalga para cualquier consulta sobre nuestros productos de ropa deportiva premium. Contáctanos en cualquier momento." />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/contact`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/contact`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/contact`} />
        
        {/* Open Graph */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/es/contact`} />
        <meta property="og:title" content="Contactar Dosalga - Ponte en Contacto" />
        <meta property="og:description" content="Contacta a Dosalga para cualquier consulta sobre nuestros productos de ropa deportiva premium. Contáctanos en cualquier momento." />
        <meta property="og:site_name" content="Dosalga" />
      </Head>
      
      <div className="contact-page pt-100 mb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inquiry-form">
                <div className="section-title mb-20">
                  <h4>Contáctanos en Cualquier Momento</h4>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Nombre Completo*</label>
                        <input type="text" placeholder="Jackson Mile" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Teléfono*</label>
                        <input type="text" placeholder="Ej- +34-6** ** ** **" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Email <span>(Opcional)</span></label>
                        <input type="email" placeholder="Ej- info@gmail.com" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Asunto*</label>
                        <input type="email" placeholder="Asunto" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-30">
                        <label>Notas Breves*</label>
                        <textarea placeholder="Escribe algo..." defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <button type="submit" className="primary-btn1 hover-btn3">Enviar Ahora</button>
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

export default ContactPageES;
