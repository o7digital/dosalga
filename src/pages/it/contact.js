import React from 'react';
import Head from 'next/head';

const ContactPageIt = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/contact', es: '/contact', de: '/contact', fr: '/contact', it: '/contact', pt: '/contact' };
  const currentLocale = 'it';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'it_IT';
  
  return (
    <>
      <Head>
        <title>Contatta Dosalga - Assistenza clienti | Scrivici</title>
        <meta name="description" content="Contatta l’assistenza Dosalga per domande su activewear, ordini, spedizioni o resi. Siamo disponibili 24/7 via email o telefono." />
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
                  <h4>Scrivici quando vuoi</h4>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Nome completo*</label>
                        <input type="text" placeholder="Il tuo nome" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Telefono*</label>
                        <input type="text" placeholder="Es: +39 333 0000000" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Email <span>(opzionale)</span></label>
                        <input type="email" placeholder="Es: info@mail.com" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Oggetto*</label>
                        <input type="text" placeholder="Oggetto" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-30">
                        <label>Messaggio*</label>
                        <textarea placeholder="Come possiamo aiutarti?" defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <button type="submit" className="primary-btn1 hover-btn3">Invia</button>
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

export default ContactPageIt;
