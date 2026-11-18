import { getCatalogCategories } from '@/src/lib/catalogRepository';
import { normalizeCategoriesToEnglish, translateCategoriesToSpanish } from '@/src/lib/productText';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Vercel-CDN-Cache-Control', 'no-store');
  res.setHeader('X-Dosalga-Catalog-Source', 'railway');

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { per_page = 100, hide_empty = true, lang = 'es' } = req.query;
    const limit = Math.min(Math.max(Number.parseInt(per_page, 10) || 100, 1), 100);
    const categories = await getCatalogCategories({ hideEmpty: hide_empty === true || hide_empty === 'true' });
    const filtered = categories.slice(0, limit);
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
