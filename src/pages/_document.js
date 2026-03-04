import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Dosalga",
    "url": "https://dosalga.com",
    "logo": "https://dosalga.com/assets/img/sm-logo.svg",
    "description": "Premium sportswear and activewear brand offering high-quality athletic clothing for an active lifestyle",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+52-965-871-8617",
      "contactType": "customer service",
      "email": "contact@dosalga.store",
      "areaServed": ["US", "MX", "ES"],
      "availableLanguage": ["English", "Spanish"]
    },
    "sameAs": [
      "https://facebook.com/dosalga",
      "https://instagram.com/dosalga",
      "https://twitter.com/dosalga"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Dosalga",
    "url": "https://dosalga.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://dosalga.com/shop?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&family=Kalam:wght@700&display=swap"
          rel="stylesheet"
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NXYGGSH0NR"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NXYGGSH0NR');
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
