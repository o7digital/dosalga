import React from 'react';
import Head from 'next/head';

const ContactPageDe = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/contact', es: '/contact', de: '/contact', fr: '/contact', it: '/contact', pt: '/contact' };
  const currentLocale = 'de';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'de_DE';
  
  return (
    <>
      <Head>
        <title>Kontakt Dosalga - Kundensupport | Kontaktiere uns</title>
        <meta name="description" content="Kontaktiere den Dosalga-Support für Fragen zu Activewear, Bestellungen, Versand oder Retouren. Wir helfen dir 24/7 per E-Mail oder Telefon." />
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
                  <h4>Schreib uns jederzeit</h4>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Vollständiger Name*</label>
                        <input type="text" placeholder="Max Mustermann" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Telefon*</label>
                        <input type="text" placeholder="z.B. +49 151 0000000" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>E-Mail <span>(optional)</span></label>
                        <input type="email" placeholder="z.B. info@mail.com" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Betreff*</label>
                        <input type="text" placeholder="Betreff" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-30">
                        <label>Nachricht*</label>
                        <textarea placeholder="Wobei können wir helfen?" defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <button type="submit" className="primary-btn1 hover-btn3">Absenden</button>
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

export default ContactPageDe;
