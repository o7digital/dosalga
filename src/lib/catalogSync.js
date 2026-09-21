import { replaceCatalogSnapshot } from '@/src/lib/catalogRepository';
import { normalizeWooProductsPricesToMXN } from '@/src/lib/pricing';
import { getAllCategories, getAllProductsSequential } from '@/src/lib/woocommerce';

export const syncStorefrontCatalog = async (triggerName = 'manual') => {
  const [sourceProducts, categories] = await Promise.all([
    getAllProductsSequential({ per_page: 100 }),
    getAllCategories({ per_page: 100, hide_empty: false }),
  ]);
  const products = normalizeWooProductsPricesToMXN(sourceProducts);

  return replaceCatalogSnapshot(products, categories, triggerName);
};
