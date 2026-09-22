import crypto from 'node:crypto';
import { deleteCatalogProduct, upsertCatalogProduct } from '@/src/lib/catalogRepository';
import { normalizeWooProductPricesToMXN } from '@/src/lib/pricing';
import { getProduct, getRestProduct } from '@/src/lib/woocommerce';

export const config = {
  api: { bodyParser: false },
  maxDuration: 60,
};

const readRawBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
};

const isValidSignature = (rawBody, signature) => {
  const secret = process.env.WOO_WEBHOOK_SECRET || process.env.WC_CONSUMER_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('base64');
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(String(signature));
  return expectedBuffer.length === signatureBuffer.length
    && crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const rawBody = await readRawBody(req);
    if (!isValidSignature(rawBody, req.headers['x-wc-webhook-signature'])) {
      return res.status(401).json({ success: false, message: 'Invalid webhook signature' });
    }

    const payload = JSON.parse(rawBody.toString('utf8') || '{}');
    const topic = String(req.headers['x-wc-webhook-topic'] || '').toLowerCase();
    const productId = Number(payload?.id);

    if (!Number.isFinite(productId)) {
      return res.status(202).json({ success: true, ignored: true });
    }

    if (topic.endsWith('.deleted') || (payload.status && payload.status !== 'publish')) {
      await deleteCatalogProduct(productId);
      return res.status(200).json({ success: true, action: 'deleted', productId });
    }

    const [product, restProduct] = await Promise.all([
      getProduct(productId),
      getRestProduct(productId),
    ]);
    const enriched = {
      ...product,
      date_created: restProduct.date_created,
      date_created_gmt: restProduct.date_created_gmt,
      date_modified: restProduct.date_modified,
      meta_data: restProduct.meta_data,
    };
    await upsertCatalogProduct(normalizeWooProductPricesToMXN(enriched));
    return res.status(200).json({ success: true, action: 'upserted', productId });
  } catch (error) {
    console.error('Catalog webhook failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Catalog webhook failed',
      error: error.message,
    });
  }
}
