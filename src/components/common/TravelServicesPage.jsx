import Head from 'next/head';
import Link from 'next/link';

const CONTENT = {
  en: {
    title: 'Travel services designed around your journey',
    eyebrow: 'DOSALGA USA SERVICES',
    intro: 'From choosing the right suitcase to protecting it on the road, Dosalga helps travelers shop with clarity, prepare with confidence, and get support when it matters.',
    metaTitle: 'Travel & Luggage Services | Dosalga USA',
    metaDescription: 'Explore Dosalga USA travel services: luggage selection guidance, packing advice, order support, shipping information, returns, and practical travel accessories.',
    promiseTitle: 'A simpler way to prepare for travel',
    promiseText: 'Good travel starts before departure. We organize product information around real questions—trip length, luggage size, storage, protection, and mobility—so you can compare options without guesswork.',
    services: [
      ['01', 'Luggage selection guidance', 'Choose between carry-ons, checked suitcases, expandable luggage, backpacks, and travel bags using clear dimensions, capacity details, and practical use cases. Our goal is to help you select the right format for weekend trips, business travel, or longer journeys.'],
      ['02', 'Packing and organization support', 'Packing organizers, vacuum bags, protective covers, and compact accessories can make limited space work harder. We explain what each product is designed to do so your belongings stay organized, accessible, and easier to transport.'],
      ['03', 'Order and delivery assistance', 'Need an update on an order or help understanding delivery information? Our customer support team can assist with order details, shipping questions, and the next steps when a package needs attention.'],
      ['04', 'Returns with clear information', 'If an item is not the right fit for your needs, our return information explains eligibility, timing, and the steps to follow. Clear expectations help you make decisions before and after your purchase.'],
    ],
    processTitle: 'From planning to arrival',
    process: [
      ['Compare', 'Review size, capacity, materials, and travel features.'],
      ['Choose', 'Select the luggage or accessory that matches your trip.'],
      ['Track', 'Follow your order using the delivery information provided.'],
      ['Travel', 'Pack with confidence and keep essentials organized.'],
    ],
    faqTitle: 'Travel shopping questions',
    faq: [
      ['How do I choose between carry-on and checked luggage?', 'Start with the length of your trip and your airline’s current size rules. Carry-ons work well for short trips and faster airport movement; checked luggage provides more capacity for longer stays.'],
      ['What should I check before ordering a suitcase?', 'Review exterior dimensions, internal capacity, wheel configuration, handle design, material, and included accessories. Product specifications provide the most reliable basis for comparison.'],
      ['Can you help with an existing order?', 'Yes. Contact us with your order details and the email address used at checkout so our team can identify the purchase and assist efficiently.'],
      ['Where can I find shipping and return information?', 'Our shipping and returns pages explain the applicable process. If your situation is unusual, contact support before sending an item back.'],
    ],
    ctaTitle: 'Need help with a product or order?',
    ctaText: 'Tell us what you need and our support team will guide you to the right information.',
    cta: 'Contact Dosalga',
  },
  es: {
    title: 'Servicios de viaje pensados para cada trayecto',
    eyebrow: 'SERVICIOS DOSALGA USA',
    intro: 'Desde elegir la maleta adecuada hasta protegerla durante el viaje, Dosalga te ayuda a comprar con claridad, prepararte con confianza y recibir soporte cuando lo necesitas.',
    metaTitle: 'Servicios de viaje y equipaje | Dosalga USA',
    metaDescription: 'Conoce los servicios de Dosalga USA: orientación para elegir maletas, consejos de organización, soporte de pedidos, envíos, devoluciones y accesorios de viaje.',
    promiseTitle: 'Una forma más sencilla de preparar tu viaje',
    promiseText: 'Un buen viaje comienza antes de salir. Organizamos la información alrededor de preguntas reales—duración, tamaño, capacidad, protección y movilidad—para que puedas comparar opciones sin complicaciones.',
    services: [
      ['01', 'Orientación para elegir equipaje', 'Compara maletas de cabina, equipaje documentado, modelos expandibles, mochilas y bolsas de viaje mediante dimensiones claras, capacidad y usos prácticos. Te ayudamos a encontrar el formato apropiado para escapadas, viajes de trabajo o trayectos largos.'],
      ['02', 'Organización y preparación', 'Los organizadores, bolsas al vacío, fundas protectoras y accesorios compactos permiten aprovechar mejor el espacio. Explicamos la función de cada producto para mantener tus pertenencias ordenadas, accesibles y fáciles de transportar.'],
      ['03', 'Asistencia para pedidos y entregas', 'Si necesitas información sobre un pedido o una entrega, nuestro equipo puede ayudarte a revisar los datos disponibles, resolver dudas de envío e indicarte los siguientes pasos cuando un paquete requiere atención.'],
      ['04', 'Devoluciones con información clara', 'Si un artículo no responde a tus necesidades, la política de devolución explica los requisitos, plazos y pasos aplicables. Una información transparente facilita tus decisiones antes y después de comprar.'],
    ],
    processTitle: 'Desde la planificación hasta tu destino',
    process: [
      ['Compara', 'Revisa tamaño, capacidad, materiales y funciones de viaje.'],
      ['Elige', 'Selecciona la maleta o accesorio que corresponde a tu trayecto.'],
      ['Sigue', 'Consulta tu pedido con la información de entrega disponible.'],
      ['Viaja', 'Organiza tus pertenencias y prepárate con confianza.'],
    ],
    faqTitle: 'Preguntas sobre equipaje y compras',
    faq: [
      ['¿Cómo elijo entre equipaje de cabina y documentado?', 'Considera la duración del viaje y las reglas actuales de tu aerolínea. Una maleta de cabina facilita los viajes cortos; el equipaje documentado ofrece mayor capacidad para estancias largas.'],
      ['¿Qué debo revisar antes de comprar una maleta?', 'Comprueba las dimensiones exteriores, capacidad interior, ruedas, asa, material y accesorios incluidos. Las especificaciones del producto son la mejor base para comparar.'],
      ['¿Pueden ayudarme con un pedido existente?', 'Sí. Escríbenos con los datos del pedido y el correo utilizado en la compra para que podamos localizarlo y ayudarte de forma eficiente.'],
      ['¿Dónde encuentro la información de envíos y devoluciones?', 'Las páginas de envíos y devoluciones explican el proceso aplicable. Si tu caso es particular, contacta con soporte antes de devolver un artículo.'],
    ],
    ctaTitle: '¿Necesitas ayuda con un producto o pedido?',
    ctaText: 'Cuéntanos qué necesitas y nuestro equipo te orientará con la información adecuada.',
    cta: 'Contactar a Dosalga',
  },
};

export default function TravelServicesPage({ language = 'en' }) {
  const lang = language === 'es' ? 'es' : 'en';
  const content = CONTENT[lang];
  const siteUrl = 'https://www.dosalga.online';
  const canonical = lang === 'en' ? `${siteUrl}/services` : `${siteUrl}/es/services`;
  const contactPath = lang === 'en' ? '/contact' : '/es/contact';

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/services`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/services`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/services`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
      </Head>

      <main className="travel-services">
        <section className="services-hero">
          <div className="services-hero-glow" />
          <div className="container services-hero-inner">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="hero-intro">{content.intro}</p>
          </div>
        </section>

        <section className="services-intro">
          <div className="container intro-grid">
            <p className="section-kicker">DOSALGA</p>
            <div>
              <h2>{content.promiseTitle}</h2>
              <p>{content.promiseText}</p>
            </div>
          </div>
        </section>

        <section className="service-list">
          <div className="container">
            {content.services.map(([number, title, text]) => (
              <article className="service-row" key={number}>
                <span className="service-number">{number}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-section">
          <div className="container">
            <h2>{content.processTitle}</h2>
            <div className="journey-grid">
              {content.process.map(([title, text], index) => (
                <div className="journey-step" key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container faq-layout">
            <h2>{content.faqTitle}</h2>
            <div className="faq-list">
              {content.faq.map(([question, answer]) => (
                <article className="faq-item" key={question}>
                  <h3>{question}</h3>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="services-cta">
          <div className="container cta-inner">
            <div>
              <h2>{content.ctaTitle}</h2>
              <p>{content.ctaText}</p>
            </div>
            <Link href={contactPath} className="cta-button">{content.cta}</Link>
          </div>
        </section>
      </main>

      <style jsx>{`
        .travel-services { background: #f6f4f0; color: #161616; }
        .services-hero { position: relative; overflow: hidden; min-height: 560px; display: flex; align-items: center; background: #101010; color: #fff; }
        .services-hero::before { content: ''; position: absolute; inset: 0; opacity: .38; background: linear-gradient(115deg, #000 0%, transparent 60%), radial-gradient(circle at 82% 20%, rgba(210, 0, 0, .52), transparent 35%); }
        .services-hero-glow { position: absolute; width: 460px; height: 460px; right: -120px; bottom: -250px; border: 1px solid rgba(255,255,255,.16); border-radius: 50%; box-shadow: 0 0 0 80px rgba(255,255,255,.025), 0 0 0 160px rgba(255,255,255,.018); }
        .services-hero-inner { position: relative; z-index: 1; padding-top: 90px; padding-bottom: 90px; }
        .eyebrow, .section-kicker { margin: 0 0 24px; color: #d20000; font-size: 13px; font-weight: 800; letter-spacing: .2em; }
        .services-hero h1 { max-width: 980px; margin: 0; color: #fff; font-size: clamp(52px, 7vw, 100px); line-height: .98; letter-spacing: -.05em; }
        .hero-intro { max-width: 760px; margin: 32px 0 0; color: rgba(255,255,255,.78); font-size: clamp(18px, 2vw, 23px); line-height: 1.6; }
        .services-intro { padding: 110px 0; }
        .intro-grid { display: grid; grid-template-columns: 1fr 3fr; gap: 60px; }
        .services-intro h2, .journey-section h2 { font-size: clamp(38px, 5vw, 68px); line-height: 1.05; letter-spacing: -.04em; }
        .services-intro h2 { max-width: 820px; margin: 0 0 28px; }
        .services-intro p:not(.section-kicker) { max-width: 800px; margin: 0; color: #555; font-size: 20px; line-height: 1.75; }
        .service-list { background: #fff; }
        .service-row { display: grid; grid-template-columns: 100px minmax(260px, .9fr) 1.35fr; gap: 40px; align-items: start; padding: 72px 0; border-top: 1px solid #dedbd5; }
        .service-row:last-child { border-bottom: 1px solid #dedbd5; }
        .service-number { color: #d20000; font-size: 14px; font-weight: 800; letter-spacing: .15em; }
        .service-row h2 { margin: 0; font-size: clamp(28px, 3vw, 42px); line-height: 1.12; letter-spacing: -.025em; }
        .service-row p { margin: 0; color: #5b5b5b; font-size: 17px; line-height: 1.8; }
        .journey-section { padding: 120px 0; background: #171717; color: #fff; }
        .journey-section h2 { max-width: 760px; margin: 0 0 64px; color: #fff; }
        .journey-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgba(255,255,255,.2); }
        .journey-step { padding: 34px 30px 12px 0; }
        .journey-step + .journey-step { padding-left: 30px; border-left: 1px solid rgba(255,255,255,.2); }
        .journey-step span { color: #d20000; font-size: 13px; font-weight: 800; }
        .journey-step h3 { margin: 28px 0 14px; color: #fff; font-size: 25px; }
        .journey-step p { margin: 0; color: rgba(255,255,255,.68); line-height: 1.65; }
        .faq-section { padding: 120px 0; }
        .faq-layout { display: grid; grid-template-columns: .9fr 1.35fr; gap: 90px; align-items: start; }
        .faq-layout > h2 { position: sticky; top: 120px; margin: 0; font-size: clamp(38px, 5vw, 68px); line-height: 1.05; letter-spacing: -.04em; }
        .faq-item { padding: 0 0 36px; margin-bottom: 36px; border-bottom: 1px solid #d7d3cc; }
        .faq-item h3 { margin: 0 0 14px; font-size: 22px; line-height: 1.35; }
        .faq-item p { margin: 0; color: #5b5b5b; font-size: 16px; line-height: 1.75; }
        .services-cta { padding: 80px 0; background: #d20000; color: #fff; }
        .cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 50px; }
        .services-cta h2 { margin: 0 0 12px; color: #fff; font-size: clamp(34px, 4vw, 54px); }
        .services-cta p { margin: 0; color: rgba(255,255,255,.82); font-size: 18px; }
        .cta-button { flex: 0 0 auto; display: inline-flex; padding: 17px 30px; border: 2px solid #fff; background: #fff; color: #111 !important; font-size: 14px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; text-decoration: none; transition: .25s ease; }
        .cta-button:hover { background: transparent; color: #fff !important; }
        @media (max-width: 991px) {
          .intro-grid, .faq-layout { grid-template-columns: 1fr; gap: 35px; }
          .service-row { grid-template-columns: 60px 1fr; }
          .service-row p { grid-column: 2; }
          .journey-grid { grid-template-columns: repeat(2, 1fr); }
          .faq-layout > h2 { position: static; }
        }
        @media (max-width: 767px) {
          .services-hero { min-height: 500px; }
          .services-hero-inner { padding-top: 70px; padding-bottom: 70px; }
          .services-intro, .journey-section, .faq-section { padding: 80px 0; }
          .service-row { grid-template-columns: 1fr; gap: 18px; padding: 52px 0; }
          .service-row p { grid-column: 1; }
          .journey-grid { grid-template-columns: 1fr; }
          .journey-step, .journey-step + .journey-step { padding: 28px 0; border-left: 0; border-bottom: 1px solid rgba(255,255,255,.2); }
          .cta-inner { align-items: flex-start; flex-direction: column; }
        }
      `}</style>
    </>
  );
}
