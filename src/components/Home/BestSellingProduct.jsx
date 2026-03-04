import React, { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/src/hooks/useProducts';
import ProductCard from '@/src/components/common/ProductCard';

const BestSellingProduct = () => {
  const [displayCount, setDisplayCount] = useState(8);
  
  // Récupérer les produits best-sellers depuis WooCommerce
  const { products, loading, error } = useProducts({
    per_page: 50,
    orderby: 'popularity',
    order: 'desc'
  });

  const loadMore = () => {
    setDisplayCount(prev => prev + 8);
  };

  const displayedProducts = products.slice(0, displayCount);
  const hasMore = displayCount < products.length;

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
                  displayedProducts.map((product, index) => (
                    <div key={product.id} className="col-lg-3 col-md-6">
                      <ProductCard 
                        product={product} 
                        showCountdown={index === 0} 
                      />
                    </div>
                  ))
                )}
              </div>
              
              {/* Bouton View More Products */}
              {hasMore && (
                <div className="row mt-5">
                  <div className="col-12 text-center">
                    <button 
                      onClick={loadMore}
                      className="primary-btn1 hover-btn3"
                      style={{ border: 'none', cursor: 'pointer' }}
                    >
                      View More Products
                      <svg width={15} height={15} viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 7.5H13.5M13.5 7.5L7.5 1.5M13.5 7.5L7.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default BestSellingProduct;
