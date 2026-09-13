import Head from 'next/head';
import Link from 'next/link';

const CONTENT = {
  "en": {
    "title": "Product advice and support for every order",
    "eyebrow": "DOSALGA SERVICES",
    "intro": "Compare products, check sizes and available options, and get help with your purchase. Dosalga customer care covers product questions, order updates, delivery information and return requests.",
    "metaTitle": "Product Advice & Customer Services | Dosalga",
    "metaDescription": "Get help choosing Dosalga products, checking sizes and options, following an order, understanding delivery information and requesting a return.",
    "promiseTitle": "Know what you are buying",
    "promiseText": "Start with the product photos, description and available options. Check the listed measurements, materials and price before choosing. If a detail is missing or unclear, send us the product link and your question before placing an order.",
    "services": [
      [
        "01",
        "Help choosing a product",
        "Compare the details listed on each product page: photos, materials, dimensions, features and available variants. Send us the product link if you need clarification about an item or want to check a specific detail before buying."
      ],
      [
        "02",
        "Sizes, colors and product details",
        "For clothing, compare your measurements with the size information provided for that item. Check the selected color, size and quantity before adding it to your cart. Sizing can differ between products; if measurements are missing, ask us before ordering."
      ],
      [
        "03",
        "Order and delivery assistance",
        "For a purchase confirmation, order update or delivery question, include your order number and the email address used at checkout. If tracking is available, check the latest carrier update and share it with us when reporting an issue."
      ],
      [
        "04",
        "Returns and help after delivery",
        "Review the return policy for the conditions and steps that apply to your purchase. If an item arrives damaged or does not match your order, contact us with the order number, a description of the issue and photos so we can review your request."
      ]
    ],
    "processTitle": "From product selection to delivery",
    "process": [
      [
        "Compare",
        "Read the product details and review the available options."
      ],
      [
        "Select",
        "Check size, color, quantity and the price of your selection."
      ],
      [
        "Order",
        "Review your cart, delivery address and total before confirming."
      ],
      [
        "Follow up",
        "Keep your confirmation and contact us if your order needs attention."
      ]
    ],
    "faqTitle": "Practical answers before and after buying",
    "faq": [
      [
        "How do I choose the right size?",
        "Use the measurements listed for the specific item and compare them with your own. Do not rely only on a size label. If the product page does not provide enough detail, send us its link and explain which measurement you need."
      ],
      [
        "What should I check before confirming my order?",
        "Check the selected product, variant, quantity, delivery address and final total at checkout. Review the shipping and return information, and ask us about any unclear product detail before paying."
      ],
      [
        "How do I ask about an existing order?",
        "Contact us with your order number and the email used at checkout. Describe the question or issue, and include the tracking reference if your message concerns delivery."
      ],
      [
        "How do I request a return?",
        "Read the return policy, then contact us with your order number and reason for the request. Follow the instructions provided for your case before sending an item back."
      ]
    ],
    "ctaTitle": "A question about a product or order?",
    "ctaText": "Send the product link or your order number, together with the details you need us to check.",
    "cta": "Contact Dosalga"
  },
  "es": {
    "title": "Orientación de productos y atención para cada pedido",
    "eyebrow": "SERVICIOS DOSALGA",
    "intro": "Compara productos, revisa tallas y opciones disponibles, y recibe ayuda con tu compra. La atención de Dosalga incluye consultas de productos, estado del pedido, información de entrega y solicitudes de devolución.",
    "metaTitle": "Orientación de productos y atención al cliente | Dosalga",
    "metaDescription": "Recibe ayuda con productos Dosalga, tallas y opciones disponibles, seguimiento de pedidos, información de entrega y solicitudes de devolución.",
    "promiseTitle": "Conoce el artículo antes de comprar",
    "promiseText": "Revisa las fotografías, la descripción y las opciones disponibles. Comprueba las medidas, los materiales y el precio indicados antes de elegir. Si falta un dato o algo no está claro, envíanos el enlace del producto y tu pregunta antes de realizar el pedido.",
    "services": [
      [
        "01",
        "Ayuda para elegir un producto",
        "Compara los datos de cada ficha: fotografías, materiales, dimensiones, características y variantes disponibles. Envíanos el enlace si necesitas aclarar un detalle del artículo antes de comprar."
      ],
      [
        "02",
        "Tallas, colores y detalles del artículo",
        "Para las prendas, compara tus medidas con la información de talla indicada para ese artículo. Revisa el color, la talla y la cantidad antes de añadirlo al carrito. Las tallas pueden variar entre productos; si faltan medidas, consúltanos antes de comprar."
      ],
      [
        "03",
        "Asistencia con pedidos y entregas",
        "Para consultar una confirmación de compra, el estado de un pedido o una entrega, incluye el número de pedido y el correo utilizado al comprar. Si tienes seguimiento, revisa la última actualización del transportista y compártela al comunicar una incidencia."
      ],
      [
        "04",
        "Devoluciones y atención después de la entrega",
        "Consulta la política de devoluciones para conocer las condiciones y los pasos aplicables a tu compra. Si recibes un artículo dañado o distinto al solicitado, envíanos el número de pedido, una descripción del problema y fotografías para revisar tu solicitud."
      ]
    ],
    "processTitle": "Desde la selección hasta la entrega",
    "process": [
      [
        "Compara",
        "Lee la descripción y revisa las opciones disponibles."
      ],
      [
        "Selecciona",
        "Comprueba la talla, el color, la cantidad y el precio."
      ],
      [
        "Compra",
        "Revisa el carrito, la dirección y el total antes de confirmar."
      ],
      [
        "Consulta",
        "Conserva la confirmación y escríbenos si tu pedido requiere atención."
      ]
    ],
    "faqTitle": "Respuestas útiles antes y después de comprar",
    "faq": [
      [
        "¿Cómo elijo la talla adecuada?",
        "Compara tus medidas con las indicadas para ese artículo. No te bases únicamente en la etiqueta de talla. Si la ficha no ofrece suficiente información, envíanos el enlace e indica qué medida necesitas conocer."
      ],
      [
        "¿Qué debo revisar antes de confirmar el pedido?",
        "Comprueba el producto, la variante, la cantidad, la dirección y el total final al pagar. Revisa la información de envíos y devoluciones, y consulta cualquier duda sobre el artículo antes de realizar el pago."
      ],
      [
        "¿Cómo consulto un pedido existente?",
        "Escríbenos con el número de pedido y el correo utilizado al comprar. Describe tu consulta o incidencia e incluye la referencia de seguimiento si se trata de una entrega."
      ],
      [
        "¿Cómo solicito una devolución?",
        "Lee la política de devoluciones y contáctanos con el número de pedido y el motivo de la solicitud. Sigue las instrucciones para tu caso antes de enviar el artículo de vuelta."
      ]
    ],
    "ctaTitle": "¿Tienes una duda sobre un producto o pedido?",
    "ctaText": "Envíanos el enlace del producto o tu número de pedido, junto con los detalles que necesitas revisar.",
    "cta": "Contactar a Dosalga"
  }
};

export default function CustomerServicesPage({ language = 'en' }) {
  const lang = language === 'es' ? 'es' : 'en';
  const content = CONTENT[lang];
  const siteUrl = 'https://www.dosalga.online';
  const canonical = lang === 'en' ? `${siteUrl}/en/services` : `${siteUrl}/services`;
  const contactPath = lang === 'en' ? '/en/contact' : '/contact';

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/en/services`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/services`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/services`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
      </Head>

      <main className="customer-services">
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

        <section className="purchase-section">
          <div className="container">
            <h2>{content.processTitle}</h2>
            <div className="purchase-grid">
              {content.process.map(([title, text], index) => (
                <div className="purchase-step" key={title}>
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
        .customer-services { background: #f6f4f0; color: #161616; }
        .services-hero { position: relative; overflow: hidden; min-height: 560px; display: flex; align-items: center; background: #101010; color: #fff; }
        .services-hero::before { content: ''; position: absolute; inset: 0; opacity: .38; background: linear-gradient(115deg, #000 0%, transparent 60%), radial-gradient(circle at 82% 20%, rgba(210, 0, 0, .52), transparent 35%); }
        .services-hero-glow { position: absolute; width: 460px; height: 460px; right: -120px; bottom: -250px; border: 1px solid rgba(255,255,255,.16); border-radius: 50%; box-shadow: 0 0 0 80px rgba(255,255,255,.025), 0 0 0 160px rgba(255,255,255,.018); }
        .services-hero-inner { position: relative; z-index: 1; padding-top: 90px; padding-bottom: 90px; }
        .eyebrow, .section-kicker { margin: 0 0 24px; color: #d20000; font-size: 13px; font-weight: 800; letter-spacing: .2em; }
        .services-hero h1 { max-width: 980px; margin: 0; color: #fff; font-size: clamp(52px, 7vw, 100px); line-height: .98; letter-spacing: -.05em; }
        .hero-intro { max-width: 760px; margin: 32px 0 0; color: rgba(255,255,255,.78); font-size: clamp(18px, 2vw, 23px); line-height: 1.6; }
        .services-intro { padding: 110px 0; }
        .intro-grid { display: grid; grid-template-columns: 1fr 3fr; gap: 60px; }
        .services-intro h2, .purchase-section h2 { font-size: clamp(38px, 5vw, 68px); line-height: 1.05; letter-spacing: -.04em; }
        .services-intro h2 { max-width: 820px; margin: 0 0 28px; }
        .services-intro p:not(.section-kicker) { max-width: 800px; margin: 0; color: #555; font-size: 20px; line-height: 1.75; }
        .service-list { background: #fff; }
        .service-row { display: grid; grid-template-columns: 100px minmax(260px, .9fr) 1.35fr; gap: 40px; align-items: start; padding: 72px 0; border-top: 1px solid #dedbd5; }
        .service-row:last-child { border-bottom: 1px solid #dedbd5; }
        .service-number { color: #d20000; font-size: 14px; font-weight: 800; letter-spacing: .15em; }
        .service-row h2 { margin: 0; font-size: clamp(28px, 3vw, 42px); line-height: 1.12; letter-spacing: -.025em; }
        .service-row p { margin: 0; color: #5b5b5b; font-size: 17px; line-height: 1.8; }
        .purchase-section { padding: 120px 0; background: #171717; color: #fff; }
        .purchase-section h2 { max-width: 760px; margin: 0 0 64px; color: #fff; }
        .purchase-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgba(255,255,255,.2); }
        .purchase-step { padding: 34px 30px 12px 0; }
        .purchase-step + .purchase-step { padding-left: 30px; border-left: 1px solid rgba(255,255,255,.2); }
        .purchase-step span { color: #d20000; font-size: 13px; font-weight: 800; }
        .purchase-step h3 { margin: 28px 0 14px; color: #fff; font-size: 25px; }
        .purchase-step p { margin: 0; color: rgba(255,255,255,.68); line-height: 1.65; }
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
          .purchase-grid { grid-template-columns: repeat(2, 1fr); }
          .faq-layout > h2 { position: static; }
        }
        @media (max-width: 767px) {
          .services-hero { min-height: 500px; }
          .services-hero-inner { padding-top: 70px; padding-bottom: 70px; }
          .services-intro, .purchase-section, .faq-section { padding: 80px 0; }
          .service-row { grid-template-columns: 1fr; gap: 18px; padding: 52px 0; }
          .service-row p { grid-column: 1; }
          .purchase-grid { grid-template-columns: 1fr; }
          .purchase-step, .purchase-step + .purchase-step { padding: 28px 0; border-left: 0; border-bottom: 1px solid rgba(255,255,255,.2); }
          .cta-inner { align-items: flex-start; flex-direction: column; }
        }
      `}</style>
    </>
  );
}
