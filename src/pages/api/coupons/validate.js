const SOCIO_DISCOUNT_RATE = 0.50;

const normalizeCouponCode = (value) => String(value ?? '').trim().toUpperCase();

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const validCodes = [process.env.SOCIO_COUPON_CODE, '2UP7NFF6'].map(normalizeCouponCode).filter(Boolean);
  const submittedCode = normalizeCouponCode(req.body?.code);

  if (!submittedCode || !validCodes.includes(submittedCode)) {
    return res.status(404).json({ success: false, message: 'Code promo invalide.' });
  }

  return res.status(200).json({
    success: true,
    code: 'SOCIO_DISCOUNT',
    label: 'Remise socios',
    type: 'percent',
    rate: SOCIO_DISCOUNT_RATE,
  });
}
