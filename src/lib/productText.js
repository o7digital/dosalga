const DESCRIPTION_FIELDS = ['description', 'short_description'];

const SPANISH_REPLACEMENTS = [
  ['purchase notes', 'notas de compra'],
  ['this product does not have abe', 'este producto no cuenta con ABE'],
  ['if it is returned because there is no abe', 'si se devuelve porque no cuenta con ABE'],
  ['if you have just received it and have not used it', 'si acabas de recibirlo y no lo has usado'],
  ['you will deduct 20% of the handling fee', 'se descontara el 20% por gastos de gestion'],
  ['loss of round-trip freight', 'costo de envio de ida y vuelta'],
  ['maintenance fee', 'costo de mantenimiento'],
  ['if you have already used it', 'si ya lo has usado'],
  ['you will not be able to get a refund', 'no sera posible obtener un reembolso'],
  ['handling fee', 'gastos de gestion'],
  ['returned', 'devuelto'],
  ['received', 'recibido'],
  ['refund', 'reembolso'],
  ['used', 'usado'],
  ['purchase', 'compra'],
  ['notes', 'notas'],
  ['high performance', 'alto rendimiento'],
  ['electric scooter', 'scooter electrico'],
  ['electric scooters', 'scooters electricos'],
  ['off-road', 'todoterreno'],
  ['off road', 'todoterreno'],
  ['large tires', 'llantas grandes'],
  ['fat tires', 'llantas anchas'],
  ['solid tires', 'llantas macizas'],
  ['pneumatic tires', 'llantas neumaticas'],
  ['foldable', 'plegable'],
  ['folding', 'plegable'],
  ['commuting', 'traslados diarios'],
  ['commuter', 'urbano'],
  ['adults', 'adultos'],
  ['adult', 'adulto'],
  ['kids', 'ninos'],
  ['children', 'ninos'],
  ['max speed', 'velocidad maxima'],
  ['maximum speed', 'velocidad maxima'],
  ['top speed', 'velocidad maxima'],
  ['range', 'autonomia'],
  ['battery capacity', 'capacidad de bateria'],
  ['powerful motor', 'motor potente'],
  ['motor power', 'potencia del motor'],
  ['brushless motor', 'motor sin escobillas'],
  ['dual motor', 'doble motor'],
  ['front suspension', 'suspension delantera'],
  ['rear suspension', 'suspension trasera'],
  ['with suspension', 'con suspension'],
  ['suspension', 'suspension'],
  ['disc brake', 'freno de disco'],
  ['disc brakes', 'frenos de disco'],
  ['brake', 'freno'],
  ['brakes', 'frenos'],
  ['maximum load', 'carga maxima'],
  ['max load', 'carga maxima'],
  ['load', 'carga'],
  ['charging time', 'tiempo de carga'],
  ['charge time', 'tiempo de carga'],
  ['charging voltage', 'voltaje de carga'],
  ['voltage', 'voltaje'],
  ['hours', 'horas'],
  ['hour', 'hora'],
  ['charger', 'cargador'],
  ['waterproof', 'resistente al agua'],
  ['water resistant', 'resistente al agua'],
  ['led light', 'luz LED'],
  ['led lights', 'luces LED'],
  ['headlight', 'luz delantera'],
  ['tail light', 'luz trasera'],
  ['display', 'pantalla'],
  ['smart display', 'pantalla inteligente'],
  ['app control', 'control por app'],
  ['cruise control', 'control de crucero'],
  ['seat', 'asiento'],
  ['with seat', 'con asiento'],
  ['without seat', 'sin asiento'],
  ['frame', 'marco'],
  ['aluminum alloy', 'aleacion de aluminio'],
  ['alloy', 'aleacion'],
  ['material', 'material'],
  ['color', 'color'],
  ['black', 'negro'],
  ['white', 'blanco'],
  ['red', 'rojo'],
  ['blue', 'azul'],
  ['green', 'verde'],
  ['gray', 'gris'],
  ['grey', 'gris'],
  ['net weight', 'peso neto'],
  ['gross weight', 'peso bruto'],
  ['weight', 'peso'],
  ['net', 'neto'],
  ['gross', 'bruto'],
  ['package size', 'tamano del paquete'],
  ['packing size', 'tamano del empaque'],
  ['product size', 'tamano del producto'],
  ['foldable size', 'tamano plegado'],
  ['plegable size', 'tamano plegado'],
  ['wheel size', 'tamano de rueda'],
  ['tire size', 'tamano de llanta'],
  ['speed mode', 'modo de velocidad'],
  ['speed modes', 'modos de velocidad'],
  ['mileage', 'kilometraje'],
  ['max climbing angles', 'angulos maximos de subida'],
  ['climbing angles', 'angulos de subida'],
  ['climbing angle', 'angulo de subida'],
  ['hill climbing', 'subida en pendiente'],
  ['shock absorption', 'amortiguacion'],
  ['shock absorber', 'amortiguador'],
  ['features', 'caracteristicas'],
  ['specifications', 'especificaciones'],
  ['specification', 'especificacion'],
  ['description', 'descripcion'],
  ['details', 'detalles'],
  ['overview', 'resumen'],
  ['package includes', 'el paquete incluye'],
  ['included', 'incluido'],
  ['includes', 'incluye'],
  ['for adults', 'para adultos'],
  ['for city travel', 'para trayectos urbanos'],
  ['for daily commuting', 'para traslados diarios'],
  ['easy to carry', 'facil de transportar'],
  ['portable', 'portatil'],
  ['lightweight', 'ligero'],
  ['durable', 'duradero'],
  ['comfortable', 'comodo'],
  ['safe', 'seguro'],
  ['safety', 'seguridad'],
  ['fast', 'rapido'],
  ['powerful', 'potente'],
  ['high power', 'alta potencia'],
  ['high speed', 'alta velocidad'],
  ['long range', 'gran autonomia'],
  ['inch', 'pulgadas'],
  ['inches', 'pulgadas'],
  ['miles', 'millas'],
  ['mile', 'milla'],
  ['mph', 'mph'],
  ['km/h', 'km/h'],
  ['warranty', 'garantia'],
  ['shipping', 'envio'],
  ['free shipping', 'envio gratis'],
  ['in stock', 'en stock'],
  ['out of stock', 'agotado'],
];

const applyReplacements = (text) => {
  return SPANISH_REPLACEMENTS.reduce((nextText, [source, target]) => {
    const pattern = new RegExp(`\\b${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    return nextText.replace(pattern, target);
  }, text);
};

export const translateProductTextToSpanish = (value) => {
  const raw = String(value ?? '');
  if (!raw.trim()) return value;

  return raw
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith('<') && part.endsWith('>') ? part : applyReplacements(part)))
    .join('');
};

export const translateWooProductDescriptionsToSpanish = (product) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return product;
  }

  const sourceLanguage = String(process.env.NEXT_PUBLIC_WP_DESCRIPTION_SOURCE_LANGUAGE || 'EN').trim().toUpperCase();
  if (sourceLanguage !== 'EN') {
    return product;
  }

  return DESCRIPTION_FIELDS.reduce((translatedProduct, field) => {
    const value = translatedProduct[field];
    if (value === null || value === undefined || value === '') {
      return translatedProduct;
    }

    return {
      ...translatedProduct,
      [field]: translateProductTextToSpanish(value),
    };
  }, product);
};

export const translateWooProductsDescriptionsToSpanish = (products) => {
  if (!Array.isArray(products)) {
    return products;
  }

  return products.map(translateWooProductDescriptionsToSpanish);
};
