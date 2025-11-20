# 🛍️ Intégration WooCommerce - DOSALGA

## ✅ Configuration Complète

### 📋 Ce qui a été fait

1. **Routes API Next.js** (`/src/pages/api/`)
   - `/api/products` - Liste des produits avec filtres
   - `/api/products/[id]` - Détails d'un produit
   - `/api/categories` - Liste des catégories
   - `/api/orders/create` - Création de commandes

2. **Hooks React**
   - `useProducts()` - Récupérer des produits
   - `useProduct(id)` - Récupérer un produit spécifique
   - `useProductSearch()` - Rechercher des produits
   - `useCategories()` - Récupérer les catégories
   - `useCart()` - Gérer le panier (avec contexte)

3. **Composants**
   - `ProductCard` - Affichage universel des produits
   - `BestSellingProduct` - Maintenant connecté à WooCommerce
   - Page produit dynamique `/shop/product/[id]`

4. **Context & State Management**
   - `CartContext` - Gestion globale du panier
   - Persistence localStorage
   - Création de commandes WooCommerce

---

## 🚀 Démarrage Rapide

### 1. Vérifier les variables d'environnement

Fichier `.env.local` :
```env
NEXT_PUBLIC_WORDPRESS_URL=https://oliviers44.sg-host.com
WC_CONSUMER_KEY=ck_962f8b4455545de9a9a6155616535fdf8d9eb1db
WC_CONSUMER_SECRET=cs_4242ab75e9fb88408afd2961efb76b7ce9211bc9
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Tester la connexion WooCommerce

```bash
node test-woocommerce.js
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera disponible sur `http://localhost:3000`

---

## 📖 Utilisation

### Afficher des produits dans un composant

```jsx
import { useProducts } from '@/src/hooks/useProducts';
import ProductCard from '@/src/components/common/ProductCard';

function MyComponent() {
  const { products, loading, error } = useProducts({
    per_page: 12,
    orderby: 'popularity',
    on_sale: true  // Optionnel: produits en promo
  });

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="row">
      {products.map(product => (
        <div key={product.id} className="col-lg-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
```

### Utiliser le panier

```jsx
import { useCart } from '@/src/hooks/useCart';

function AddToCartButton({ product }) {
  const { addToCart, getCartItemsCount } = useCart();

  return (
    <>
      <button onClick={() => addToCart(product, 1)}>
        Ajouter au panier
      </button>
      <span>Panier: {getCartItemsCount()} articles</span>
    </>
  );
}
```

### Créer une commande

```jsx
import { useCart } from '@/src/hooks/useCart';

function CheckoutPage() {
  const { createOrder, cart, getCartTotal } = useCart();

  const handleCheckout = async () => {
    const billingInfo = {
      first_name: 'Jean',
      last_name: 'Dupont',
      address_1: '123 rue de Paris',
      city: 'Paris',
      postcode: '75001',
      country: 'FR',
      email: 'jean@example.com',
      phone: '0123456789'
    };

    try {
      const order = await createOrder(billingInfo);
      alert(`Commande créée! ID: ${order.id}`);
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Total: {getCartTotal().toFixed(2)}€</h2>
      <button onClick={handleCheckout}>Commander</button>
    </div>
  );
}
```

---

## 🔧 Paramètres disponibles

### Routes API

#### `/api/products`
Paramètres GET:
- `page` - Numéro de page (défaut: 1)
- `per_page` - Produits par page (défaut: 10)
- `category` - ID de catégorie
- `search` - Terme de recherche
- `orderby` - Tri (date, popularity, price, rating)
- `order` - Ordre (asc, desc)
- `on_sale` - true/false pour les promotions
- `featured` - true/false pour les produits mis en avant

#### `/api/products/[id]`
Récupère un produit avec ses variations si applicable.

#### `/api/categories`
Paramètres GET:
- `per_page` - Catégories par page (défaut: 100)
- `hide_empty` - Cacher les catégories vides (défaut: true)

#### `/api/orders/create`
POST avec body JSON:
```json
{
  "billing": {
    "first_name": "...",
    "last_name": "...",
    "address_1": "...",
    "city": "...",
    "postcode": "...",
    "country": "...",
    "email": "...",
    "phone": "..."
  },
  "line_items": [
    {
      "product_id": 123,
      "quantity": 2
    }
  ]
}
```

---

## 🎨 Composants à mettre à jour

Pour connecter les autres sections du site à WooCommerce, utilisez le même pattern:

### NewestProduct, ExclusiveProduct, etc.

```jsx
import { useProducts } from '@/src/hooks/useProducts';
import ProductCard from '@/src/components/common/ProductCard';

const NewestProduct = () => {
  const { products, loading, error } = useProducts({
    per_page: 8,
    orderby: 'date',
    order: 'desc'
  });

  // ... rest du composant
};
```

### Page Shop avec filtres

```jsx
const ShopPage = () => {
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    orderby: 'date'
  });

  const { products, loading, error, refetch } = useProducts(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    refetch(newFilters);
  };

  // ...
};
```

---

## 📝 Prochaines étapes suggérées

1. **Mettre à jour les autres composants produits:**
   - `NewestProduct`
   - `ExclusiveProduct`
   - `SpecialOffer`
   - Pages shop (left-sidebar, right-sidebar, etc.)

2. **Implémenter la recherche:**
   - Utiliser `useProductSearch` dans le header
   - Créer une page de résultats de recherche

3. **Ajouter les catégories:**
   - Menu de navigation dynamique
   - Page catégorie `/category/[slug]`

4. **Améliorer le panier:**
   - Page panier complète avec mise à jour quantités
   - Mini-panier dans le header
   - Boutons "Ajouter au panier" fonctionnels

5. **Page checkout:**
   - Formulaire de paiement complet
   - Intégration moyens de paiement (Stripe, PayPal)
   - Page de confirmation

6. **Optimisations:**
   - Images optimisées avec Next.js Image
   - Cache des produits
   - Pagination infinie ou traditionnelle
   - Filtres de prix, couleur, taille

---

## 🐛 Dépannage

### Les produits ne s'affichent pas
1. Vérifier que WooCommerce a des produits publiés
2. Tester avec `node test-woocommerce.js`
3. Vérifier les clés API dans `.env.local`

### Erreur CORS
Les clés API doivent être côté serveur uniquement (routes `/api/`), jamais côté client.

### Images manquantes
Ajouter une image placeholder dans `/public/assets/img/placeholder.png`

---

## 📚 Documentation

- [WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [React Context](https://react.dev/reference/react/useContext)

---

## ✨ Fonctionnalités implémentées

- ✅ Connexion WooCommerce
- ✅ Affichage des produits
- ✅ Détails produit
- ✅ Gestion du panier
- ✅ Création de commandes
- ✅ Recherche de produits
- ✅ Filtres et tri
- ✅ Support variations produits
- ✅ Gestion stock
- ✅ Promotions et badges

## 🚧 À compléter

- ⏳ Authentification utilisateur
- ⏳ Page compte client
- ⏳ Historique des commandes
- ⏳ Wishlist persistante
- ⏳ Comparateur de produits
- ⏳ Avis clients
- ⏳ Paiement en ligne

---

Bon développement ! 🎉
