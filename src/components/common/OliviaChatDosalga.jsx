import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const SITE_CODE = "dosalga";
const LEAD_ENDPOINT = "https://www.o7digital.com/api/o7-lead";
const CHAT_ENDPOINT = "https://www.o7digital.com/api/o7-chat";

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
    error: "No pude enviar el mensaje. Intenta de nuevo o contacta directamente a DOSALGA."
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
    error: "I could not send the message. Please try again or contact DOSALGA directly."
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
  const firstSegment = router.asPath.split("/").filter(Boolean)[0];
  const language = ["en", "es", "fr", "de", "it", "pt"].includes(firstSegment) ? firstSegment : "en";
  const copy = COPY[language] || COPY.en;

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [lead, setLead] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [messages, setMessages] = useState([{ role: "assistant", content: copy.welcome }]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length !== 1 || prev[0]?.role !== "assistant") return prev;
      return [{ role: "assistant", content: copy.welcome }];
    });
  }, [copy.welcome]);

  const transcript = useMemo(() => messages.map((msg) => `${msg.role}: ${msg.content}`).join("\n"), [messages]);

  const submitLead = async (event) => {
    event.preventDefault();
    if (!lead.firstName.trim() || !lead.lastName.trim() || !lead.email.trim() || !lead.phone.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: lead.firstName.trim(),
          lastName: lead.lastName.trim(),
          email: lead.email.trim(),
          phone: lead.phone.trim(),
          source: "Chat Olivia DOSALGA",
          language,
          siteCode: SITE_CODE,
          message: `Lead Chat Olivia DOSALGA (${language}, ${SITE_CODE})\n\n${transcript}`
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
    const message = input.trim();
    if (!message || isLoading || !leadSent) return;
    const messageLanguage = detectMessageLanguage(message, language);

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, language: messageLanguage, siteCode: SITE_CODE })
      });
      const data = await response.json();
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
              <p className="olivia-dosalga-status">{copy.status} · {copy.online}</p>
            </div>
            <button type="button" className="olivia-dosalga-close" onClick={() => setIsOpen(false)} aria-label={copy.close}>x</button>
          </header>

          <div className="olivia-dosalga-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`olivia-dosalga-message ${message.role}`}>{message.content}</div>
            ))}
            {isLoading && <div className="olivia-dosalga-message assistant">...</div>}
          </div>

          {!leadSent && (
            <form className="olivia-dosalga-lead" onSubmit={submitLead}>
              <p>{copy.leadIntro}</p>
              <input required placeholder={copy.firstName} value={lead.firstName} onChange={(e) => setLead((p) => ({ ...p, firstName: e.target.value }))} />
              <input required placeholder={copy.lastName} value={lead.lastName} onChange={(e) => setLead((p) => ({ ...p, lastName: e.target.value }))} />
              <input required type="email" placeholder={copy.email} value={lead.email} onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))} />
              <input required type="tel" placeholder={copy.phone} value={lead.phone} onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))} />
              <button type="submit" disabled={isLoading}>{copy.submitLead}</button>
            </form>
          )}

          <div className="olivia-dosalga-composer">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }} disabled={!leadSent || isLoading} placeholder={copy.placeholder} />
            <button type="button" onClick={sendMessage} disabled={isLoading || !leadSent} aria-label={copy.send}>{">"}</button>
          </div>
        </section>
      )}

      <div className="olivia-dosalga-closed">
        {!isOpen && (
          <button type="button" className="olivia-dosalga-teaser" onClick={() => setIsOpen(true)}>
            <span className="olivia-dosalga-avatar">O</span>
            <span>{copy.teaser}</span>
          </button>
        )}
        <button type="button" className="olivia-dosalga-toggle" onClick={() => setIsOpen((v) => !v)} aria-label={isOpen ? copy.close : copy.open}>
          {isOpen ? "x" : "Olivia"}
        </button>
      </div>

      <style jsx global>{`
        .olivia-dosalga-chat { position: fixed; right: 22px; bottom: 22px; z-index: 2147483646; font-family: system-ui, -apple-system, Segoe UI, sans-serif; }
        .olivia-dosalga-chat * { box-sizing: border-box; }
        .olivia-dosalga-panel { width: min(390px, calc(100vw - 28px)); height: min(650px, calc(100vh - 110px)); margin-bottom: 14px; display: flex; flex-direction: column; overflow: hidden; border: 1px solid rgba(255,255,255,.22); border-radius: 18px; background: #121214; color: #fff; box-shadow: 0 28px 90px rgba(0,0,0,.55); }
        .olivia-dosalga-header { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 18px; background: linear-gradient(135deg, rgba(255,255,255,.16), rgba(0,0,0,.22)); border-bottom: 1px solid rgba(255,255,255,.2); }
        .olivia-dosalga-title { margin: 0; color: #fff; font-size: 18px; font-weight: 900; line-height: 1.2; }
        .olivia-dosalga-status { margin: 4px 0 0; color: rgba(255,255,255,.7); font-size: 13px; }
        .olivia-dosalga-close,.olivia-dosalga-toggle,.olivia-dosalga-teaser,.olivia-dosalga-lead button,.olivia-dosalga-composer button { border: 0; cursor: pointer; font: inherit; }
        .olivia-dosalga-close { width: 38px; height: 38px; border-radius: 12px; background: rgba(255,255,255,.18); color: #fff; font-weight: 900; }
        .olivia-dosalga-messages { flex: 1; min-height: 180px; overflow-y: auto; padding: 16px; background: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), #111; background-size: 100% 42px; }
        .olivia-dosalga-message { width: fit-content; max-width: 88%; margin: 0 0 10px; padding: 11px 13px; border-radius: 16px; font-size: 14px; line-height: 1.45; white-space: pre-wrap; }
        .olivia-dosalga-message.assistant { background: rgba(255,255,255,.1); color: #fff; }
        .olivia-dosalga-message.user { margin-left: auto; background: #fff; color: #111; }
        .olivia-dosalga-lead { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; padding: 14px; background: #181818; border-top: 1px solid rgba(255,255,255,.1); }
        .olivia-dosalga-lead p,.olivia-dosalga-lead button { grid-column: 1 / -1; }
        .olivia-dosalga-lead p { margin: 0; color: rgba(255,255,255,.72); font-size: 13px; line-height: 1.4; }
        .olivia-dosalga-lead input,.olivia-dosalga-composer input { width: 100%; min-width: 0; border: 1px solid rgba(255,255,255,.25); border-radius: 12px; background: rgba(255,255,255,.08); color: #fff; font: inherit; font-size: 14px; outline: none; }
        .olivia-dosalga-lead input { padding: 11px; }
        .olivia-dosalga-lead input::placeholder,.olivia-dosalga-composer input::placeholder { color: rgba(255,255,255,.58); }
        .olivia-dosalga-lead button,.olivia-dosalga-composer button,.olivia-dosalga-toggle { background: #fff; color: #111; font-weight: 900; }
        .olivia-dosalga-lead button { padding: 12px 14px; border-radius: 12px; }
        .olivia-dosalga-composer { display: grid; grid-template-columns: 1fr 52px; gap: 9px; padding: 14px; background: #121214; border-top: 1px solid rgba(255,255,255,.1); }
        .olivia-dosalga-composer input { padding: 12px 13px; }
        .olivia-dosalga-composer button { border-radius: 12px; font-size: 20px; }
        .olivia-dosalga-composer button:disabled,.olivia-dosalga-lead button:disabled,.olivia-dosalga-composer input:disabled { opacity: .58; cursor: not-allowed; }
        .olivia-dosalga-closed { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
        .olivia-dosalga-teaser { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border: 1px solid rgba(255,255,255,.3); border-radius: 999px; background: #121214; color: #fff; box-shadow: 0 18px 42px rgba(0,0,0,.35); }
        .olivia-dosalga-avatar { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: #fff; color: #111; font-weight: 900; }
        .olivia-dosalga-toggle { min-width: 78px; height: 68px; padding: 0 14px; border-radius: 999px; box-shadow: 0 16px 44px rgba(0,0,0,.42); }
        @media (max-width: 560px) { .olivia-dosalga-chat { right: 14px; bottom: 14px; } .olivia-dosalga-lead { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}
