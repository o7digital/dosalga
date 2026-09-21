import { replaceCatalogSnapshot } from '@/src/lib/catalogRepository';
import { normalizeWooProductsPricesToMXN } from '@/src/lib/pricing';
import {
  getAllCategories,
  getAllProductsSequential,
  getAllRestProductsSequential,
} from '@/src/lib/woocommerce';

export const syncStorefrontCatalog = async (triggerName = 'manual') => {
  const [sourceProducts, restProducts, categories] = await Promise.all([
    getAllProductsSequential({ per_page: 100 }),
    getAllRestProductsSequential({ per_page: 100 }),
    getAllCategories({ per_page: 100, hide_empty: false }),
  ]);
  const restProductsById = new Map(restProducts.map((product) => [Number(product.id), product]));
  const enrichedProducts = sourceProducts.map((product) => {
    const restProduct = restProductsById.get(Number(product.id));
    if (!restProduct) return product;

    return {
      ...product,
      date_created: restProduct.date_created,
      date_created_gmt: restProduct.date_created_gmt,
      date_modified: restProduct.date_modified,
      meta_data: restProduct.meta_data,
    };
  });
  const products = normalizeWooProductsPricesToMXN(enrichedProducts);

  return replaceCatalogSnapshot(products, categories, triggerName);
};
