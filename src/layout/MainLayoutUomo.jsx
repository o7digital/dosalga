import React, { useEffect } from "react";
import HeaderUomo from "./HeaderUomo";
import FooterUomo from "./FooterUomo";
import AuthModal from "./AuthModal";
import Breadcrumb from "../components/common/Breadcrumb";
import { useRouter } from "next/router";
import Head from "next/head";

const MainLayoutUomo = ({ children }) => {
  const route = useRouter();

  useEffect(() => {
    // Add the class to the <body> tag for Uomo style
    const body = document.body;
    body.classList.add("uomo-template");
    body.classList.remove("style-2");

    // Clean up the class when the component unmounts
    return () => {
      body.classList.remove("uomo-template");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dosalga - Premium Sportswear & Active Lifestyle</title>
        <meta name="description" content="Premium sportswear and active lifestyle products" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
      </Head>
      
      <AuthModal />
      <HeaderUomo />
      
      {children}
      
      <FooterUomo />
    </>
  );
};

export default MainLayoutUomo;
