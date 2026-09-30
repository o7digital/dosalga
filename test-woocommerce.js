/**
 * Script de test pour vérifier la connexion à l'API WooCommerce
 * Usage: node test-woocommerce.js
 */

const https = require('https');

const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://wp-dosalga-mx.o7digitalgroup.com';
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

if (!CONSUMER_KEY || !CONSUMER_SECRET) {
  throw new Error('WC_CONSUMER_KEY and WC_CONSUMER_SECRET are required.');
}
const requestOptions = {
  headers: {
    Authorization: `Basic ${Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')}`,
  },
};

// Test 1: Vérifier la connexion à l'API
console.log('🧪 Test de connexion à WooCommerce...\n');

const apiUrl = `${WORDPRESS_URL}/wp-json/wc/v3/products?per_page=5`;

https.get(apiUrl, requestOptions, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Connexion réussie!\n');
      const products = JSON.parse(data);
      
      if (products.length === 0) {
        console.log('ℹ️  Aucun produit trouvé. Ajoutez des produits dans WooCommerce.\n');
      } else {
        console.log(`📦 ${products.length} produit(s) trouvé(s):\n`);
        products.forEach((product, index) => {
          console.log(`${index + 1}. ${product.name}`);
          console.log(`   Prix: ${product.price}€`);
          console.log(`   Stock: ${product.stock_status}`);
          console.log('');
        });
      }
    } else {
      console.log(`❌ Erreur ${res.statusCode}: ${res.statusMessage}`);
      console.log('Réponse:', data);
    }
  });
}).on('error', (err) => {
  console.log('❌ Erreur de connexion:', err.message);
});

// Test 2: Vérifier les catégories
console.log('\n🏷️  Test des catégories...\n');

const catUrl = `${WORDPRESS_URL}/wp-json/wc/v3/products/categories`;

https.get(catUrl, requestOptions, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const categories = JSON.parse(data);
      console.log(`✅ ${categories.length} catégorie(s) trouvée(s):\n`);
      categories.forEach((cat, index) => {
        console.log(`${index + 1}. ${cat.name} (ID: ${cat.id})`);
      });
    }
  });
}).on('error', (err) => {
  console.log('❌ Erreur:', err.message);
});
