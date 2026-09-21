import { syncStorefrontCatalog } from '@/src/lib/catalogSync';

export const config = {
  maxDuration: 300,
};

const isAuthorized = (req) => {
  const expected = process.env.CATALOG_SYNC_SECRET
    || process.env.CRON_SECRET
    || process.env.WC_CONSUMER_SECRET;
  if (!expected) return false;
  return req.headers.authorization === `Bearer ${expected}`;
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!['GET', 'POST'].includes(req.method)) {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  if (!isAuthorized(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const result = await syncStorefrontCatalog(req.headers['x-vercel-cron'] ? 'cron' : 'manual');
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error('Catalog synchronization failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Catalog synchronization failed',
      error: error.message,
    });
  }
}
