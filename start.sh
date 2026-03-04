# Script de démarrage rapide pour DOSALGA WooCommerce
# Usage: ./start.sh

#!/bin/bash

echo "🚀 Démarrage de DOSALGA WordPress/WooCommerce..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker Desktop."
    exit 1
fi

# Démarrer les conteneurs Docker
echo "📦 Démarrage des conteneurs Docker..."
cd dosalga-wp
docker-compose up -d

# Attendre que les services démarrent
echo "⏳ Attente du démarrage des services..."
sleep 10

# Vérifier que les conteneurs sont en cours d'exécution
if docker ps | grep -q "dosalga-wordpress"; then
    echo "✅ WordPress est en cours d'exécution sur http://localhost:8080"
else
    echo "❌ Erreur: WordPress n'a pas démarré correctement"
    exit 1
fi

if docker ps | grep -q "dosalga-mysql"; then
    echo "✅ MySQL est en cours d'exécution"
else
    echo "❌ Erreur: MySQL n'a pas démarré correctement"
    exit 1
fi

if docker ps | grep -q "dosalga-phpmyadmin"; then
    echo "✅ phpMyAdmin est en cours d'exécution sur http://localhost:8081"
else
    echo "❌ Erreur: phpMyAdmin n'a pas démarré correctement"
    exit 1
fi

echo ""
echo "🎉 Tous les services sont démarrés!"
echo ""
echo "📋 Prochaines étapes:"
echo "1. Accédez à http://localhost:8080 pour configurer WordPress"
echo "2. Installez et activez WooCommerce"
echo "3. Générez les clés API WooCommerce"
echo "4. Configurez .env.local avec vos clés"
echo "5. Lancez 'npm run dev' pour démarrer Next.js"
echo ""
echo "📚 Consultez dosalga-wp/README.md pour plus de détails"
