# Migration vers Template Uomo Home-10 Sportswear 🏃‍♂️

## Résumé des Changements

Le site Dosalga a été migré du template Beautico (cosmétiques) vers le template Uomo Home-10 (sportswear/lifestyle actif).

## Nouveaux Composants Créés

### Layout
- **HeaderUomo.jsx** - Header moderne avec navigation épurée, icônes d'action, recherche overlay et menu mobile
- **FooterUomo.jsx** - Footer sportswear avec 4 colonnes (Company, Shop, Help, Subscribe), newsletter et liens sociaux
- **MainLayoutUomo.jsx** - Layout principal pour le template Uomo

### Composants Home Page
- **HeroSlider.jsx** - Hero section avec gradient moderne et animation float
- **CategoryBanners.jsx** - Bannières de catégories (Women, Men, Kids) avec hover effects
- **TrendingNow.jsx** - Section produits tendance avec filtres par catégorie
- **UomoStudioCollection.jsx** - Collection mise en avant avec images grande taille
- **BrandsSlider.jsx** - Slider de marques avec animation automatique

## Fichiers Modifiés

### Pages
- **src/pages/index.js** - Page d'accueil remplacée avec le nouveau template
- **src/pages/_app.js** - Mise à jour pour utiliser MainLayoutUomo et nouveau CSS
- **src/pages/index-uomo.js** - Version alternative de la page d'accueil (backup)

### Styles
- **public/assets/css/uomo-style.css** - Nouveau fichier CSS pour le style sportswear moderne

## Fonctionnalités Clés

### Design
- ✅ Style minimaliste et moderne
- ✅ Palette de couleurs noir et blanc épurée
- ✅ Typographie clean et lisible
- ✅ Animations fluides et subtiles
- ✅ Responsive design complet

### Header
- ✅ Logo texte "DOSALGA" stylisé
- ✅ Navigation horizontale avec underline animé
- ✅ Recherche en overlay
- ✅ Icônes account, wishlist, cart
- ✅ Menu mobile hamburger avec slide-in

### Sections Homepage
1. **Hero Slider** - Hero principal avec CTA
2. **Category Banners** - 3 grandes catégories produits
3. **Brands Slider** - Logos marques avec animation scroll
4. **Trending Now** - Grille produits avec filtres
5. **Uomo Studio Collection** - Collection mise en avant
6. **Trending Products (bis)** - Deuxième section produits

### Footer
- ✅ 4 colonnes de navigation
- ✅ Newsletter avec formulaire
- ✅ Liens app stores (iOS/Android)
- ✅ Icônes réseaux sociaux
- ✅ Moyens de paiement
- ✅ Copyright et crédits

## Intégration WooCommerce

Les composants utilisent les hooks existants :
- `useProducts()` - Pour récupérer les produits
- `useCategories()` - Pour les catégories
- Les liens produits pointent vers `/shop/product-details/{id}`

## Structure des Dossiers

```
src/
├── components/
│   └── home-uomo/
│       ├── HeroSlider.jsx
│       ├── CategoryBanners.jsx
│       ├── TrendingNow.jsx
│       ├── UomoStudioCollection.jsx
│       └── BrandsSlider.jsx
├── layout/
│   ├── HeaderUomo.jsx
│   ├── FooterUomo.jsx
│   └── MainLayoutUomo.jsx
└── pages/
    ├── index.js (nouvelle version)
    └── _app.js (modifié)

public/
└── assets/
    └── css/
        └── uomo-style.css (nouveau)
```

## Comment Tester

1. Assurez-vous que toutes les dépendances sont installées :
   ```bash
   npm install
   ```

2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

3. Ouvrez http://localhost:3000 dans votre navigateur

## Fonctionnalités à Venir

- [ ] Page détail produit style Uomo
- [ ] Page shop/catalogue avec filtres sportswear
- [ ] Blog posts avec design moderne
- [ ] Page À propos actualisée
- [ ] Optimisation des images pour sportswear
- [ ] Ajout de vraies images produits sportswear

## Notes Techniques

### Performance
- Tous les composants utilisent CSS-in-JS (styled-jsx) pour un CSS scopé
- Images lazy-loaded par défaut avec Next.js
- Animations CSS optimisées (GPU accelerated)

### Compatibilité
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

### Accessibilité
- Labels ARIA sur tous les boutons d'action
- Navigation au clavier
- Contraste de couleurs optimisé
- Alt text sur toutes les images

## Crédits

- **Template Original** : Uomo NextJS E-commerce
- **Client** : Dosalga
- **Développement** : o7Digital
- **Date de Migration** : Décembre 2024

## Support

Pour toute question ou assistance, contactez l'équipe de développement o7Digital.
