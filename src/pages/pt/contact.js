import React from 'react';
import Head from 'next/head';

const ContactPagePt = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/contact', es: '/contact', de: '/contact', fr: '/contact', it: '/contact', pt: '/contact' };
  const currentLocale = 'pt';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'pt_PT';
  
  return (
    <>
      <Head>
        <title>Contato Dosalga - Suporte ao cliente | Fale conosco</title>
        <meta name="description" content="Fale com o suporte da Dosalga para dúvidas sobre activewear, pedidos, envios ou devoluções. Disponíveis 24/7 por e-mail ou telefone." />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        <meta property="og:locale" content={ogLocale} />
      </Head>
      <div className="contact-page pt-100 mb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="inquiry-form">
                <div className="section-title mb-20">
                  <h4>Fale conosco a qualquer hora</h4>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Nome completo*</label>
                        <input type="text" placeholder="Seu nome" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Telefone*</label>
                        <input type="text" placeholder="Ex: +55 11 90000-0000" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Email <span>(opcional)</span></label>
                        <input type="email" placeholder="Ex: info@mail.com" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Assunto*</label>
                        <input type="text" placeholder="Assunto" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-30">
                        <label>Mensagem*</label>
                        <textarea placeholder="Como podemos ajudar?" defaultValue={""} />
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

export default ContactPagePt;
