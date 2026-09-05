import Head from 'next/head';
import Link from 'next/link';

const SITE = 'https://www.dosalga.online';

const content = {
  es: {
    title: 'Servicios Dosalga | Compra en línea, envíos y atención al cliente en México',
    desc: 'Descubre los servicios de Dosalga: catálogo curado de moda, hogar y tecnología, guías de tallas, seguimiento de pedidos, envíos a toda la República y atención personalizada con nuestro equipo y Olivia.',
    tag: 'SERVICIOS DOSALGA',
    heading: 'Comprar en línea, con claridad en cada paso',
    intro: 'Nuestro servicio no termina cuando encuentras un producto que te gusta. Acompañamos cada compra desde la selección hasta la entrega, con precios claros en pesos mexicanos y canales de atención listos para resolver cualquier duda antes, durante y después de tu pedido.',
    items: [
      ['Un catálogo pensado para la vida diaria', 'Reunimos moda, accesorios, tecnología, hogar y belleza en un mismo lugar para que compares opciones sin saltar entre tiendas. Cada ficha concentra fotografías reales, precio en pesos mexicanos, características técnicas y variantes de color o talla disponibles, para que decidas con la información completa frente a ti.'],
      ['Elige con mayor seguridad', 'Las guías de medidas, las opciones de color y las fotografías en detalle te ayudan a imaginar el producto en tu día a día antes de pagar por él. Si aun así tienes dudas sobre una talla, un material o una característica, puedes escribirnos y te orientamos antes de confirmar tu pedido.'],
      ['Apoyo real durante tu pedido', 'Te ayudamos a resolver dudas sobre confirmación de compra, disponibilidad de existencias, métodos de pago y estado del pedido. Para agilizar cualquier consulta basta con compartir tu número de pedido y el correo utilizado al comprar; revisamos tu caso puntual, no respuestas genéricas.'],
      ['Información de envío sin sorpresas', 'Explicamos cada etapa del proceso —preparación, despacho, tránsito y entrega— para que sepas exactamente qué esperar. Los tiempos pueden variar según el artículo, la paquetería y el destino dentro de México, por eso mantenemos el seguimiento visible y actualizado en tu cuenta.'],
      ['Cambios y devoluciones sin complicaciones', 'Ponemos a tu disposición políticas claras sobre plazos, condiciones y pasos para solicitar un cambio o una devolución. Antes de iniciar cualquier gestión te decimos exactamente qué necesitas y cuánto puede tardar el proceso, sin letras pequeñas.'],
      ['Habla con nuestro equipo o con Olivia', 'Puedes escribir directamente al equipo de Dosalga o conversar con Olivia, nuestra asistente virtual, para obtener respuestas inmediatas a las preguntas más comunes. Cuanto más clara sea tu consulta —producto, talla, número de pedido— más rápida y precisa será la respuesta que recibas.'],
    ],
    benefitsTag: 'POR QUÉ DOSALGA',
    benefitsHeading: 'Comprar con confianza, de principio a fin',
    benefits: [
      ['Catálogo curado', 'Moda, hogar, tecnología, belleza y accesorios seleccionados para la vida diaria en México.'],
      ['Precios en pesos mexicanos', 'Sin conversiones ni cargos ocultos: el precio que ves en la ficha es el que pagas al finalizar la compra.'],
      ['Atención en español', 'Nuestro equipo y Olivia responden tus dudas en tu idioma, a tu ritmo, antes y después de comprar.'],
      ['Seguimiento visible', 'Consulta el estado de tu pedido desde la preparación hasta la entrega, sin tener que adivinar.'],
    ],
    journey: 'Tu experiencia con Dosalga',
    steps: [
      ['01', 'Descubre', 'Explora por categoría, filtra por precio y compara productos similares antes de decidir.'],
      ['02', 'Selecciona', 'Revisa fotografías, tallas, colores disponibles y el precio final en pesos mexicanos.'],
      ['03', 'Compra', 'Confirma tus datos de envío y pago, y recibe la confirmación de tu pedido al instante.'],
      ['04', 'Recibe', 'Consulta el seguimiento en cualquier momento hasta que el pedido llegue a tu puerta.'],
    ],
    faq: 'Preguntas frecuentes',
    questions: [
      ['¿Puedo pedir ayuda antes de comprar?', 'Sí. Envíanos el enlace del producto que te interesa junto con tu duda específica —talla, color, material— y te orientamos antes de que confirmes el pedido.'],
      ['¿Cómo consulto el estado de un pedido?', 'Comparte tu número de pedido y el correo utilizado durante la compra; con esos datos podemos ubicar tu caso y darte una respuesta puntual.'],
      ['¿Dónde encuentro las condiciones de devolución?', 'Puedes consultarlas en las políticas del sitio. Si tu caso tiene alguna particularidad, contáctanos y revisamos los pasos contigo.'],
      ['¿Los precios incluyen impuestos?', 'Sí, los precios mostrados en el catálogo están en pesos mexicanos e incluyen los impuestos aplicables, sin cargos ocultos al finalizar la compra.'],
      ['¿Qué hago si un producto llega con un problema?', 'Escríbenos con tu número de pedido y una descripción o fotografía del problema; te indicamos los pasos para resolverlo lo antes posible.'],
      ['¿Puedo hablar con una persona en vez de Olivia?', 'Claro. Olivia resuelve al instante las consultas más frecuentes, pero si prefieres hablar con el equipo de Dosalga puedes escribirnos directamente en cualquier momento.'],
    ],
    cta: 'Contactar a Dosalga',
    ctaAside: '¿Necesitas ayuda personal?',
  },
  en: {
    title: 'Dosalga Services | Online shopping, shipping and customer support in Mexico',
    desc: 'Explore Dosalga services: a curated catalog of fashion, home and tech products, sizing guidance, order tracking, nationwide shipping across Mexico and personal support from our team and Olivia.',
    tag: 'DOSALGA SERVICES',
    heading: 'Online shopping with clarity at every step',
    intro: 'Our service does not end when you find a product you like. We support every purchase from selection to delivery, with clear Mexican peso pricing and responsive assistance ready to answer questions before, during and after your order.',
    items: [
      ['A catalog built for everyday life', 'Fashion, accessories, technology, home goods and beauty products live in one place so you can compare options without jumping between stores. Every product page brings together real photos, Mexican peso pricing, technical details and available color or size variants.'],
      ['Choose with more confidence', 'Measurement guides, color options and detailed photography help you picture each item in your daily life before you pay for it. If you still have doubts about sizing, materials or features, write to us and we will guide you before you confirm your order.'],
      ['Real support during your order', 'We help with purchase confirmation, stock availability, payment methods and order status. Share your order number and the email used at checkout and we will look into your specific case, not a generic answer.'],
      ['Shipping information with no surprises', 'We explain every stage of the process — preparation, dispatch, transit and delivery — so you know exactly what to expect. Timing can vary by item, carrier and destination within Mexico, which is why tracking stays visible and up to date in your account.'],
      ['Returns and exchanges made simple', 'Clear policies explain time frames, conditions and the steps to request an exchange or a return. Before you start any request we tell you exactly what you need and how long the process may take, no fine print.'],
      ['Talk to our team or Olivia', 'You can write directly to the Dosalga team or chat with Olivia, our virtual assistant, for instant answers to common questions. The clearer your question — product, size, order number — the faster and more precise the response you get.'],
    ],
    benefitsTag: 'WHY DOSALGA',
    benefitsHeading: 'Shop with confidence, start to finish',
    benefits: [
      ['A curated catalog', 'Fashion, home, technology, beauty and accessories selected for everyday life in Mexico.'],
      ['Mexican peso pricing', 'No conversions, no hidden fees: the price on the page is the price you pay at checkout.'],
      ['Support in your language', 'Our team and Olivia answer your questions at your pace, before and after you buy.'],
      ['Visible tracking', 'Follow your order from preparation to delivery without having to guess.'],
    ],
    journey: 'Your Dosalga experience',
    steps: [
      ['01', 'Discover', 'Browse by category, filter by price and compare similar products before deciding.'],
      ['02', 'Select', 'Review photos, sizing, available colors and the final price in Mexican pesos.'],
      ['03', 'Order', 'Confirm your shipping and payment details and get instant order confirmation.'],
      ['04', 'Receive', 'Check tracking at any time until your order reaches your door.'],
    ],
    faq: 'Frequently asked questions',
    questions: [
      ['Can I get help before buying?', 'Yes. Send us the product link along with your specific question — sizing, color, material — and we will guide you before you confirm your order.'],
      ['How do I check the status of an order?', 'Share your order number and the email used at checkout; with those details we can find your case and give you a precise answer.'],
      ['Where can I find return conditions?', 'You can review them in the site policies. If your case has a special circumstance, contact us and we will walk through the steps with you.'],
      ['Do prices include taxes?', 'Yes, prices shown in the catalog are in Mexican pesos and include applicable taxes, with no hidden charges at checkout.'],
      ['What if a product arrives with a problem?', 'Write to us with your order number and a description or photo of the issue; we will tell you the steps to resolve it as quickly as possible.'],
      ['Can I talk to a person instead of Olivia?', 'Of course. Olivia handles the most common questions instantly, but if you would rather talk to the Dosalga team you can write to us directly at any time.'],
    ],
    cta: 'Contact Dosalga',
    ctaAside: 'Need personal assistance?',
  },
};

export default function ServicesPremiumPage({ language = 'es' }) {
  const d = content[language];
  const prefix = language === 'en' ? '/en' : '';
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.questions.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <>
      <Head>
        <title>{d.title}</title>
        <meta name="description" content={d.desc} />
        <link rel="canonical" href={`${SITE}${prefix}/services`} />
        <link rel="alternate" hrefLang="es" href={`${SITE}/services`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en/services`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={d.title} />
        <meta property="og:description" content={d.desc} />
        <meta property="og:url" content={`${SITE}${prefix}/services`} />
        <meta property="og:locale" content={language === 'en' ? 'en_US' : 'es_MX'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main className="sp">
        <div className="container">
          <header>
            <span>{d.tag}</span>
            <h1>{d.heading}</h1>
            <p>{d.intro}</p>
          </header>

          <div className="services">
            {d.items.map(([h, p], i) => (
              <section key={h}>
                <b>0{i + 1}</b>
                <div>
                  <h2>{h}</h2>
                  <p>{p}</p>
                </div>
              </section>
            ))}
          </div>

          <section className="benefits">
            <span>{d.benefitsTag}</span>
            <h2>{d.benefitsHeading}</h2>
            <div className="benefits-grid">
              {d.benefits.map(([h, p]) => (
                <article key={h}>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="journey">
            <span>DOSALGA</span>
            <h2>{d.journey}</h2>
            <div>
              {d.steps.map(([n, h, p]) => (
                <article key={n}>
                  <b>{n}</b>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="faq">
            <span>FAQ</span>
            <h2>{d.faq}</h2>
            {d.questions.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>

          <aside>
            <h2>{d.ctaAside}</h2>
            <Link href={`${prefix}/contact`}>{d.cta}</Link>
          </aside>
        </div>
      </main>

      <style jsx global>{`
        .sp {
          padding: 95px 0 110px;
          background: #f4f2ed;
          color: #161616;
        }
        .sp header {
          max-width: 1050px;
          margin-bottom: 80px;
        }
        .sp span {
          color: #c6202a;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }
        .sp h1 {
          font-size: clamp(44px, 7vw, 92px);
          line-height: 1;
          letter-spacing: -0.045em;
          margin: 18px 0 28px;
        }
        .sp header p {
          max-width: 800px;
          font-size: 21px;
          line-height: 1.75;
          color: #555;
        }
        .services {
          border-top: 1px solid #bbb;
        }
        .services section {
          display: grid;
          grid-template-columns: 130px 1fr;
          gap: 35px;
          padding: 55px 0;
          border-bottom: 1px solid #bbb;
        }
        .services section > b {
          color: #c6202a;
        }
        .services h2 {
          font-size: clamp(28px, 4vw, 48px);
          margin: 0 0 16px;
        }
        .services p {
          max-width: 900px;
          font-size: 18px;
          line-height: 1.8;
          color: #555;
        }
        .benefits {
          margin: 90px 0;
        }
        .benefits > h2 {
          font-size: clamp(34px, 5vw, 60px);
          margin: 14px 0 40px;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
        }
        .benefits-grid article {
          padding: 34px;
          background: #fff;
          border-radius: 20px;
          border: 1px solid #e2ded4;
        }
        .benefits-grid h3 {
          font-size: 21px;
          margin: 0 0 12px;
        }
        .benefits-grid p {
          font-size: 16px;
          line-height: 1.7;
          color: #555;
          margin: 0;
        }
        .journey {
          margin: 90px 0;
          padding: 55px;
          background: #fff;
          border-radius: 24px;
        }
        .journey > h2,
        .faq > h2 {
          font-size: clamp(34px, 5vw, 60px);
          margin: 14px 0 40px;
        }
        .journey > div {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 35px;
        }
        .journey article b {
          color: #c6202a;
        }
        .journey article h3 {
          margin: 15px 0 10px;
        }
        .journey article p {
          font-size: 16px;
          line-height: 1.7;
          color: #555;
        }
        .faq details {
          padding: 26px 0;
          border-bottom: 1px solid #bbb;
        }
        .faq summary {
          font-size: 21px;
          font-weight: 700;
          cursor: pointer;
        }
        .faq p {
          margin: 16px 0 0;
          font-size: 17px;
          line-height: 1.75;
          color: #555;
        }
        .sp aside {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          margin-top: 90px;
          padding: 50px;
          border-radius: 24px;
          background: #171717;
          color: #fff;
        }
        .sp aside h2 {
          font-size: clamp(26px, 3vw, 38px);
          margin: 0;
        }
        .sp aside a {
          padding: 16px 28px;
          border-radius: 30px;
          background: #c6202a;
          color: #fff;
          font-weight: 700;
          white-space: nowrap;
        }
        @media (max-width: 991px) {
          .benefits-grid,
          .journey > div {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 767px) {
          .sp {
            padding: 60px 0 80px;
          }
          .services section {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .journey {
            padding: 32px;
          }
          .benefits-grid,
          .journey > div {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
