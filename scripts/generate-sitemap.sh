#!/bin/bash

# Script pour générer le sitemap.xml depuis l'API
# À exécuter avant le build de production

echo "🔄 Génération du sitemap depuis WooCommerce..."

# Appeler l'API de génération de sitemap
curl -s http://localhost:3000/api/sitemap > public/sitemap.xml

if [ $? -eq 0 ]; then
  echo "✅ Sitemap généré avec succès dans public/sitemap.xml"
else
  echo "❌ Erreur lors de la génération du sitemap"
  exit 1
fi
