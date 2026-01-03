import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

/**
 * API Route pour générer le sitemap dynamique depuis WooCommerce
 * Accessible via: /api/sitemap
 */
export default async function handler(req, res) {
  try {
    // Configuration WooCommerce
    const api = new WooCommerceRestApi({
      url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || 'http://localhost:8000',
      consumerKey: process.env.WC_CONSUMER_KEY || '',
      consumerSecret: process.env.WC_CONSUMER_SECRET || '',
      version: 'wc/v3'
    });

    const siteUrl = 'https://dosalga.com';
    const currentDate = new Date().toISOString().split('T')[0];

    // Récupérer les produits depuis WooCommerce
    let products = [];
    let categories = [];

    try {
      const productsResponse = await api.get('products', {
        per_page: 100,
        status: 'publish'
      });
      products = productsResponse.data || [];

      const categoriesResponse = await api.get('products/categories', {
        per_page: 100
      });
      categories = categoriesResponse.data || [];
    } catch (error) {
      console.error('Error fetching from WooCommerce:', error.message);
      // Continue avec les pages statiques même si WooCommerce échoue
    }

    // Construire le XML du sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Home Page - English -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>
  
  <!-- Home Page - Spanish -->
  <url>
    <loc>${siteUrl}/es</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/" />
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />
  </url>
  
  <!-- About Us - English -->
  <url>
    <loc>${siteUrl}/about-us</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/about-us" />
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es/about-us" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/about-us" />
  </url>
  
  <!-- About Us - Spanish -->
  <url>
    <loc>${siteUrl}/es/about-us</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/about-us" />
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es/about-us" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/about-us" />
  </url>
  
  <!-- Contact - English -->
  <url>
    <loc>${siteUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/contact" />
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es/contact" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/contact" />
  </url>
  
  <!-- Contact - Spanish -->
  <url>
    <loc>${siteUrl}/es/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/contact" />
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es/contact" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/contact" />
  </url>
`;

    // Ajouter les catégories de produits
    categories.forEach(category => {
      if (category.count > 0) {
        xml += `
  <!-- Category: ${category.name} -->
  <url>
    <loc>${siteUrl}/category/${category.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
      }
    });

    // Ajouter les produits
    products.forEach(product => {
      const productDate = product.date_modified || product.date_created || currentDate;
      xml += `
  <!-- Product: ${product.name} -->
  <url>
    <loc>${siteUrl}/shop/product/${product.slug}</loc>
    <lastmod>${productDate.split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
`;
    });

    xml += `
</urlset>`;

    // Définir les headers
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Error generating sitemap' });
  }
}
