import React, { useEffect } from "react";
import Script from "next/script";
import MainLayoutUomo from "../layout/MainLayoutUomo";
import Head from "next/head";
import { CartProvider } from "../contexts/CartContext";
import { WishlistProvider } from "../contexts/WishlistContext";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/bootstrap-icons.css";
import "../../public/assets/css/fontawesome.min.css";
import "../../public/assets/css/boxicons.min.css";
import "../../public/assets/css/all.min.css";
import "../../public/assets/css/swiper-bundle.min.css";
import "../../public/assets/css/nice-select.css";
import "../../public/assets/css/animate.min.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/uomo-style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import OliviaChatDosalga from "../components/common/OliviaChatDosalga";

const SHOW_UNDER_CONSTRUCTION = false;

function UnderConstructionPage() {
  return (
    <>
      <Head>
        <title>DOSALGA - Site en construction</title>
        <meta
          name="description"
          content="Le site DOSALGA est temporairement en construction."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="construction-page">
        <section className="construction-panel" aria-labelledby="construction-title">
          <img
            src="/assets/img/sm-logo.svg"
            alt="DOSALGA"
            className="construction-logo"
          />
          <p className="construction-kicker">DOSALGA</p>
          <h1 id="construction-title">Site en construction</h1>
          <p className="construction-copy">
            Nous préparons une nouvelle expérience. Le site sera bientôt de
            retour.
          </p>
        </section>
      </main>
      <style jsx global>{`
        html,
        body,
        #__next {
          min-height: 100%;
        }

        body {
          margin: 0;
          background: #f5f1ea;
        }

        .construction-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 18px;
          color: #1f1f1f;
          background:
            linear-gradient(rgba(245, 241, 234, 0.88), rgba(245, 241, 234, 0.94)),
            url("/assets/img/inner-page/error-bg.png") center / cover no-repeat;
          font-family: Arial, Helvetica, sans-serif;
          text-align: center;
        }

        .construction-panel {
          width: min(100%, 560px);
          padding: 44px 28px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(31, 31, 31, 0.12);
          border-radius: 8px;
          box-shadow: 0 22px 60px rgba(31, 31, 31, 0.12);
        }

        .construction-logo {
          width: 86px;
          height: auto;
          margin-bottom: 28px;
        }

        .construction-kicker {
          margin: 0 0 12px;
          color: #6d604f;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
        }

        .construction-panel h1 {
          margin: 0;
          font-size: clamp(34px, 7vw, 62px);
          line-height: 1;
          letter-spacing: 0;
          text-transform: uppercase;
        }

        .construction-copy {
          max-width: 420px;
          margin: 22px auto 0;
          color: #4f4a43;
          font-size: 18px;
          line-height: 1.55;
        }

        @media (max-width: 520px) {
          .construction-panel {
            padding: 34px 20px;
          }

          .construction-copy {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("../../public/assets/js/bootstrap.min.js");
  }, []);

  if (SHOW_UNDER_CONSTRUCTION) {
    return <UnderConstructionPage />;
  }

  return (
    <>
      <Head>
        <title>DOSALGA - Premium Sportswear & Active Lifestyle</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="description" content="DOSALGA - Premium sportswear and active lifestyle products" />
      </Head>
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid="0f81dffe-04f0-4f78-8b0e-5383f69567df"
        data-blockingmode="auto"
        strategy="beforeInteractive"
      />
      <CartProvider>
        <WishlistProvider>
          <MainLayoutUomo>
            <Component {...pageProps} />
            <OliviaChatDosalga />
          </MainLayoutUomo>
        </WishlistProvider>
      </CartProvider>
      <ToastContainer position="bottom-center" autoClose={1800} hideProgressBar />
      <style jsx global>{`
        .countdown-timer {
          display: none !important;
        }
      `}</style>
    </>
  );
}
