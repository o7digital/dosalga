/**
 * API Route: /api/products/[id]
 * Récupère un produit par ID depuis WooCommerce
 */
import {
  getProduct,
  getProductReviews,
  getProductVariations,
  getWooCommerceErrorDetails,
} from '@/src/lib/woocommerce';
import {
  getWordPressPriceSourceCurrency,
  normalizeWooProductPricesToMXN,
  normalizeWooProductsPricesToMXN,
} from '@/src/lib/pricing';
import {
  normalizeWooProductTextToEnglish,
  translateWooProductDescriptionsToSpanish,
} from '@/src/lib/productText';
import {
  isProductVisible,
  preferDescriptionProductImages,
} from '@/src/lib/productVisibility';

const attachAdminManagedPrice = async (product) => {
  const sku = String(product?.sku || '').trim();
  if (!sku) return product;

  try {
    const adminUrl = process.env.DOSALGA_ADMIN_URL || 'https://admindosalga.vercel.app';
    const response = await fetch(`${adminUrl}/api/products`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });
    if (!response.ok) return product;

    const payload = await response.json();
    const adminProduct = (payload.products || []).find((candidate) => (
      String(candidate.sku || '').trim() === sku
      && candidate.wooPricePublication?.state === 'woo_verified'
    ));
    if (!adminProduct) return product;

    const price = Number(adminProduct.wooPricePublication?.price ?? adminProduct.salePrice);
    if (!Number.isFinite(price)) return product;

    return {
      ...product,
      price: String(price),
      regular_price: String(price),
      sale_price: '',
      meta_data: [
        ...(Array.isArray(product.meta_data) ? product.meta_data : []),
        { key: 'dosalga_price_source_currency', value: adminProduct.saleCurrency || 'MXN' },
      ],
    };
  } catch {
    return product;
  }
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('CDN-Cache-Control', 'no-store');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, lang = 'es' } = req.query;

  try {
    const sourceProduct = await getProduct(id);

    // Guard contre les réponses HTML/captcha
    if (!sourceProduct || typeof sourceProduct !== 'object' || Array.isArray(sourceProduct)) {
      throw new Error('Réponse produit invalide (captcha ou HTML).');
    }

    const product = preferDescriptionProductImages(sourceProduct);

    if (!isProductVisible(product)) {
      return res.status(404).json({
        success: false,
        message: 'Produit indisponible',
      });
    }
    
    // Si le produit a des variations, les récupérer aussi
    let variations = [];
    if (product.type === 'variable') {
      variations = await getProductVariations(id);
    }

    const reviews = getWordPressPriceSourceCurrency() === 'MXN'
      ? []
      : await getProductReviews({ product: id, per_page: 100 });
    const productWithReviews = await attachAdminManagedPrice({
      ...product,
      reviews: Array.isArray(reviews) ? reviews : [],
    });
    const productWithMxnPrices = normalizeWooProductPricesToMXN(productWithReviews);
    const normalizedProduct = String(lang).toLowerCase() === 'en'
      ? normalizeWooProductTextToEnglish(productWithMxnPrices)
      : translateWooProductDescriptionsToSpanish(productWithMxnPrices);
    const normalizedVariations = normalizeWooProductsPricesToMXN(
      variations.map((variation) => ({
        ...variation,
        ...(productWithReviews.price ? {
          price: productWithReviews.price,
          regular_price: productWithReviews.regular_price,
          sale_price: productWithReviews.sale_price,
          meta_data: productWithReviews.meta_data,
        } : {}),
        reviews: productWithReviews.reviews,
      }))
    );

    res.status(200).json({
      success: true,
      data: {
        ...normalizedProduct,
        variations: normalizedVariations
      }
    });
  } catch (error) {
    console.error(`Error fetching product ${id}:`, getWooCommerceErrorDetails(error));
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la récupération du produit',
      error: error.message 
    });
  }
}
