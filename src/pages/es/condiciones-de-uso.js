import React from "react";
import Head from "next/head";

const CondicionesDeUsoPage = () => {
  return (
    <>
      <Head>
        <title>Condiciones de Uso | Dosalga</title>
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Condiciones de Uso</h1>

                <p>El acceso y uso del sitio web de Dosalga implica la aceptación de las presentes Condiciones de Uso.</p>

                <div className="policy-section mt-5">
                  <h2>Uso del sitio</h2>
                  <p>
                    El usuario se compromete a utilizar este sitio de manera legal, responsable y conforme a la normativa vigente.
                    Está prohibido el uso del sitio con fines fraudulentos, ilícitos o que puedan afectar su funcionamiento.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Contenido del sitio</h2>
                  <p>
                    Todos los textos, imágenes, logotipos y contenidos publicados en el sitio son propiedad de Dosalga o de sus
                    respectivos titulares y están protegidos por las leyes de propiedad intelectual.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Responsabilidad</h2>
                  <p>
                    Dosalga no garantiza que el sitio esté libre de errores o interrupciones. El uso del sitio se realiza bajo
                    responsabilidad del usuario.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Modificaciones</h2>
                  <p>Dosalga se reserva el derecho de modificar estas Condiciones de Uso en cualquier momento sin previo aviso.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CondicionesDeUsoPage;

