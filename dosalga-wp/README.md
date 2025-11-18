# 🛍️ DOSALGA - Configuration WordPress/WooCommerce

Configuration de l'admin WordPress avec WooCommerce pour le projet DOSALGA.

## 📋 Prérequis

- Docker et Docker Compose installés
- Node.js (v18 ou supérieur)
- npm ou yarn

## 🚀 Installation

### 1. Démarrer WordPress et WooCommerce

Depuis le dossier `dosalga-wp`:

```bash
cd dosalga-wp
docker-compose up -d
```

Cela va démarrer:
- **WordPress** sur http://localhost:8080
- **phpMyAdmin** sur http://localhost:8081
- **MySQL** sur le port 3307

### 2. Configuration initiale de WordPress

1. Accédez à http://localhost:8080
2. Suivez l'assistant d'installation WordPress:
   - Langue: Français
   - Titre du site: DOSALGA
   - Nom d'utilisateur: admin (ou votre choix)
   - Mot de passe: (choisissez un mot de passe fort)
   - Email: votre@email.com

### 3. Installer et configurer WooCommerce

1. Connectez-vous au tableau de bord WordPress
2. Allez dans **Extensions** > **Ajouter**
3. Recherchez "**WooCommerce**" et installez-le
4. Activez WooCommerce
5. Suivez l'assistant de configuration WooCommerce:
   - Type de boutique: votre choix
   - Types de produits: Produits physiques
   - Détails commerciaux: complétez selon vos besoins
   - Configurez les paiements (optionnel pour le dev local)

### 4. Activer l'API REST WooCommerce

1. Dans le tableau de bord WordPress, allez dans **WooCommerce** > **Réglages**
2. Allez dans l'onglet **Avancé** > **REST API**
3. Cliquez sur **Ajouter une clé**
4. Configuration:
   - Description: `DOSALGA Next.js`
   - Utilisateur: sélectionnez votre utilisateur admin
   - Permissions: **Lecture/Écriture**
5. Cliquez sur **Générer la clé API**
6. **Copiez immédiatement** la Consumer Key et la Consumer Secret

### 5. Configuration du frontend Next.js

1. À la racine du projet, copiez le fichier `.env.example`:
```bash
cp .env.example .env.local
```

2. Éditez `.env.local` et ajoutez vos clés WooCommerce:
```env
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
WC_CONSUMER_KEY=ck_votre_clé_ici
WC_CONSUMER_SECRET=cs_votre_secret_ici
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Installez le package WooCommerce REST API:
```bash
npm install @woocommerce/woocommerce-rest-api
```

4. Démarrez le serveur Next.js:
```bash
npm run dev
```

Votre site sera accessible sur http://localhost:3000

## 🔧 Configuration avancée

### Ajouter le code personnalisé WordPress

Le fichier `woocommerce-custom-config.php` contient des configurations personnalisées pour:
- Activer CORS pour l'API REST
- Ajouter des champs personnalisés
- Endpoints personnalisés

**Pour l'utiliser:**

Option 1 - Via un thème:
1. Copiez le contenu de `woocommerce-custom-config.php`
2. Collez-le dans `wordpress/wp-content/themes/votre-theme/functions.php`

Option 2 - Via un plugin (recommandé):
1. Créez un dossier dans `wordpress/wp-content/plugins/dosalga-custom/`
2. Créez un fichier `dosalga-custom.php` avec:
```php
<?php
/**
 * Plugin Name: DOSALGA Custom
 * Description: Configuration personnalisée pour DOSALGA
 * Version: 1.0.0
 */

// Collez ici le contenu de woocommerce-custom-config.php
```
3. Activez le plugin dans WordPress

### Configurer les permaliens

1. Allez dans **Réglages** > **Permaliens**
2. Sélectionnez "**Nom de l'article**"
3. Cliquez sur **Enregistrer les modifications**

## 📦 Utilisation de l'API dans Next.js

### Récupérer les produits

```javascript
import { useProducts } from '@/hooks/useProducts';

function ProductList() {
  const { products, loading, error } = useProducts();
  
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}€</p>
        </div>
      ))}
    </div>
  );
}
```

### Utiliser le panier

```javascript
import { useCart } from '@/hooks/useCart';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <button onClick={() => addToCart(product)}>
      Ajouter au panier
    </button>
  );
}
```

## 🗄️ Gestion de la base de données

### Accéder à phpMyAdmin

- URL: http://localhost:8081
- Serveur: `db`
- Utilisateur: `root`
- Mot de passe: `root_password`

### Sauvegarder la base de données

```bash
docker exec dosalga-mysql mysqldump -u root -proot_password dosalga_wp > backup.sql
```

### Restaurer la base de données

```bash
docker exec -i dosalga-mysql mysql -u root -proot_password dosalga_wp < backup.sql
```

## 🛑 Arrêter les services

```bash
cd dosalga-wp
docker-compose down
```

Pour supprimer également les volumes (données):
```bash
docker-compose down -v
```

## 📝 Commandes utiles

### Voir les logs WordPress
```bash
docker logs dosalga-wordpress -f
```

### Voir les logs MySQL
```bash
docker logs dosalga-mysql -f
```

### Redémarrer les services
```bash
docker-compose restart
```

### Accéder au conteneur WordPress
```bash
docker exec -it dosalga-wordpress bash
```

## 🔗 URLs importantes

- **Frontend Next.js**: http://localhost:3000
- **Admin WordPress**: http://localhost:8080/wp-admin
- **phpMyAdmin**: http://localhost:8081
- **API WooCommerce**: http://localhost:8080/wp-json/wc/v3/

## 🐛 Dépannage

### Erreur de connexion à la base de données
- Vérifiez que les conteneurs sont en cours d'exécution: `docker ps`
- Redémarrez les services: `docker-compose restart`

### Problème de permissions sur les fichiers
```bash
docker exec -it dosalga-wordpress chown -R www-data:www-data /var/www/html
```

### L'API WooCommerce ne fonctionne pas
1. Vérifiez que WooCommerce est installé et activé
2. Vérifiez que vous avez bien généré les clés API
3. Vérifiez que les permaliens sont configurés (voir "Configurer les permaliens")
4. Vérifiez vos variables d'environnement dans `.env.local`

### CORS errors
Assurez-vous que le code personnalisé CORS est activé (voir "Configuration avancée")

## 📚 Ressources

- [Documentation WooCommerce REST API](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Documentation WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Documentation Next.js](https://nextjs.org/docs)

## 🤝 Support

Pour toute question ou problème, consultez:
- Les logs Docker
- La console du navigateur
- Les logs d'erreur WordPress dans `wordpress/wp-content/debug.log`
