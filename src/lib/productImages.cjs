const PRODUCT_IMAGE_HOSTS = [
  'cf.cjdropshipping.com', 'oss-cf.cjdropshipping.com', 'cbu01.alicdn.com', 's.alicdn.com',
  'wp-dosalga-mx.o7digitalgroup.com', 'wp-dosalga-us.o7digitalgroup.com',
  'dosalga.online', 'www.dosalga.online', 'dosalga.com', 'beautico-nextjs.vercel.app',
];
const canOptimizeProductImage = src => {
  if (String(src).startsWith('/') && !String(src).startsWith('//')) return true;
  try { const url = new URL(src); return url.protocol === 'https:' && PRODUCT_IMAGE_HOSTS.includes(url.hostname); }
  catch { return false; }
};
module.exports = { PRODUCT_IMAGE_HOSTS, canOptimizeProductImage };
