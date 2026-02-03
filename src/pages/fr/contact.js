import React from 'react';
import Head from 'next/head';

const ContactPageFr = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/contact', es: '/contact', de: '/contact', fr: '/contact', it: '/contact', pt: '/contact' };
  const currentLocale = 'fr';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'fr_FR';
  
  return (
    <>
      <Head>
        <title>Contact Dosalga - Service client | Nous écrire</title>
        <meta name="description" content="Contactez le support Dosalga pour toute question sur nos produits d’activewear, commandes, expédition ou retours. Aide 24/7 par email ou téléphone." />
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
                  <h4>Contactez-nous quand vous voulez</h4>
                </div>
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Nom complet*</label>
                        <input type="text" placeholder="Votre nom" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Téléphone*</label>
                        <input type="text" placeholder="Ex: +33 6 00 00 00 00" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner mb-20">
                        <label>Email <span>(optionnel)</span></label>
                        <input type="email" placeholder="Ex: info@mail.com" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-20">
                        <label>Objet*</label>
                        <input type="text" placeholder="Objet" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner mb-30">
                        <label>Message*</label>
                        <textarea placeholder="Comment pouvons-nous aider ?" defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <button type="submit" className="primary-btn1 hover-btn3">Envoyer</button>
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

export default ContactPageFr;
