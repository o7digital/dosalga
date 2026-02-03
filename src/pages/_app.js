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

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("../../public/assets/js/bootstrap.min.js");
  }, []);
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
          </MainLayoutUomo>
        </WishlistProvider>
      </CartProvider>
      <ToastContainer position="bottom-center" autoClose={1800} hideProgressBar />
    </>
  );
}
