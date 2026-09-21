import { getCatalogCategories } from '@/src/lib/catalogRepository';
import { normalizeCategoriesToEnglish, translateCategoriesToSpanish } from '@/src/lib/productText';
import { isHiddenCreamCategory } from '@/src/lib/productVisibility';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
  res.setHeader('Vercel-CDN-Cache-Control', 'max-age=300, stale-while-revalidate=86400');
  res.setHeader('X-Dosalga-Catalog-Source', 'railway');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { per_page = 100, hide_empty = true, lang = 'es' } = req.query;
    const limit = Math.min(Math.max(Number.parseInt(per_page, 10) || 100, 1), 100);
    const categories = await getCatalogCategories({ hideEmpty: hide_empty === 'true' });
    const filtered = categories.filter((category) => !isHiddenCreamCategory(category)).slice(0, limit);
    const localized = String(lang).toLowerCase() === 'en'
      ? normalizeCategoriesToEnglish(filtered)
      : translateCategoriesToSpanish(filtered);

    return res.status(200).json({ success: true, data: localized, count: localized.length, source: 'railway' });
  } catch (error) {
    console.error('Error reading the Railway category catalog:', error);
    return res.status(503).json({
      success: false,
      message: 'Les catégories sont temporairement indisponibles',
      error: error.message,
    });
  }
}
