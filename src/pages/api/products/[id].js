import { getCatalogProduct } from '@/src/lib/catalogRepository';
import {
  normalizeWooProductTextToEnglish,
  translateWooProductDescriptionsToSpanish,
} from '@/src/lib/productText';
import { isProductVisible, preferDescriptionProductImages } from '@/src/lib/productVisibility';

const createCachedVariations = (product) => {
  if (!Array.isArray(product?.variations)) return [];

  return product.variations.map((reference) => {
    const variation = typeof reference === 'object' ? reference : { id: reference };
    return {
      ...variation,
      id: variation.id,
      name: variation.name || product.name,
      price: product.price,
      regular_price: product.regular_price,
      sale_price: product.sale_price,
      on_sale: product.on_sale,
      purchasable: product.purchasable,
      stock_status: product.stock_status,
      image: variation.image || product.images?.[0] || null,
      images: variation.images || product.images || [],
      attributes: Array.isArray(variation.attributes)
        ? variation.attributes.map((attribute) => ({
            id: attribute?.id || 0,
            name: attribute?.name || '',
            slug: attribute?.name || '',
            option: attribute?.value || attribute?.option || '',
          }))
        : [],
      meta_data: product.meta_data || [],
      reviews: product.reviews || [],
    };
  });
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=86400');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=60, stale-while-revalidate=86400');
  res.setHeader('X-Dosalga-Catalog-Source', 'railway');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, lang = 'es' } = req.query;

  try {
    const sourceProduct = await getCatalogProduct(id);
    if (!sourceProduct) {
      return res.status(404).json({ success: false, message: 'Produit indisponible' });
    }

    const product = preferDescriptionProductImages(sourceProduct);
    if (!isProductVisible(product)) {
      return res.status(404).json({ success: false, message: 'Produit indisponible' });
    }

    const productWithDetails = {
      ...product,
      reviews: Array.isArray(product.reviews) ? product.reviews : [],
      variations: createCachedVariations(product),
    };
    const localizedProduct = String(lang).toLowerCase() === 'en'
      ? normalizeWooProductTextToEnglish(productWithDetails)
      : translateWooProductDescriptionsToSpanish(productWithDetails);

    return res.status(200).json({ success: true, data: localizedProduct, source: 'railway' });
  } catch (error) {
    console.error(`Error reading cached product ${id}:`, error);
    return res.status(503).json({
      success: false,
      message: 'Le produit est temporairement indisponible',
      error: error.message,
    });
  }
}
