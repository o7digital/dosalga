import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const SITE_CODE = "dosalga";
const OLIVIA_API = "https://olivia-ai.o7digital.com/api";
const LEAD_ENDPOINT = `${OLIVIA_API}/widget/conversations`;
const CHAT_ENDPOINT = `${OLIVIA_API}/olivia/chat`;
const IDENTITY_ENDPOINT = `${OLIVIA_API}/widget/identity`;
const OFFLINE = false;

const COPY = {
  es: {
    title: "Olivia",
    status: "Asistente DOSALGA",
    online: "En linea",
    teaser: "Necesitas ayuda?",
    open: "Abrir chat",
    close: "Cerrar chat",
    welcome: "Hola, soy Olivia. En que puedo ayudarte con DOSALGA?",
    leadIntro: "Deja tus datos para que un asesor de DOSALGA pueda contactarte.",
    firstName: "Nombre",
    lastName: "Apellido",
    email: "Email",
    phone: "Telefono",
    submitLead: "Enviar datos",
    leadThanks: "Gracias. Tus datos fueron enviados y un asesor te contactara pronto.",
    placeholder: "Escribe tu pregunta...",
    send: "Enviar",
    error: "No pude enviar el mensaje. Intenta de nuevo o contacta directamente a DOSALGA.",
    privacy: "He leído y acepto el",
    privacyLink: "Aviso de Privacidad",
    privacyRequired: "Acepta el Aviso de Privacidad para poder chatear."
  },
  en: {
    title: "Olivia",
    status: "DOSALGA Assistant",
    online: "Online",
    teaser: "Need help?",
    open: "Open chat",
    close: "Close chat",
    welcome: "Hello, I am Olivia. How can I help with DOSALGA?",
    leadIntro: "Leave your details so a DOSALGA advisor can contact you.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    submitLead: "Send details",
    leadThanks: "Thanks. Your details were sent and an advisor will contact you soon.",
    placeholder: "Write your question...",
    send: "Send",
    error: "I could not send the message. Please try again or contact DOSALGA directly.",
    privacy: "I have read and accept the",
    privacyLink: "Privacy Notice",
    privacyRequired: "Please accept the Privacy Notice to start the chat."
  },
  fr: {
    title: "Olivia",
    status: "Assistante DOSALGA",
    online: "En ligne",
    teaser: "Besoin d'aide ?",
    open: "Ouvrir le chat",
    close: "Fermer le chat",
    welcome: "Bonjour, je suis Olivia. Comment puis-je vous aider avec DOSALGA ?",
    leadIntro: "Laissez vos coordonnees pour qu'un conseiller DOSALGA puisse vous contacter.",
    firstName: "Prenom",
    lastName: "Nom",
    email: "Email",
    phone: "Telephone",
    submitLead: "Envoyer",
    leadThanks: "Merci. Vos coordonnees ont ete envoyees et un conseiller vous contactera rapidement.",
    placeholder: "Ecrivez votre question...",
    send: "Envoyer",
    error: "Je n'ai pas pu envoyer le message. Reessayez ou contactez directement DOSALGA."
  },
  de: {
    title: "Olivia",
    status: "DOSALGA Assistentin",
    online: "Online",
    teaser: "Brauchen Sie Hilfe?",
    open: "Chat offnen",
    close: "Chat schliessen",
    welcome: "Hallo, ich bin Olivia. Wie kann ich bei DOSALGA helfen?",
    leadIntro: "Hinterlassen Sie Ihre Kontaktdaten, damit DOSALGA Sie kontaktieren kann.",
    firstName: "Vorname",
    lastName: "Name",
    email: "E-Mail",
    phone: "Telefon",
    submitLead: "Daten senden",
    leadThanks: "Danke. Ihre Daten wurden gesendet und ein Berater meldet sich zeitnah.",
    placeholder: "Schreiben Sie Ihre Frage...",
    send: "Senden",
    error: "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie DOSALGA direkt."
  },
  it: {
    title: "Olivia",
    status: "Assistente DOSALGA",
    online: "Online",
    teaser: "Hai bisogno di aiuto?",
    open: "Apri chat",
    close: "Chiudi chat",
    welcome: "Ciao, sono Olivia. Come posso aiutarti con DOSALGA?",
    leadIntro: "Lascia i tuoi dati cosi un consulente DOSALGA potra contattarti.",
    firstName: "Nome",
    lastName: "Cognome",
    email: "Email",
    phone: "Telefono",
    submitLead: "Invia dati",
    leadThanks: "Grazie. I tuoi dati sono stati inviati e un consulente ti contattera presto.",
    placeholder: "Scrivi la tua domanda...",
    send: "Invia",
    error: "Non ho potuto inviare il messaggio. Riprova o contatta direttamente DOSALGA."
  },
  pt: {
    title: "Olivia",
    status: "Assistente DOSALGA",
    online: "Online",
    teaser: "Precisa de ajuda?",
    open: "Abrir chat",
    close: "Fechar chat",
    welcome: "Ola, sou Olivia. Como posso ajudar com a DOSALGA?",
    leadIntro: "Deixe seus dados para que um consultor da DOSALGA entre em contato.",
    firstName: "Nome",
    lastName: "Sobrenome",
    email: "Email",
    phone: "Telefone",
    submitLead: "Enviar dados",
    leadThanks: "Obrigado. Seus dados foram enviados e um consultor entrara em contato em breve.",
    placeholder: "Escreva sua pergunta...",
    send: "Enviar",
    error: "Nao consegui enviar a mensagem. Tente novamente ou contate a DOSALGA diretamente."
  }
};

function detectMessageLanguage(message, fallbackLanguage) {
  const value = (message || "").toLowerCase();
  if (/\b(hola|gracias|precio|precios|envio|devolucion|cambio|talla|producto|pedido|entrega)\b/.test(value)) return "es";
  if (/\b(bonjour|merci|prix|livraison|retour|echange|taille|produit|commande)\b/.test(value)) return "fr";
  if (/\b(hello|thanks|price|shipping|return|exchange|size|product|order|delivery)\b/.test(value)) return "en";
  if (/\b(hallo|danke|preis|versand|ruckgabe|umtausch|grosse|produkt|bestellung)\b/.test(value)) return "de";
  if (/\b(ciao|grazie|prezzo|spedizione|reso|cambio|taglia|prodotto|ordine)\b/.test(value)) return "it";
  if (/\b(ola|obrigado|preco|envio|devolucao|troca|tamanho|produto|pedido)\b/.test(value)) return "pt";
  return fallbackLanguage;
}

export default function OliviaChatDosalga() {
  const router = useRouter();
  const [visitorId] = useState(() => `dosalga-${Date.now()}-${Math.random().toString(16).slice(2)}`);
  // Use the browser pathname after hydration: Next can briefly expose the
  // source route during a locale rewrite, which left the widget in English.
  const currentPath = typeof window !== "undefined" ? window.location.pathname : router.asPath;
  const firstSegment = currentPath.split("/").filter(Boolean)[0];
  // DOSALGA MX is Spanish by default; only the explicit /en route is English.
  const language = ["en", "es", "fr", "de", "it", "pt"].includes(firstSegment) ? firstSegment : "es";
  const copy = COPY[language] || COPY.en;
  const privacyCopy = {
    privacy: copy.privacy || COPY.en.privacy,
    privacyLink: copy.privacyLink || COPY.en.privacyLink,
    privacyRequired: copy.privacyRequired || COPY.en.privacyRequired,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [identity, setIdentity] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [leadSent, setLeadSent] = useState(true);
  const [lead, setLead] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [messages, setMessages] = useState(
    OFFLINE
      ? [{ role: "assistant", content: "Offline" }]
      : [{ role: "assistant", content: copy.welcome }]
  );

  useEffect(() => {
    if (OFFLINE) return;
    // A locale switch must also reset the visible greeting/transcript. Otherwise
    // an already-open English conversation remains visible on the Spanish page.
    setMessages([{ role: "assistant", content: copy.welcome }]);
    setInput("");
  }, [language, copy.welcome]);

  useEffect(() => {
    let active = true;
    fetch(IDENTITY_ENDPOINT, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("identity failed")))
      .then((data) => { if (active) setIdentity(data.identity || ""); })
      .catch(() => { if (active) setIdentity(""); });
    return () => { active = false; };
  }, []);

  const transcript = useMemo(() => messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n"), [messages]);

  const submitLead = async (event) => {
    event.preventDefault();
    if (OFFLINE) return;
    if (!lead.firstName.trim() || !lead.lastName.trim() || !lead.email.trim() || !lead.phone.trim() || isLoading || !identity) return;

    setIsLoading(true);
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Olivia-Widget-Identity": identity },
        body: JSON.stringify({
          clientCode: SITE_CODE,
          visitorId,
          visitorName: `${lead.firstName.trim()} ${lead.lastName.trim()}`.trim(),
          email: lead.email.trim(),
          phone: lead.phone.trim(),
          source: "Chat Olivia DOSALGA",
          language,
          content: `Lead Chat Olivia DOSALGA (${language})\n\nName: ${lead.firstName.trim()} ${lead.lastName.trim()}\nEmail: ${lead.email.trim()}\nPhone: ${lead.phone.trim()}`,
          metadata: {
            type: "lead",
            firstName: lead.firstName.trim(),
            lastName: lead.lastName.trim(),
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
            pageTitle: typeof document !== "undefined" ? document.title : "",
            transcript,
          },
        })
      });
      if (!response.ok) throw new Error("lead failed");
      setLeadSent(true);
      setMessages((prev) => [...prev, { role: "assistant", content: copy.leadThanks }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: copy.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (OFFLINE) return;
    const message = input.trim();
    if (!message || isLoading || !leadSent || !privacyAccepted || !identity) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Olivia-Widget-Identity": identity },
        body: JSON.stringify({
          message,
          language,
          clientCode: SITE_CODE,
          visitorId,
          metadata: {
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
            pageTitle: typeof document !== "undefined" ? document.title : "",
          },
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "chat failed");
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || copy.error }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: copy.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="olivia-dosalga-chat">
      {isOpen && (
        <section className="olivia-dosalga-panel" aria-label={copy.status}>
          <header className="olivia-dosalga-header">
            <div>
              <p className="olivia-dosalga-title">{copy.title}</p>
              <p className="olivia-dosalga-status">{OFFLINE ? "Offline" : `${copy.status} · ${copy.online}`}</p>
            </div>
            <button type="button" className="olivia-dosalga-close" onClick={() => setIsOpen(false)} aria-label={copy.close}>x</button>
          </header>

          <div className="olivia-dosalga-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`olivia-dosalga-message ${message.role}`}>{message.content}</div>
            ))}
            {isLoading && <div className="olivia-dosalga-message assistant">...</div>}
          </div>

          {!OFFLINE && !leadSent && (
            <form className="olivia-dosalga-lead" onSubmit={submitLead}>
              <p>{copy.leadIntro}</p>
              <input required placeholder={copy.firstName} value={lead.firstName} onChange={(e) => setLead((p) => ({ ...p, firstName: e.target.value }))} />
              <input required placeholder={copy.lastName} value={lead.lastName} onChange={(e) => setLead((p) => ({ ...p, lastName: e.target.value }))} />
              <input required type="email" placeholder={copy.email} value={lead.email} onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))} />
              <input required type="tel" placeholder={copy.phone} value={lead.phone} onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))} />
              <button type="submit" disabled={isLoading}>{copy.submitLead}</button>
            </form>
          )}

          <div className="olivia-dosalga-privacy">
            <label>
              <input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} />
              <span>{privacyCopy.privacy} <a href={language === "es" ? "/es/privacy-policy" : "/privacy-policy"} target="_blank" rel="noreferrer">{privacyCopy.privacyLink}</a>.</span>
            </label>
          </div>
          <div className="olivia-dosalga-composer">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }} disabled={OFFLINE || !leadSent || isLoading || !privacyAccepted || !identity} placeholder={OFFLINE ? "Offline" : !privacyAccepted ? privacyCopy.privacyRequired : copy.placeholder} />
            <button type="button" onClick={sendMessage} disabled={OFFLINE || isLoading || !leadSent || !privacyAccepted || !identity} aria-label={copy.send}>{">"}</button>
          </div>
        </section>
      )}

      <div className="olivia-dosalga-closed">
        {!isOpen && (
          <button type="button" className="olivia-dosalga-teaser" onClick={() => setIsOpen(true)}>
            <span className="olivia-dosalga-avatar">O</span>
            <span>{OFFLINE ? "Offline" : copy.teaser}</span>
          </button>
        )}
        <button type="button" className="olivia-dosalga-toggle" onClick={() => setIsOpen((v) => !v)} aria-label={isOpen ? copy.close : copy.open}>
          {isOpen ? "x" : "Olivia"}
        </button>
      </div>

      <style jsx global>{`
        .olivia-dosalga-chat { position: fixed; right: 22px; bottom: 22px; z-index: 2147483646; font-family: system-ui, -apple-system, Segoe UI, sans-serif; }
        .olivia-dosalga-chat * { box-sizing: border-box; }
        .olivia-dosalga-panel { width: min(390px, calc(100vw - 28px)); height: min(650px, calc(100vh - 110px)); margin-bottom: 14px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid rgba(255,255,255,.14); border-radius: 26px; background: linear-gradient(145deg,#261b1b,#080808); color: #fff; box-shadow: 0 42px 72px -24px #000b,0 8px 24px -12px #d2000080,inset 0 1px #ffffff2b; animation:olivia-in .32s ease; }
        .olivia-dosalga-header { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 17px 18px; background: linear-gradient(135deg,#080808,#3b1212); border-bottom: 1px solid #d2000073; }
        .olivia-dosalga-title { margin: 0; color: #fff; font-size: 18px; font-weight: 900; line-height: 1.2; }
        .olivia-dosalga-status { margin: 4px 0 0; color: rgba(255,255,255,.7); font-size: 13px; }.olivia-dosalga-status:before{content:'';display:inline-block;width:8px;height:8px;margin-right:7px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 4px #22c55e25}
        .olivia-dosalga-close,.olivia-dosalga-toggle,.olivia-dosalga-teaser,.olivia-dosalga-lead button,.olivia-dosalga-composer button { border: 0; cursor: pointer; font: inherit; }
        .olivia-dosalga-close { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,.15); color: #fff; font-weight: 900; }
        .olivia-dosalga-messages { flex: 1; min-height: 180px; overflow-y: auto; padding: 17px; background: #171717; }
        .olivia-dosalga-message { width: fit-content; max-width: 88%; margin: 0 0 10px; padding: 11px 13px; border-radius: 18px 18px 18px 6px; font-size: 14px; line-height: 1.45; white-space: pre-wrap; box-shadow:0 8px 18px #0003; animation:olivia-msg .25s ease both; }
        .olivia-dosalga-message.assistant { background: #2a2a2a; color: #fff; }
        .olivia-dosalga-message.user { margin-left: auto; background: #d20000; color: #fff; border-radius:18px 18px 6px 18px; }
        .olivia-dosalga-lead { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; padding: 14px; background: #181818; border-top: 1px solid rgba(255,255,255,.1); }
        .olivia-dosalga-lead p,.olivia-dosalga-lead button { grid-column: 1 / -1; }
        .olivia-dosalga-lead p { margin: 0; color: rgba(255,255,255,.72); font-size: 13px; line-height: 1.4; }
        .olivia-dosalga-lead input,.olivia-dosalga-composer input { width: 100%; min-width: 0; border: 1px solid rgba(255,255,255,.25); border-radius: 12px; background: rgba(255,255,255,.08); color: #fff; font: inherit; font-size: 14px; outline: none; }
        .olivia-dosalga-lead input { padding: 11px; }
        .olivia-dosalga-lead input::placeholder,.olivia-dosalga-composer input::placeholder { color: rgba(255,255,255,.58); }
        .olivia-dosalga-lead button,.olivia-dosalga-composer button,.olivia-dosalga-toggle { background: #d20000; color: #fff; font-weight: 900; }
        .olivia-dosalga-lead button { padding: 12px 14px; border-radius: 12px; }
        .olivia-dosalga-composer { display: grid; grid-template-columns: 1fr 52px; gap: 9px; padding: 14px; background: #121214; border-top: 1px solid rgba(255,255,255,.1); }
        .olivia-dosalga-privacy { padding: 10px 14px 0; background: #121214; color: rgba(255,255,255,.72); font-size: 12px; line-height: 1.35; }
        .olivia-dosalga-privacy label { display: flex; gap: 8px; align-items: flex-start; cursor: pointer; }
        .olivia-dosalga-privacy input { margin: 3px 0 0; accent-color: #fff; }
        .olivia-dosalga-privacy a { color: #fff; text-decoration: underline; font-weight: 700; }
        .olivia-dosalga-composer input { padding: 12px 13px; }
        .olivia-dosalga-composer button { border-radius: 12px; font-size: 20px; }
        .olivia-dosalga-composer button:disabled,.olivia-dosalga-lead button:disabled,.olivia-dosalga-composer input:disabled { opacity: .58; cursor: not-allowed; }
        .olivia-dosalga-closed { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
        .olivia-dosalga-teaser { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border: 1px solid #d2000080; border-radius: 999px; background: #111; color: #fff; box-shadow: 0 24px 42px -18px #0009,inset 0 1px #ffffff1a; font-weight:800; }
        .olivia-dosalga-avatar { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: #d20000; color: #fff; font-weight: 900; }
        @keyframes olivia-in{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes olivia-msg{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .olivia-dosalga-toggle { min-width: 78px; height: 68px; padding: 0 14px; border-radius: 999px; box-shadow: 0 16px 44px rgba(0,0,0,.42); }
        @media (max-width: 560px) { .olivia-dosalga-chat { right: 14px; bottom: 14px; } .olivia-dosalga-lead { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
