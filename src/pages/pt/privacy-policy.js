import React from "react";
import Head from "next/head";

const PrivacyPolicyPt = () => {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const slugByLocale = { en: '/privacy-policy', es: '/privacy-policy', de: '/privacy-policy', fr: '/privacy-policy', it: '/privacy-policy', pt: '/privacy-policy' };
  const currentLocale = 'pt';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'pt_PT';
	  return (
	    <>
	    <Head>
      <title>Política de Privacidade | Dosalga</title>
      <meta name="description" content="Política de privacidade da Dosalga: dados coletados, uso e seus direitos." />
      <link rel="canonical" href={hrefFor(currentLocale)} />
      {locales.map((locale) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={hrefFor(currentLocale)} />
      <meta property="og:title" content="Política de Privacidade | Dosalga" />
      <meta property="og:description" content="Saiba como a Dosalga trata seus dados e seus direitos de privacidade." />
    </Head>
    <div className="privacy-policy-section pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="privacy-content">
              <h1 className="mb-4">Política de Privacidade</h1>
              <p className="last-updated"><strong>Última atualização:</strong> 28 de novembro de 2025</p>

              <div className="policy-section mt-5">
                <h2>1. Sobre a empresa</h2>
                <p>
                  Esta política é emitida pela <strong>DOSALGA</strong>. Protegemos seus dados pessoais e sua privacidade.
                </p>
                <p>Contato: info@dosalga.store | Tel: 2-965-871-8617</p>
              </div>

              <div className="policy-section mt-5">
                <h2>2. Dados que coletamos</h2>
                <p><strong>Fornecidos por você:</strong> nome, contato, pagamento, credenciais de conta, preferências, histórico de compras.</p>
                <p><strong>Automáticos:</strong> IP, navegador, uso de páginas, localização aproximada, cookies.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>3. Como usamos os dados</h2>
                <ul>
                  <li>Processar pedidos e gerenciar contas</li>
                  <li>Suporte ao cliente e comunicações</li>
                  <li>Marketing (com consentimento)</li>
                  <li>Melhorias de serviço e exigências legais</li>
                  <li>Prevenção de fraude</li>
                </ul>
              </div>

              <div className="policy-section mt-5">
                <h2>4. Bases legais (GDPR)</h2>
                <p>Execução de contrato, consentimento, interesses legítimos ou obrigação legal, conforme o caso.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>5. Seus direitos</h2>
                <p>Acesso, correção, exclusão, limitação, oposição, portabilidade e revogação de consentimento.</p>
                <p>Para exercer: info@dosalga.store.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>6. Retenção & segurança</h2>
                <p>Guardamos dados apenas pelo tempo necessário. Aplicamos medidas técnicas e organizacionais de segurança; nenhum sistema é 100% infalível.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>7. Cookies & rastreamento</h2>
                <p>Usamos cookies para funcionalidade e análise. Gerencie preferências no navegador ou ferramenta de cookies.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>8. Transferências internacionais</h2>
                <p>Dados podem ser processados fora do seu país; usamos salvaguardas reconhecidas (cláusulas padrão etc.) quando necessário.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>9. Menores</h2>
                <p>Os serviços não se destinam a menores de 13 anos.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>10. Alterações</h2>
                <p>Podemos atualizar esta política; a data acima é a referência. Para mudanças relevantes, informaremos separadamente.</p>
              </div>

              <div className="policy-section mt-5">
                <h2>11. Contato</h2>
                <p>Dúvidas ou pedidos: <strong>info@dosalga.store</strong>.</p>
              </div>
            </div>
          </div>
	        </div>
	      </div>
	    </div>
	    </>
	  );
	};

export default PrivacyPolicyPt;
