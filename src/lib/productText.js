const DESCRIPTION_FIELDS = ['description', 'short_description'];
const TEXT_FIELDS = ['name', ...DESCRIPTION_FIELDS];
const CATEGORY_NAME_ENGLISH_OVERRIDES = {
  bags: 'Bags',
  bikes: 'Bikes',
  briefcase: 'Briefcases',
  caps: 'Caps',
  corbatas: 'Ties',
  electronics: 'Electronics',
  garden: 'Garden',
  hats: 'Hats',
  'men-jacket': "Men's Jackets",
  'men-sweater': "Men's Sweaters",
  'mens-shoes': "Men's Shoes",
  'mens-tshirts': "Men's T-Shirts",
  scooters: 'Scooters',
  shoes: 'Shoes',
  'travel-bags': 'Travel Bags',
  watches: 'Watches',
  'womens-sportswear': "Women's Sportswear",
  'womens-swimsuit': "Women's Swimwear",
  'womens-jackets': "Women's Jackets",
  'womens-leggings': "Women's Leggings",
};
const CATEGORY_NAME_OVERRIDES = {
  bags: 'Bolsos',
  bikes: 'Bicicletas',
  briefcase: 'Maletines',
  caps: 'Gorras',
  corbatas: 'Corbatas',
  electronics: 'Electrónica',
  garden: 'Jardín',
  hats: 'Sombreros',
  'men-jacket': 'Chaquetas para hombre',
  'men-sweater': 'Suéteres para hombre',
  'mens-shoes': 'Calzado para hombre',
  'mens-tshirts': 'Camisetas para hombre',
  'men sweater': 'Sueteres para hombre',
  'mens sweater': 'Sueteres para hombre',
  "men's sweater": 'Sueteres para hombre',
  'mens tshirts': 'Camisetas para hombre',
  'mens t-shirts': 'Camisetas para hombre',
  scooters: 'Scooters',
  shoes: 'Zapatos',
  'travel bags': 'Bolsos de viaje',
  'travel-bags': 'Bolsos de viaje',
  watches: 'Relojes',
  'womens-sportswear': 'Ropa deportiva para mujer',
  'womens-swimsuit': 'Trajes de baño para mujer',
  'womens-jackets': 'Chaquetas para mujer',
  'womens-leggings': 'Leggings para mujer',
  'womens jackets': 'Chaquetas para mujer',
  "women's jackets": 'Chaquetas para mujer',
};

const PRODUCT_NAME_OVERRIDES = {
  'printed pink conjoined lady maternity swimsuit swimsuit': 'Traje de baño premamá rosa estampado de una pieza',
  'printed one piece conservative surf swimsuit smalllong': 'Traje de baño conservador estampado de una pieza para surf',
  "women's large one piece swimsuit": 'Traje de baño de una pieza para mujer talla grande',
  'solid cross back swimsuit one piece backless swimwear': 'Traje de baño de una pieza con espalda cruzada y descubierta',
  "women's one piece boxer swimsuit small breasts gather to cover the belly": 'Traje de baño tipo bóxer de una pieza con control abdominal para mujer',
  'one-piece halterneck all-in-one bikini print': 'Bikini estampado de una pieza con cuello halter',
  'muslim flower print ladies conservative swimsuit': 'Traje de baño conservador con estampado floral para mujer',
  'mesh one-piece swimsuit ladies': 'Traje de baño de una pieza con malla para mujer',
  "women's sports one piece swimsuit conservative color blocking europe and america": 'Traje de baño deportivo conservador de una pieza con bloques de color',
  'bikini beach vacation bottoming jumpsuit low cut': 'Mono de playa tipo bikini con escote pronunciado',
  'women control one piece swimsuits retro bathing suit halter swimwear': 'Traje de baño retro de una pieza con control y cuello halter',
  "women's fashion casual bikini one piece swimsuit": 'Bikini casual de moda de una pieza para mujer',
  'pearl spaghetti straps one-piece swimsuit slimming women': 'Traje de baño moldeador de una pieza con tirantes finos y perlas',
  'one piece bikini with metal chain and shoulder strap': 'Bikini de una pieza con cadena metálica y tirante',
  'triangle sexy swimsuit': 'Traje de baño triangular',
  "women's bikini swimsuit": 'Bikini para mujer',
  'one piece swimsuit bikini covering belly thin': 'Traje de baño de una pieza con cobertura abdominal',
  'european and american one-piece swimsuit lily one-piece': 'Traje de baño europeo y americano de una pieza estilo lirio',
  'swimsuit parent-child bikini one-piece bikini': 'Bikini familiar de una pieza',
  'printed one-piece loose plus size comfort swimsuit': 'Traje de baño holgado estampado de una pieza en talla grande',
  'new zipper one piece swimsuit europe and america': 'Traje de baño nuevo de una pieza con cierre',
  'maternity swimwear solid color pull-edge new hot sale bikini': 'Bikini premamá liso con ribete',
  'ladies long sleeve panel conservative swimwear': 'Traje de baño conservador de manga larga con paneles',
  "women's solid color v-neck sling one piece swimsuit": 'Traje de baño liso de una pieza con escote en V y tirantes',
};

const SPANISH_PRODUCT_OVERRIDES = {
  33045: ['Gorra de béisbol transpirable, versátil y moderna para hombre', 'Gorra ligera y transpirable de color liso, adecuada para primavera, uso diario y actividades al aire libre.'],
  33028: ['Gorra de béisbol vintage lavada con letra bordada en relieve', 'Gorra ajustable de estilo vintage con acabado lavado, bordado en relieve y diseño cómodo para deportes y viajes.'],
  33008: ['Gorra de béisbol vintage ajustable con letra bordada en relieve', 'Gorra lavable y ajustable con efecto desgastado y bordado tridimensional, pensada para paseos, compras y actividades deportivas.'],
  32983: ['Gorra de béisbol ligera de malla transpirable para primavera y verano', 'Gorra ajustable de algodón y poliéster con malla transpirable, acabado lavado y protección solar.'],
  32962: ['Gorra unisex ligera de secado rápido con ventilación y protección solar', 'Gorra de visera corta con tejido ligero, cordón ajustable y ventilación para salidas y actividades al aire libre.'],
  32954: ['Gorra de béisbol ajustable bordada «One Nation Under God»', 'Gorra unisex de algodón y poliéster con bordado frontal, cierre ajustable y diseño para uso diario.'],
  32942: ['Gorra de béisbol de algodón lavado con estampado azul marino', 'Gorra transpirable y ajustable de algodón lavado, con estilo retro y contorno adaptable.'],
  32924: ['Gorra de béisbol ajustable con bandera nacional bordada', 'Gorra de visera suave con acabado lavado y bordado de bandera, adecuada para celebraciones y actividades cotidianas al aire libre.'],
  32897: ['Gorra hip-hop de ala ancha y color liso para hombre', 'Gorra ajustable de estilo urbano con ala ancha, acabado plateado y cierre trasero a presión.'],
  32880: ['Conjunto de sombrero y máscara con protección solar para senderismo', 'Conjunto de dos piezas en poliéster para senderismo y montañismo, con cobertura solar para cabeza y rostro.'],
  32861: ['Gorra de béisbol minimalista de color liso estilo coreano', 'Gorra unisex de algodón con bordado discreto, contorno ajustable y diseño versátil.'],
  32836: ['Gorra de béisbol térmica con forro polar para invierno', 'Gorra ajustable con forro cálido de piel de oveja sintética, adecuada para los meses fríos.'],
  32824: ['Juego de 2 gorras vintage bordadas de Texas', 'Dos gorras ajustables de algodón lavado con bordado de Texas y diseño unisex de estilo vintage.'],
  32804: ['Gorra de béisbol ligera y ajustable con letras bordadas', 'Gorra de secado rápido con protección solar, ideal para deporte, trayectos diarios y actividades casuales al aire libre.'],
  32790: ['Gorra de béisbol ajustable con bordado para actividades al aire libre', 'Gorra moderna con letras y detalles bordados, diseñada para proteger del sol durante senderismo, pesca y excursiones.'],
  32781: ['Gorra vintage bordada «Dad Veteran Hero Legend»', 'Gorra de algodón lavado con perfil bajo, cierre ajustable y bordado patriótico para veteranos.'],
  32771: ['Gorra de camionero bordada «PAPA» para hombre', 'Gorra ajustable de algodón lavado con bordado «PAPA», pensada como regalo para el Día del Padre.'],
  32761: ['Gorra vintage bordada «Football Dad»', 'Gorra de algodón lavado, estructura flexible y ajuste trasero, ideal como regalo para aficionados al fútbol americano.'],
  32739: ['Gorra de béisbol de malla transpirable con diseño patchwork', 'Gorra ligera de copa suave con paneles de malla, adecuada para viajes, paseos y actividades al aire libre.'],
  32722: ['Gorra de béisbol de camuflaje con bandera nacional', 'Gorra casual de copa suave con estampado de camuflaje, bandera bordada y estilo inspirado en los camioneros.'],
  32709: ['Gorra de béisbol multicolor con oso bordado', 'Gorra ligera de poliéster con oso bordado y secado rápido para uso diario y actividades al aire libre.'],
  32699: ['Gorra ajustable con letra C bordada para golf', 'Gorra redonda de poliéster con bordado en relieve, protección solar y ajuste trasero para golf y deporte.'],
  32676: ['Gorra de béisbol casual transpirable y de secado rápido', 'Gorra unisex ajustable con letras bordadas, diseñada para primavera, verano y otoño.'],
  32663: ['Gorra visera con águila bordada y estampado digital', 'Gorra de algodón con águila bordada, estilo retro y talla ajustable para uso diario.'],
  32646: ['Gorra de béisbol bordada con protección solar para hombre', 'Gorra de poliéster con bordado a máquina, copa redonda y ajuste cómodo para exteriores.'],
  32631: ['Gorra moderna de color liso con letras bordadas', 'Gorra de algodón con copa redonda, visera enrollada y letras bordadas para el verano.'],
  32622: ['Gorra de béisbol con bandera de México para mujer y hombre', 'Gorra unisex de algodón con la bandera de México, ajustable y adecuada como regalo patriótico.'],
  32611: ['Gorra de béisbol de algodón bordada con bandera de Israel', 'Gorra unisex ajustable con bandera y nombre de Israel bordados en la parte frontal.'],
  32597: ['Gorra de béisbol de malla transpirable en rojo y azul', 'Gorra ajustable de algodón espacial y poliéster, transpirable y resistente al viento.'],
  32581: ['Gorra de béisbol de secado rápido con protección solar', 'Gorra ligera de poliéster con copa alta, ventilación y protección solar para primavera, verano y otoño.'],
  32560: ['Gorra de béisbol de algodón personalizable y estampada', 'Gorra ajustable de algodón disponible en varios colores, apta para estampado y bordado personalizado.'],
  32541: ['Gorra de béisbol para hombre con contorno amplio', 'Gorra de algodón ajustable para cabezas grandes, con diseño transpirable y protección solar.'],
  32530: ['Gorra de pesca con visera alargada y protección solar', 'Gorra de algodón con visera larga, ajuste trasero y ventilación para pesca y actividades al aire libre.'],
  32494: ['Gorra de pana versátil con visera para hombre', 'Gorra de algodón tipo pana, disponible en varios colores y fácil de combinar con ropa casual.'],
  32481: ['Gorra de béisbol de algodón lavado con calabaza bordada', 'Gorra unisex de Halloween con calabaza sonriente bordada, copa redonda y talla ajustable.'],
  32468: ['Casco protector acolchado para fútbol, rugby, patinaje y snowboard', 'Protección acolchada para la cabeza indicada para deportes de contacto, ciclismo, patinaje y actividades en nieve.'],
  32460: ['Gorra con cereza bordada y protección solar para exterior', 'Gorra ajustable de algodón con cereza bordada, transpirable y adecuada para viajes y uso diario.'],
  32447: ['Gorra de béisbol de algodón lavado con fantasma bordado', 'Gorra ajustable y transpirable con diseño de fantasma bordado, apta para las cuatro estaciones.'],
  32401: ['Gorra de béisbol de verano con tiburón bordado', 'Gorra de algodón con bordado de tiburón, talla ajustable y amplia variedad de colores.'],
  32378: ['Gorra de béisbol vintage lavada y desgastada con astronauta', 'Gorra ajustable de estilo retro con efecto lavado, detalles desgastados y bordado de astronauta.'],
  32371: ['Gorra retro lavada con letras de Tokio', 'Gorra de algodón con bordado de Tokio, acabado lavado y ajuste trasero para un estilo casual.'],
  32354: ['Gorra de camuflaje con malla y bordado para hombre', 'Gorra ajustable de algodón con malla transpirable, estampado de camuflaje y letras bordadas.'],
  32322: ['Gorra de béisbol de algodón con huella de perro bordada', 'Gorra ajustable de algodón con copa suave y bordado de huella, disponible en varios colores.'],
  32188: ['Gorra retro de visera corta para mujer y hombre', 'Gorra unisex de poliéster con visera corta, bordado discreto y contorno ajustable.'],
  32333: ['Sombrero de ala ancha con protección solar para hombre', 'Sombrero transpirable de poliéster con ala ancha y contorno ajustable para el verano.'],
  32305: ['Sombrero tipo bucket de algodón vintage con protección solar', 'Sombrero de algodón de estilo utilitario, con ala protectora y talla adaptable para hombre.'],
  32284: ['Sombrero transpirable anti-UV con protección de cuello para hombre', 'Sombrero de poliéster con cubrenuca, protección solar y diseño transpirable para senderismo y pesca.'],
  32261: ['Sombrero tipo bucket con máscara para montañismo, camping y pesca', 'Conjunto de sombrero y máscara de algodón para actividades al aire libre en otoño e invierno.'],
  32228: ['Sombrero tipo bucket de ala ancha con protección facial y solar', 'Sombrero ajustable de nailon con ala ancha y cobertura de rostro para montañismo y actividades de verano.'],
};

const decodeProductNameEntities = (value) => String(value ?? '')
  .replace(/&(?:amp;)?nbsp;/gi, ' ')
  .replace(/&#0*39;|&apos;/gi, "'")
  .replace(/&#8216;|&#8217;|&lsquo;|&rsquo;/gi, '’')
  .replace(/&#8211;|&ndash;/gi, '–')
  .replace(/&#8212;|&mdash;/gi, '—')
  .replace(/&quot;/gi, '"')
  .replace(/&amp;/gi, '&')
  .replace(/\s+/g, ' ')
  .trim();

const SPANISH_REPLACEMENTS = [
  ['asian sizes are 1 to 2 sizes smaller than european and american people', 'las tallas asiaticas son de 1 a 2 tallas menores que las europeas y americanas'],
  ['choose the larger size if your size between two sizes', 'elige la talla mayor si estas entre dos tallas'],
  ['please allow 2-3cm differences due to manual measurement', 'considera una diferencia de 2 a 3 cm debido a la medicion manual'],
  ['please check the size chart carefully before you buy the item', 'consulta cuidadosamente la tabla de tallas antes de comprar'],
  ["if you don't know how to choose size", 'si no sabes que talla elegir'],
  ['please contact our customer service', 'contacta a nuestro servicio al cliente'],
  ['the different computers display colors differently', 'las pantallas pueden mostrar los colores de manera diferente'],
  ['different computers display colors differently', 'las pantallas pueden mostrar los colores de manera diferente'],
  ['the color of the actual item may vary slightly from the following images', 'el color real del articulo puede variar ligeramente respecto a las imagenes'],
  ['fabric composition content', 'contenido de la composicion del tejido'],
  ['lining composition content', 'contenido de la composicion del forro'],
  ['fabric composition', 'composicion del tejido'],
  ['lining composition', 'composicion del forro'],
  ['fabric name', 'tejido'],
  ['lining name', 'forro'],
  ['as you know', 'como sabes'],
  ['one piece', 'una pieza'],
  ['one-piece', 'una pieza'],
  ['swimsuits', 'trajes de baño'],
  ['swimsuit', 'traje de baño'],
  ['swimwear', 'ropa de baño'],
  ['bathing suit', 'traje de baño'],
  ['maternity', 'premamá'],
  ['backless', 'espalda descubierta'],
  ['halter neck', 'cuello halter'],
  ['halterneck', 'cuello halter'],
  ['spandex', 'elastano'],
  ['cross-border', 'importacion'],
  ['briefcases', 'maletines'],
  ['briefcase', 'maletin'],
  ['electronics', 'electronica'],
  ['electronic', 'electronico'],
  ['garden', 'jardin'],
  ['men sweater', 'sueter para hombre'],
  ['mens sweater', 'sueter para hombre'],
  ["men's sweater", 'sueter para hombre'],
  ['sweaters', 'sueteres'],
  ['sweater', 'sueter'],
  ['travel bags', 'bolsos de viaje'],
  ['travel bag', 'bolso de viaje'],
  ['womens jackets', 'chaquetas para mujer'],
  ["women's jackets", 'chaquetas para mujer'],
  ['watches', 'relojes'],
  ['watch', 'reloj'],
  ['scooters', 'scooters'],
  ['scooter', 'scooter'],
  ['shoes', 'zapatos'],
  ['shoe', 'zapato'],
  ['mens business', 'hombre ejecutivo'],
  ["men's business", 'hombre ejecutivo'],
  ['business large-capacity', 'ejecutivo de gran capacidad'],
  ['large-capacity', 'gran capacidad'],
  ['shouldercrossbody', 'de hombro y cruzado'],
  ['shoulder crossbody', 'de hombro y cruzado'],
  ['crossbody', 'cruzado'],
  ['simple briefcase', 'maletin sencillo'],
  ['laptop bag', 'bolsa para laptop'],
  ['bags', 'bolsos'],
  ['bag', 'bolso'],
  ['laptop', 'laptop'],
  ['computer', 'computadora'],
  ['messenger bag', 'bolso mensajero'],
  ['handbag', 'bolso de mano'],
  ['cowhide', 'cuero vacuno'],
  ['oily leather', 'cuero engrasado'],
  ['leather', 'cuero'],
  ['first layer', 'primera capa'],
  ['high-end', 'alta gama'],
  ['high end', 'alta gama'],
  ['wide-width', 'ancho'],
  ['wide width', 'ancho'],
  ['vintage style', 'estilo vintage'],
  ['shoulder liner', 'forro de hombro'],
  ['shoulder', 'hombro'],
  ['portable', 'portatil'],
  ['clutch casual business', 'bolso clutch casual ejecutivo'],
  ['clutch large', 'clutch grande'],
  ['clutch', 'bolso clutch'],
  ['casual business', 'casual ejecutivo'],
  ['shoulder bag', 'bolso de hombro'],
  ['polyester jacquard', 'jacquard de poliester'],
  ['polyester', 'poliester'],
  ['yarn-dyed', 'tenido en hilo'],
  ['yarn dyed', 'tenido en hilo'],
  ['direct-supply', 'venta directa'],
  ['direct supply', 'venta directa'],
  ['jacquard', 'jacquard'],
  ['striped tie', 'corbata a rayas'],
  ['tie', 'corbata'],
  ['formal', 'formal'],
  ['sportswear fitness', 'ropa deportiva fitness'],
  ['sportswear', 'ropa deportiva'],
  ['fitness', 'fitness'],
  ['short-sleeve', 'manga corta'],
  ['short sleeve', 'manga corta'],
  ['t-shirt', 'camiseta'],
  ['tshirt', 'camiseta'],
  ['mesh-textured', 'textura de malla'],
  ['mesh textured', 'textura de malla'],
  ['breathable mesh', 'malla transpirable'],
  ['breathable', 'transpirable'],
  ['patchwork design', 'diseno patchwork'],
  ['patchwork', 'patchwork'],
  ['summer mens wear', 'ropa de verano para hombre'],
  ["summer men's wear", 'ropa de verano para hombre'],
  ['mens wear', 'ropa para hombre'],
  ["men's wear", 'ropa para hombre'],
  ['mens tshirts', 'camisetas para hombre'],
  ["men's tshirts", 'camisetas para hombre'],
  ['mens t-shirts', 'camisetas para hombre'],
  ["men's t-shirts", 'camisetas para hombre'],
  ['mens', 'hombre'],
  ["men's", 'hombre'],
  ['men', 'hombre'],
  ['summer', 'verano'],
  ['business', 'ejecutivo'],
  ['capacity', 'capacidad'],
  ['large', 'grande'],
  ['small', 'pequeno'],
  ['new', 'nuevo'],
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
  ['brown', 'marron'],
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
  ['for', 'para'],
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
  const raw = String(value ?? '').replace(/&(?:amp;)?nbsp;/gi, ' ');
  if (!raw.trim()) return value;

  return raw
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith('<') && part.endsWith('>') ? part : applyReplacements(part)))
    .join('');
};

export const translateProductNameToSpanish = (value) => {
  const raw = decodeProductNameEntities(value);
  if (!raw) return value;

  const override = PRODUCT_NAME_OVERRIDES[raw.toLowerCase()];
  const translated = override || translateProductTextToSpanish(raw);
  return translated.charAt(0).toUpperCase() + translated.slice(1);
};

const getCategoryKey = (category) => String(category?.slug || category?.name || '').trim().toLowerCase();

export const normalizeCategoryToEnglish = (category) => {
  if (!category || typeof category !== 'object' || !category.name) {
    return category;
  }

  return {
    ...category,
    name: CATEGORY_NAME_ENGLISH_OVERRIDES[getCategoryKey(category)] || category.name,
  };
};

export const normalizeCategoriesToEnglish = (categories) => {
  return Array.isArray(categories) ? categories.map(normalizeCategoryToEnglish) : categories;
};

export const translateCategoryToSpanish = (category) => {
  if (!category || typeof category !== 'object' || !category.name) {
    return category;
  }

  const override = CATEGORY_NAME_OVERRIDES[getCategoryKey(category)]
    || CATEGORY_NAME_OVERRIDES[String(category.name).trim().toLowerCase()];

  return {
    ...category,
    name: override || translateProductTextToSpanish(category.name),
  };
};

export const translateCategoriesToSpanish = (categories) => {
  if (!Array.isArray(categories)) {
    return categories;
  }

  return categories.map(translateCategoryToSpanish);
};

export const translateWooProductTextToSpanish = (product) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return product;
  }

  const sourceLanguage = String(process.env.NEXT_PUBLIC_WP_DESCRIPTION_SOURCE_LANGUAGE || 'EN').trim().toUpperCase();
  if (sourceLanguage !== 'EN') {
    return product;
  }

  const translatedProduct = TEXT_FIELDS.reduce((nextProduct, field) => {
    const value = nextProduct[field];
    if (value === null || value === undefined || value === '') {
      return nextProduct;
    }

    return {
      ...nextProduct,
      [field]: field === 'name'
        ? translateProductNameToSpanish(value)
        : translateProductTextToSpanish(value),
    };
  }, product);

  const productOverride = SPANISH_PRODUCT_OVERRIDES[Number(product.id)];

  return {
    ...translatedProduct,
    ...(productOverride ? {
      name: productOverride[0],
      short_description: `<p>${productOverride[1]}</p>`,
      description: `<p>${productOverride[1]}</p>`,
    } : {}),
    categories: translateCategoriesToSpanish(translatedProduct.categories),
  };
};

export const translateWooProductDescriptionsToSpanish = translateWooProductTextToSpanish;

export const translateWooProductsTextToSpanish = (products) => {
  if (!Array.isArray(products)) {
    return products;
  }

  return products.map(translateWooProductTextToSpanish);
};

export const translateWooProductsDescriptionsToSpanish = (products) => {
  if (!Array.isArray(products)) {
    return products;
  }

  return products.map(translateWooProductTextToSpanish);
};

export const normalizeWooProductTextToEnglish = (product) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    return product;
  }

  return {
    ...product,
    name: decodeProductNameEntities(product.name),
    categories: normalizeCategoriesToEnglish(product.categories),
  };
};

export const normalizeWooProductsTextToEnglish = (products) => {
  return Array.isArray(products) ? products.map(normalizeWooProductTextToEnglish) : products;
};

export const translateWooProductDescriptionsFieldsToSpanish = (product) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
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
