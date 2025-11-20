#!/bin/bash

# Script de démarrage rapide pour DOSALGA
# Ce script démarre le projet Next.js

echo "🚀 Démarrage de DOSALGA..."
echo ""

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier si .env.local existe
if [ ! -f ".env.local" ]; then
    echo "⚠️  ATTENTION: Fichier .env.local manquant!"
    echo "📝 Copie du fichier .env.example..."
    cp .env.example .env.local
    echo "✏️  Veuillez éditer .env.local avec vos clés API WooCommerce"
    exit 1
fi

# Test de connexion WooCommerce
echo "🧪 Test de connexion WooCommerce..."
node test-woocommerce.js

echo ""
echo "✅ Tout est prêt!"
echo ""
echo "🌐 Démarrage du serveur..."
npm run dev
