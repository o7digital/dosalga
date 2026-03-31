import React from 'react';
import { useProducts } from '@/src/hooks/useProducts';
import ProductCard from '@/src/components/common/ProductCard';

const BestSellingProduct = () => {
  // Récupérer les produits best-sellers depuis WooCommerce
  const { products, loading, error } = useProducts({
    all: true,
    orderby: 'popularity',
    order: 'desc'
  });

  return (
    <>
      <div className="best-selling-section mb-110">
        <div className="container">
          <div className="section-title2">
            <h3>Best Selling Product</h3>
          </div>

          {/* Afficher un loader pendant le chargement */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          )}

          {/* Afficher une erreur si nécessaire */}
          {error && (
            <div className="alert alert-danger" role="alert">
              Erreur: {error}
            </div>
          )}

          {/* Afficher les produits WooCommerce */}
          {!loading && !error && (
            <>
              <div className="row gy-4">
                {products.length === 0 ? (
                  <div className="col-12 text-center py-5">
                    <p>Aucun produit disponible pour le moment.</p>
                  </div>
                ) : (
                  products.map((product, index) => (
                    <div key={product.id} className="col-lg-3 col-md-6">
                      <ProductCard 
                        product={product} 
                        showCountdown={index === 0} 
                      />
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BestSellingProduct;
