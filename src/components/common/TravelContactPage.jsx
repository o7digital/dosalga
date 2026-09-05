import Head from 'next/head';

const CONTENT = {
  en: {
    eyebrow: 'CONTACT DOSALGA USA',
    title: 'We are here to make your journey easier',
    intro: 'Questions about luggage, delivery, or an existing order? Tell us what you need and we will help you find the clearest next step.',
    metaTitle: 'Contact Dosalga USA | Luggage & Order Support',
    metaDescription: 'Contact Dosalga USA for help with luggage, travel accessories, product information, orders, shipping, and returns.',
    topicsTitle: 'How can we help?',
    topics: [
      ['Product guidance', 'Compare suitcase sizes, materials, features, and travel accessories before ordering.'],
      ['Order & delivery', 'Ask about an existing order, delivery information, or a package that needs attention.'],
      ['Returns & support', 'Get clear information about return eligibility and the steps that apply to your purchase.'],
    ],
    panelEyebrow: 'CUSTOMER CARE',
    panelTitle: 'Let’s solve it together.',
    panelText: 'Include your order number when your message concerns an existing purchase. It helps us identify the details faster.',
    emailLabel: 'Email us',
    responseLabel: 'Response time',
    response: 'We answer as soon as possible during business days.',
    formTitle: 'Send us a message',
    formIntro: 'Complete the form and your email application will open with the message ready to send.',
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    subject: 'Subject',
    message: 'How can we help?',
    orderNumber: 'Order number',
    optional: 'Optional',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@example.com',
    phonePlaceholder: '+1 305 000 0000',
    subjectPlaceholder: 'Product, order, shipping…',
    messagePlaceholder: 'Tell us what happened and what you need.',
    orderPlaceholder: 'Example: #1234',
    submit: 'Prepare email',
    privacy: 'Your information is only included in the email you choose to send.',
    emailSubject: 'Dosalga USA customer support request',
    labels: { name: 'Name', email: 'Email', phone: 'Phone', order: 'Order number', message: 'Message' },
  },
  es: {
    eyebrow: 'CONTACTO DOSALGA USA',
    title: 'Estamos aquí para facilitar tu viaje',
    intro: '¿Tienes dudas sobre una maleta, una entrega o un pedido? Cuéntanos qué necesitas y te ayudaremos a encontrar el siguiente paso.',
    metaTitle: 'Contacto Dosalga USA | Soporte de equipaje y pedidos',
    metaDescription: 'Contacta con Dosalga USA para recibir ayuda con maletas, accesorios de viaje, productos, pedidos, envíos y devoluciones.',
    topicsTitle: '¿Cómo podemos ayudarte?',
    topics: [
      ['Orientación de producto', 'Compara tamaños, materiales, funciones y accesorios de viaje antes de realizar tu pedido.'],
      ['Pedidos y entregas', 'Consulta un pedido existente, la información de entrega o un paquete que requiere atención.'],
      ['Devoluciones y soporte', 'Recibe información clara sobre los requisitos y pasos aplicables a tu compra.'],
    ],
    panelEyebrow: 'ATENCIÓN AL CLIENTE',
    panelTitle: 'Vamos a resolverlo juntos.',
    panelText: 'Incluye el número de pedido cuando tu mensaje se refiera a una compra existente. Así podremos localizarla más rápido.',
    emailLabel: 'Escríbenos',
    responseLabel: 'Tiempo de respuesta',
    response: 'Respondemos lo antes posible durante los días laborables.',
    formTitle: 'Envíanos un mensaje',
    formIntro: 'Completa el formulario y abriremos tu aplicación de correo con el mensaje listo para enviar.',
    name: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono',
    subject: 'Asunto',
    message: '¿Cómo podemos ayudarte?',
    orderNumber: 'Número de pedido',
    optional: 'Opcional',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'tu@correo.com',
    phonePlaceholder: '+1 305 000 0000',
    subjectPlaceholder: 'Producto, pedido, envío…',
    messagePlaceholder: 'Explícanos lo ocurrido y qué necesitas.',
    orderPlaceholder: 'Ejemplo: #1234',
    submit: 'Preparar correo',
    privacy: 'Tus datos solo se incluyen en el correo que tú decidas enviar.',
    emailSubject: 'Solicitud de soporte Dosalga USA',
    labels: { name: 'Nombre', email: 'Email', phone: 'Teléfono', order: 'Número de pedido', message: 'Mensaje' },
  },
};

const SUPPORT_EMAIL = 'contact@dosalga.store';

export default function TravelContactPage({ language = 'en' }) {
  const lang = language === 'es' ? 'es' : 'en';
  const content = CONTENT[lang];
  const siteUrl = 'https://www.dosalga.online';
  const canonical = lang === 'en' ? `${siteUrl}/contact` : `${siteUrl}/es/contact`;

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const subject = String(values.get('subject') || content.emailSubject).trim();
    const lines = [
      `${content.labels.name}: ${values.get('name') || ''}`,
      `${content.labels.email}: ${values.get('email') || ''}`,
      `${content.labels.phone}: ${values.get('phone') || '-'}`,
      `${content.labels.order}: ${values.get('orderNumber') || '-'}`,
      '',
      `${content.labels.message}:`,
      String(values.get('message') || ''),
    ];

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={`${siteUrl}/contact`} />
        <link rel="alternate" hrefLang="es" href={`${siteUrl}/es/contact`} />
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/contact`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
      </Head>

      <main className="contact-page">
        <section className="contact-hero">
          <div className="hero-orbit" />
          <div className="container hero-inner">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className="hero-intro">{content.intro}</p>
          </div>
        </section>

        <section className="topics-section">
          <div className="container">
            <div className="section-heading">
              <span>DOSALGA</span>
              <h2>{content.topicsTitle}</h2>
            </div>
            <div className="topics-grid">
              {content.topics.map(([title, text], index) => (
                <article className="topic-card" key={title}>
                  <span className="topic-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="container contact-grid">
            <aside className="contact-panel">
              <p className="panel-eyebrow">{content.panelEyebrow}</p>
              <h2>{content.panelTitle}</h2>
              <p className="panel-text">{content.panelText}</p>

              <div className="contact-detail">
                <span>{content.emailLabel}</span>
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              </div>
              <div className="contact-detail">
                <span>{content.responseLabel}</span>
                <p>{content.response}</p>
              </div>
            </aside>

            <div className="form-card">
              <div className="form-heading">
                <h2>{content.formTitle}</h2>
                <p>{content.formIntro}</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="field full">
                  <label htmlFor="contact-name">{content.name}</label>
                  <input id="contact-name" name="name" type="text" placeholder={content.namePlaceholder} required />
                </div>
                <div className="field">
                  <label htmlFor="contact-email">{content.email}</label>
                  <input id="contact-email" name="email" type="email" placeholder={content.emailPlaceholder} required />
                </div>
                <div className="field">
                  <label htmlFor="contact-phone">{content.phone} <span>({content.optional})</span></label>
                  <input id="contact-phone" name="phone" type="tel" placeholder={content.phonePlaceholder} />
                </div>
                <div className="field">
                  <label htmlFor="contact-order">{content.orderNumber} <span>({content.optional})</span></label>
                  <input id="contact-order" name="orderNumber" type="text" placeholder={content.orderPlaceholder} />
                </div>
                <div className="field">
                  <label htmlFor="contact-subject">{content.subject}</label>
                  <input id="contact-subject" name="subject" type="text" placeholder={content.subjectPlaceholder} required />
                </div>
                <div className="field full">
                  <label htmlFor="contact-message">{content.message}</label>
                  <textarea id="contact-message" name="message" rows="6" placeholder={content.messagePlaceholder} required />
                </div>
                <div className="form-actions full">
                  <button type="submit">{content.submit}<span aria-hidden="true">→</span></button>
                  <p>{content.privacy}</p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .contact-page { background: #f5f3ef; color: #161616; }
        .contact-hero { position: relative; min-height: 560px; display: flex; align-items: center; overflow: hidden; background: #111; color: #fff; }
        .contact-hero::before { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, #111 10%, rgba(17,17,17,.72) 60%, rgba(210,0,0,.46)); }
        .hero-orbit { position: absolute; right: -120px; top: -210px; width: 620px; height: 620px; border: 1px solid rgba(255,255,255,.14); border-radius: 50%; box-shadow: 0 0 0 90px rgba(255,255,255,.025), 0 0 0 180px rgba(255,255,255,.018); }
        .hero-inner { position: relative; z-index: 1; padding-top: 90px; padding-bottom: 90px; }
        .eyebrow, .section-heading span, .panel-eyebrow { margin: 0 0 24px; color: #d20000; font-size: 13px; font-weight: 800; letter-spacing: .2em; }
        .contact-hero h1 { max-width: 1040px; margin: 0; color: #fff; font-size: clamp(52px, 7vw, 100px); line-height: .98; letter-spacing: -.05em; }
        .hero-intro { max-width: 760px; margin: 32px 0 0; color: rgba(255,255,255,.76); font-size: clamp(18px, 2vw, 23px); line-height: 1.6; }
        .topics-section { padding: 110px 0; }
        .section-heading { display: grid; grid-template-columns: 1fr 3fr; gap: 50px; align-items: start; margin-bottom: 58px; }
        .section-heading h2 { max-width: 800px; margin: 0; font-size: clamp(42px, 5vw, 70px); line-height: 1; letter-spacing: -.045em; }
        .topics-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid #d6d2cb; border-bottom: 1px solid #d6d2cb; }
        .topic-card { padding: 46px 40px 48px 0; }
        .topic-card + .topic-card { padding-left: 40px; border-left: 1px solid #d6d2cb; }
        .topic-number { color: #d20000; font-size: 13px; font-weight: 800; letter-spacing: .16em; }
        .topic-card h3 { margin: 26px 0 14px; font-size: 25px; }
        .topic-card p { margin: 0; color: #616161; font-size: 16px; line-height: 1.7; }
        .form-section { padding: 0 0 120px; }
        .contact-grid { display: grid; grid-template-columns: .8fr 1.5fr; box-shadow: 0 28px 70px rgba(17,17,17,.1); }
        .contact-panel { padding: clamp(42px, 5vw, 76px); background: #171717; color: #fff; }
        .contact-panel h2 { margin: 0 0 24px; color: #fff; font-size: clamp(38px, 4vw, 58px); line-height: 1.05; letter-spacing: -.04em; }
        .panel-text { margin: 0 0 70px; color: rgba(255,255,255,.66); font-size: 17px; line-height: 1.75; }
        .contact-detail { padding: 26px 0; border-top: 1px solid rgba(255,255,255,.18); }
        .contact-detail > span { display: block; margin-bottom: 8px; color: rgba(255,255,255,.5); font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
        .contact-detail a, .contact-detail p { margin: 0; color: #fff; font-size: 17px; line-height: 1.55; text-decoration: none; }
        .contact-detail a:hover { color: #ff5555; }
        .form-card { padding: clamp(42px, 6vw, 78px); background: #fff; }
        .form-heading { margin-bottom: 42px; }
        .form-heading h2 { margin: 0 0 12px; font-size: clamp(34px, 4vw, 52px); letter-spacing: -.035em; }
        .form-heading p { max-width: 650px; margin: 0; color: #696969; line-height: 1.65; }
        form { display: grid; grid-template-columns: 1fr 1fr; gap: 26px 24px; }
        .field { display: flex; flex-direction: column; gap: 10px; }
        .field.full, .form-actions.full { grid-column: 1 / -1; }
        label { color: #202020; font-size: 14px; font-weight: 700; }
        label span { color: #888; font-weight: 400; }
        input, textarea { width: 100%; border: 0; border-bottom: 1px solid #cfcac2; border-radius: 0; padding: 13px 2px; background: transparent; color: #111; font: inherit; outline: none; transition: border-color .2s ease; }
        textarea { min-height: 145px; resize: vertical; }
        input:focus, textarea:focus { border-color: #d20000; }
        input::placeholder, textarea::placeholder { color: #999; }
        .form-actions { display: flex; align-items: center; gap: 24px; margin-top: 10px; }
        .form-actions button { display: inline-flex; align-items: center; justify-content: space-between; gap: 36px; min-width: 220px; padding: 17px 22px; border: 2px solid #d20000; background: #d20000; color: #fff; font-size: 14px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; transition: .25s ease; }
        .form-actions button:hover { background: #111; border-color: #111; }
        .form-actions button span { font-size: 20px; line-height: 1; }
        .form-actions p { margin: 0; color: #888; font-size: 12px; line-height: 1.5; }
        @media (max-width: 991px) {
          .section-heading, .contact-grid { grid-template-columns: 1fr; }
          .topics-grid { grid-template-columns: 1fr; }
          .topic-card, .topic-card + .topic-card { padding: 36px 0; border-left: 0; border-bottom: 1px solid #d6d2cb; }
          .topic-card:last-child { border-bottom: 0; }
          .panel-text { margin-bottom: 40px; }
        }
        @media (max-width: 767px) {
          .contact-hero { min-height: 500px; }
          .hero-inner { padding-top: 70px; padding-bottom: 70px; }
          .topics-section { padding: 80px 0; }
          .form-section { padding-bottom: 80px; }
          form { grid-template-columns: 1fr; }
          .field.full, .form-actions.full { grid-column: 1; }
          .form-actions { align-items: flex-start; flex-direction: column; }
          .form-actions button { width: 100%; }
        }
      `}</style>
    </>
  );
}
