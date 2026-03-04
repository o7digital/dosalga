# Script d'arrêt pour DOSALGA WooCommerce
# Usage: ./stop.sh

#!/bin/bash

echo "🛑 Arrêt de DOSALGA WordPress/WooCommerce..."

cd dosalga-wp
docker-compose down

echo "✅ Tous les services ont été arrêtés"
echo ""
echo "💡 Pour supprimer également les données, utilisez:"
echo "   cd dosalga-wp && docker-compose down -v"
