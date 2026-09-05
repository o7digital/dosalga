import Head from 'next/head';
import Link from 'next/link';

const SITE = 'https://www.dosalga.online';
const PHOTO = 'https://www.o7digital.com/assets/hammer-group.webp';

const data = {
  es: {
    about: {
      title: 'Sobre Dosalga | Historia, misión, visión y valores',
      description: 'Conoce la historia de Dosalga, tienda en línea mexicana que desde 2013 acerca moda, hogar, tecnología y productos para la vida diaria con precios en pesos mexicanos y atención cercana.',
      eyebrow: 'NUESTRA HISTORIA',
      heading: 'Productos útiles para una vida más simple',
      intro: 'Desde 2013, Dosalga evoluciona para acercar productos comerciales a personas y empresas en México. Hoy reunimos una selección diversa de moda, hogar y tecnología en una sola experiencia de compra digital, pensada para que encontrar lo que necesitas sea simple, claro y confiable.',
      storyHeading: 'De la venta comercial a la tienda que somos hoy',
      story: [
        'Dosalga nació abasteciendo de productos comerciales a distintos mercados, un trabajo que nos enseñó de primera mano lo que realmente importa a la hora de comprar: variedad real, precios claros y un servicio que responde cuando se le necesita.',
        'Con los años, esa experiencia se transformó en un catálogo digital que reúne moda, accesorios, tecnología, hogar y belleza en un mismo lugar, con fichas de producto completas y precios siempre en pesos mexicanos.',
        'Hoy seguimos con el mismo principio: simplificar la manera en que las personas en México encuentran, comparan y compran los productos que forman parte de su día a día.',
      ],
      pillarsHeading: 'Misión y visión',
      pillars: [
        ['Nuestra misión', 'Facilitar el acceso a productos funcionales y competitivos, con información útil, una compra confiable y una atención cercana en cada etapa del proceso.'],
        ['Nuestra visión', 'Ser una opción reconocida del comercio electrónico en México, uniendo variedad de catálogo, practicidad de compra y un servicio en el que se puede confiar.'],
      ],
      valuesHeading: 'Los valores que guían cada decisión',
      values: [
        ['Integridad', 'Actuamos con honestidad y coherencia, tanto en la información de producto como en el trato con cada cliente.'],
        ['Transparencia', 'Precios claros en pesos mexicanos, condiciones visibles y sin letras pequeñas en ninguna etapa de la compra.'],
        ['Responsabilidad', 'Cumplimos lo que ofrecemos y respondemos por cada pedido, desde la confirmación hasta la entrega.'],
        ['Respeto', 'Valoramos a cada cliente, su tiempo y sus dudas, sin respuestas genéricas ni trámites innecesarios.'],
        ['Innovación', 'Mejoramos de forma constante el catálogo, la información de producto y los canales de atención.'],
        ['Orientación al cliente', 'Cada decisión, del catálogo al soporte, se toma pensando en resolver una necesidad real.'],
      ],
      offeringsHeading: 'Qué encuentras en Dosalga',
      offerings: [
        'Un catálogo curado de moda, accesorios, tecnología, hogar y belleza.',
        'Fichas de producto completas: fotografías, medidas, variantes y precio en pesos mexicanos.',
        'Seguimiento de pedidos visible desde la preparación hasta la entrega.',
        'Atención directa de nuestro equipo y respuestas inmediatas con Olivia.',
      ],
      whyHeading: 'Por qué elegir Dosalga',
      why: 'Para quienes buscan comodidad, información clara y acceso rápido a productos esenciales, integrados fácilmente a la vida diaria y respaldados por un equipo que responde.',
      ctaHeading: 'Estamos para ayudarte',
      ctaEmail: 'Escríbenos',
      ctaShop: 'Ver productos',
    },
    contact: {
      title: 'Contacto Dosalga México | Atención a clientes',
      description: 'Contacta a Dosalga para dudas sobre productos, tallas, pedidos, envíos, pagos, cambios o devoluciones. Respuesta directa de nuestro equipo y de Olivia.',
      eyebrow: 'CONTACTO',
      heading: '¿Cómo podemos ayudarte?',
      intro: 'Incluye los datos de tu pedido cuando corresponda para que podamos orientarte de forma rápida y precisa. Nuestro equipo y Olivia están para resolver dudas antes, durante y después de tu compra.',
      storyHeading: 'Formas de contactarnos',
      story: [
        'Escríbenos por correo a contact@dosalga.store para dudas sobre productos, pedidos, pagos, envíos, cambios o devoluciones; respondemos revisando tu caso puntual.',
        'Conversa con Olivia, nuestra asistente virtual, para obtener respuestas inmediatas a las preguntas más frecuentes sobre el catálogo, tallas o el estado de un pedido.',
        'Si tu consulta requiere revisar un pedido específico, comparte el número de pedido y el correo utilizado en la compra para que podamos ubicar tu caso más rápido.',
      ],
      pillarsHeading: null,
      pillars: [],
      valuesHeading: 'En qué podemos ayudarte',
      values: [
        ['Antes de comprar', 'Preguntas sobre productos, características, colores, tallas o disponibilidad en el catálogo.'],
        ['Después de comprar', 'Consultas sobre confirmación de compra, preparación, seguimiento o entrega del pedido.'],
        ['Cambios y devoluciones', 'Orientación sobre requisitos, plazos y pasos para presentar una solicitud.'],
        ['Pagos y facturación', 'Dudas sobre métodos de pago aceptados, precios en pesos mexicanos e impuestos incluidos.'],
      ],
      offeringsHeading: 'Para una respuesta más rápida',
      offerings: [
        'Tu nombre completo y correo utilizado en la compra.',
        'El número de pedido, si tu consulta se refiere a una compra ya realizada.',
        'Una breve descripción de tu duda o del problema encontrado.',
        'Fotografías del producto, si tu consulta es sobre su estado al recibirlo.',
      ],
      whyHeading: null,
      why: null,
      ctaHeading: 'Estamos para ayudarte',
      ctaEmail: 'Escríbenos',
      ctaShop: 'Ver productos',
    },
  },
  en: {
    about: {
      title: 'About Dosalga | Story, mission, vision and values',
      description: 'Discover the story of Dosalga, a Mexican online store that has connected people with fashion, home and technology products since 2013, with Mexican peso pricing and attentive support.',
      eyebrow: 'OUR STORY',
      heading: 'Useful products for a simpler life',
      intro: 'Since 2013, Dosalga has evolved to bring commercial products closer to people and businesses in Mexico. Today we bring together a diverse selection of fashion, home and technology in a single digital shopping experience, designed to make finding what you need simple, clear and reliable.',
      storyHeading: 'From commercial supply to the store we are today',
      story: [
        'Dosalga began by supplying commercial products to different markets, an experience that taught us first-hand what really matters when shopping: real variety, clear pricing and service that responds when it is needed.',
        'Over the years, that experience became a digital catalog that brings together fashion, accessories, technology, home goods and beauty in one place, with complete product pages and pricing always shown in Mexican pesos.',
        'Today we hold on to the same principle: making it simple for people in Mexico to find, compare and buy the products that are part of their everyday life.',
      ],
      pillarsHeading: 'Mission and vision',
      pillars: [
        ['Our mission', 'Make functional, competitive products easier to access, with useful information, reliable shopping and attentive support at every stage of the process.'],
        ['Our vision', 'Become a recognized e-commerce choice in Mexico by combining a wide catalog, convenient shopping and a service customers can trust.'],
      ],
      valuesHeading: 'The values behind every decision',
      values: [
        ['Integrity', 'We act with honesty and consistency, both in product information and in how we treat every customer.'],
        ['Transparency', 'Clear Mexican peso pricing, visible conditions and no fine print at any stage of the purchase.'],
        ['Responsibility', 'We deliver on what we offer and stand behind every order, from confirmation to delivery.'],
        ['Respect', 'We value every customer, their time and their questions, with no generic answers or unnecessary steps.'],
        ['Innovation', 'We continuously improve our catalog, product information and support channels.'],
        ['Customer focus', 'Every decision, from catalog to support, is made to solve a real need.'],
      ],
      offeringsHeading: 'What you will find at Dosalga',
      offerings: [
        'A curated catalog of fashion, accessories, technology, home goods and beauty.',
        'Complete product pages: photography, measurements, variants and Mexican peso pricing.',
        'Visible order tracking from preparation through delivery.',
        'Direct support from our team and instant answers from Olivia.',
      ],
      whyHeading: 'Why choose Dosalga',
      why: 'For anyone looking for convenience, clear information and quick access to essential products, easily integrated into everyday life and backed by a team that responds.',
      ctaHeading: 'We are here to help',
      ctaEmail: 'Email us',
      ctaShop: 'View products',
    },
    contact: {
      title: 'Contact Dosalga | Customer support in Mexico',
      description: 'Contact Dosalga about products, sizing, orders, shipping, payments or returns. Direct answers from our team and from Olivia.',
      eyebrow: 'CONTACT',
      heading: 'How can we help?',
      intro: 'Include your order details when relevant so we can provide a faster and more accurate response. Our team and Olivia are ready to help before, during and after your purchase.',
      storyHeading: 'Ways to reach us',
      story: [
        'Email us at contact@dosalga.store for questions about products, orders, payments, shipping, exchanges or returns; we review your specific case before replying.',
        'Chat with Olivia, our virtual assistant, for instant answers to the most common questions about the catalog, sizing or order status.',
        'If your question involves a specific order, share the order number and the email used at checkout so we can find your case faster.',
      ],
      pillarsHeading: null,
      pillars: [],
      valuesHeading: 'What we can help with',
      values: [
        ['Before purchasing', 'Questions about products, features, colors, sizing or availability in the catalog.'],
        ['After purchasing', 'Questions about order confirmation, preparation, tracking or delivery.'],
        ['Exchanges and returns', 'Guidance about requirements, time frames and the steps to submit a request.'],
        ['Payments and billing', 'Questions about accepted payment methods, Mexican peso pricing and included taxes.'],
      ],
      offeringsHeading: 'For a faster response',
      offerings: [
        'Your full name and the email used at checkout.',
        'Your order number, if your question relates to a purchase already made.',
        'A short description of your question or the issue you found.',
        'Photos of the product, if your question is about its condition on arrival.',
      ],
      whyHeading: null,
      why: null,
      ctaHeading: 'We are here to help',
      ctaEmail: 'Email us',
      ctaShop: 'View products',
    },
  },
};

export default function DosalgaInfoPage({ page, language = 'es' }) {
  const d = data[language][page];
  const slug = page === 'about' ? '/about-us' : `/${page}`;
  const prefix = language === 'en' ? '/en' : '';

  return (
    <>
      <Head>
        <title>{d.title}</title>
        <meta name="description" content={d.description} />
        <link rel="canonical" href={`${SITE}${prefix}${slug}`} />
        <link rel="alternate" hrefLang="es" href={`${SITE}${slug}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE}/en${slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={d.title} />
        <meta property="og:description" content={d.description} />
        <meta property="og:url" content={`${SITE}${prefix}${slug}`} />
        <meta property="og:locale" content={language === 'en' ? 'en_US' : 'es_MX'} />
        {page === 'about' && <meta property="og:image" content={PHOTO} />}
      </Head>

      <main className={`info-page ${page === 'about' ? 'has-cover' : ''}`}>
        <div className="container">
          <header className={page === 'about' ? 'about-cover' : ''}>
            <div className={page === 'about' ? 'cover-copy' : 'plain-copy'}>
              <span>{d.eyebrow}</span>
              <h1>{d.heading}</h1>
              <p className="intro">{d.intro}</p>
            </div>
            {page === 'about' && (
              <div className="cover-image">
                <img
                  src={PHOTO}
                  alt={
                    language === 'es'
                      ? 'Oficina moderna que representa la visión de Dosalga'
                      : 'Modern office representing Dosalga’s vision'
                  }
                />
              </div>
            )}
          </header>

          {d.storyHeading && (
            <section className="story">
              <h2>{d.storyHeading}</h2>
              <div className="story-copy">
                {d.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {d.pillars.length > 0 && (
            <section className="pillars">
              <h2>{d.pillarsHeading}</h2>
              <div className="pillars-grid">
                {d.pillars.map(([h, p]) => (
                  <article key={h}>
                    <h3>{h}</h3>
                    <p>{p}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="values">
            <h2>{d.valuesHeading}</h2>
            <div className="values-grid">
              {d.values.map(([h, p], i) => (
                <div className="card" key={h}>
                  <b>0{i + 1}</b>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="offerings">
            <h2>{d.offeringsHeading}</h2>
            <ul>
              {d.offerings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {d.why && (
            <section className="why">
              <h2>{d.whyHeading}</h2>
              <p>{d.why}</p>
            </section>
          )}

          <aside>
            <div>
              <span>Dosalga</span>
              <h2>{d.ctaHeading}</h2>
            </div>
            <div className="actions">
              <a href="mailto:contact@dosalga.store">{d.ctaEmail}</a>
              <Link href={language === 'es' ? '/shop' : '/en/shop'}>{d.ctaShop}</Link>
            </div>
          </aside>
        </div>
      </main>

      <style jsx>{`
        .info-page {
          padding: 90px 0 110px;
          background: #f7f6f3;
        }
        .info-page.has-cover {
          padding-top: 0;
        }
        .info-page span,
        .card b {
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 12px;
          font-weight: 800;
          color: #c51f28;
        }
        .info-page h1 {
          font-size: clamp(42px, 6vw, 76px);
          line-height: 1.02;
          letter-spacing: -0.04em;
          margin: 14px 0 24px;
        }
        .intro {
          font-size: 19px;
          line-height: 1.7;
          color: #555;
        }
        .plain-copy {
          max-width: 900px;
          margin-bottom: 20px;
        }
        .about-cover {
          position: relative;
          left: 50%;
          width: 100vw;
          height: calc(100vh - 100px);
          min-height: 650px;
          margin-left: -50vw !important;
          overflow: hidden;
        }
        .cover-image {
          position: absolute;
          inset: 0;
          padding: 0;
        }
        .cover-image:after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.52);
        }
        .info-page .cover-image img {
          width: 100%;
          height: 100%;
          min-height: 0;
          object-fit: cover;
          border-radius: 0;
          box-shadow: none;
        }
        .cover-copy {
          position: relative;
          z-index: 2;
          margin: auto;
          text-align: center;
          color: #fff;
          padding: 40px;
        }
        .cover-copy span,
        .cover-copy .intro {
          color: #fff;
        }
        .cover-copy h1 {
          font-size: clamp(52px, 7vw, 105px);
          max-width: 1300px;
          margin: 18px auto 26px;
        }
        .cover-copy .intro {
          max-width: 850px;
          margin: auto;
          font-size: clamp(18px, 2vw, 26px);
        }
        .story,
        .pillars,
        .values,
        .offerings,
        .why {
          margin-top: 70px;
        }
        .story h2,
        .pillars h2,
        .values h2,
        .offerings h2,
        .why h2 {
          font-size: clamp(30px, 4vw, 46px);
          letter-spacing: -0.02em;
          margin: 0 0 26px;
        }
        .story-copy {
          max-width: 900px;
        }
        .story-copy p {
          font-size: 18px;
          line-height: 1.8;
          color: #555;
          margin: 0 0 20px;
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .pillars-grid article {
          padding: 36px;
          background: #171717;
          color: #fff;
          border-radius: 20px;
        }
        .pillars-grid h3 {
          font-size: 24px;
          margin: 0 0 14px;
          color: #fff;
        }
        .pillars-grid p {
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.75;
          margin: 0;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }
        .card {
          height: 100%;
          padding: 34px;
          border: 1px solid #dfddd7;
          border-radius: 18px;
          background: white;
        }
        .card h3 {
          font-size: 22px;
          margin: 14px 0;
        }
        .card p {
          color: #606060;
          line-height: 1.75;
          margin: 0;
        }
        .offerings ul {
          list-style: none;
          margin: 0;
          padding: 0;
          max-width: 800px;
        }
        .offerings li {
          position: relative;
          padding: 18px 0 18px 32px;
          border-bottom: 1px solid #ded9cc;
          font-size: 18px;
          line-height: 1.6;
          color: #333;
        }
        .offerings li:before {
          content: '';
          position: absolute;
          left: 0;
          top: 26px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #c51f28;
        }
        .why p {
          max-width: 850px;
          font-size: 20px;
          line-height: 1.8;
          color: #333;
        }
        .info-page aside {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
          margin-top: 70px;
          padding: 42px;
          border-radius: 22px;
          background: #171717;
          color: #fff;
        }
        .info-page aside span,
        .info-page aside h2,
        .info-page aside p {
          color: #fff;
        }
        .info-page aside h2 {
          margin: 8px 0 0;
        }
        .actions {
          display: flex;
          gap: 12px;
        }
        .actions a {
          padding: 14px 22px;
          border-radius: 30px;
          background: #c51f28;
          color: #fff !important;
          font-weight: 700;
        }
        .actions a + a {
          background: #fff;
          color: #171717 !important;
        }
        @media (max-width: 991px) {
          .pillars-grid,
          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 767px) {
          .info-page {
            padding: 60px 0 80px;
          }
          .info-page.has-cover {
            padding-top: 0;
          }
          .about-cover {
            height: calc(100vh - 82px);
            min-height: 580px;
          }
          .cover-copy {
            padding: 24px;
          }
          .pillars-grid,
          .values-grid {
            grid-template-columns: 1fr;
          }
          .info-page aside {
            align-items: flex-start;
            flex-direction: column;
            padding: 30px;
          }
          .actions {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}
