import React from "react";
import Head from "next/head";

const TermsAndConditionsPtPage = () => {
  const siteUrl = "https://dosalga.com";

  return (
    <>
      <Head>
        <title>Termos & Condições | Dosalga</title>
        <meta
          name="description"
          content="Termos e Condições de venda da Dosalga: dados da empresa, escopo, produtos, preços, pagamento, impostos, envio, devoluções, responsabilidade e lei aplicável."
        />
        <link rel="canonical" href={`${siteUrl}/pt/terms-and-conditions`} />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Termos &amp; Condições</h1>

                <div className="policy-section mt-5">
                  <h2>Condições de venda</h2>
                </div>

                <div className="policy-section mt-4">
                  <h3>1. Empresa</h3>
                  <p>A Dosalga é um varejista online internacional registrado no México. Comunicações sobre pedidos devem usar os contatos publicados no site.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>2. Escopo</h3>
                  <p>Estes Termos valem para todas as compras em https://www.dosalga.store. Ao comprar, o cliente os aceita integralmente.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>3. Produtos</h3>
                  <p>Produtos físicos vendidos via modelo de dropshipping internacional. Imagens são ilustrativas e podem divergir levemente do item entregue.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>4. Preços</h3>
                  <p>Exibidos na moeda selecionada, sem incluir taxas de importação, tarifas ou impostos locais salvo menção. Vale o preço na confirmação do pedido.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>5. Pagamento</h3>
                  <p>Processado por provedores externos seguros. O pedido confirma após pagamento integral. A Dosalga não armazena dados de pagamento.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>6. Impostos e tarifas</h3>
                  <p>Tarifas de importação, taxas alfandegárias, IVA ou impostos similares não estão inclusos e são de responsabilidade do cliente.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>7. Envio e entrega</h3>
                  <p>Envio internacional; prazos são estimativos. Após a entrega à transportadora, a responsabilidade é dela.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>8. Direito de arrependimento</h3>
                  <p>Limitado pelo modelo. Devoluções só conforme a política de Devoluções e Reembolsos.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>9. Devoluções e reembolsos</h3>
                  <p>Regidos pela política dedicada. A Dosalga pode recusar solicitações que não atendam às condições.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>10. Responsabilidade</h3>
                  <p>Sem responsabilidade por atrasos alfandegários, restrições de importação ou danos indiretos. Limite ao valor pago pelo pedido.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>11. Propriedade intelectual</h3>
                  <p>Todo o conteúdo do site pertence à Dosalga e não pode ser usado sem consentimento escrito.</p>
                </div>

                <div className="policy-section mt-4">
                  <h3>12. Lei e foro</h3>
                  <p>Aplica-se a lei mexicana; foro exclusivo dos tribunais competentes no México.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditionsPtPage;
