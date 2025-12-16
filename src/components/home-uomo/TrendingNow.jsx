import React from 'react';
import Link from 'next/link';
import { useProducts } from '../../hooks/useProducts';
import { useRouter } from 'next/router';

const TrendingNow = () => {
    const { products, loading, error } = useProducts({ limit: 8 });
    const { pathname } = useRouter();
    const isSpanish = pathname.startsWith('/es');

    const categories = isSpanish
        ? [
            { id: 'all', name: 'Todos', active: true },
            { id: 'sportwear', name: 'Sportwear' },
            { id: 'running', name: 'Running' }
        ]
        : [
            { id: 'all', name: 'All', active: true },
            { id: 'sportwear', name: 'Sportwear' },
            { id: 'running', name: 'Running' }
        ];

    if (loading) {
        return (
            <section className="trending-section py-5">
                <div className="container">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="trending-section py-5">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">{isSpanish ? 'Tendencias' : 'Trending Now'}</h2>
                    <div className="category-filter mt-4">
                        {categories.map((cat) => (
                            <button 
                                key={cat.id}
                                className={`filter-btn ${cat.active ? 'active' : ''}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="row g-4">
                    {products && products.slice(0, 8).map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product-card">
                                <div className="product-image">
                                    <Link legacyBehavior href={`/shop/product-details/${product.id}`}>
                                        <a>
                                            <img 
                                                src={product.images?.[0]?.src || '/assets/img/placeholder.jpg'} 
                                                alt={product.name}
                                                className="img-fluid"
                                            />
                                            {product.images?.[1] && (
                                                <img 
                                                    src={product.images[1].src} 
                                                    alt={product.name}
                                                    className="img-fluid hover-image"
                                                />
                                            )}
                                        </a>
                                    </Link>
                                    <div className="product-actions">
                                        <button className="action-btn" title="Add to wishlist">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z" fill="currentColor"/>
                                            </svg>
                                        </button>
                                        <button className="action-btn" title="Quick view">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M10 4C4 4 1 10 1 10C1 10 4 16 10 16C16 16 19 10 19 10C19 10 16 4 10 4Z" stroke="currentColor" strokeWidth="1.5"/>
                                                <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                                            </svg>
                                        </button>
                                    </div>
                                    {product.on_sale && (
                                        <span className="badge-sale">SALE</span>
                                    )}
                                </div>
                                <div className="product-info">
                                    {product.categories?.[0] && (
                                        <span className="product-brand">{product.categories[0].name}</span>
                                    )}
                                    <h6 className="product-title">
                                        <Link legacyBehavior href={`/shop/product-details/${product.id}`}>
                                            <a>{product.name}</a>
                                        </Link>
                                    </h6>
                                    <div className="product-price">
                                        {product.on_sale ? (
                                            <>
                                                <span className="regular-price">${product.regular_price}</span>
                                                <span className="sale-price">${product.sale_price}</span>
                                            </>
                                        ) : (
                                            <span className="price">${product.price}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .trending-section {
                    background: #f8f9fa;
                }

                .section-title {
                    font-size: 36px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    color: #000;
                    margin: 0;
                }

                .category-filter {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                }

                .filter-btn {
                    padding: 8px 24px;
                    border: none;
                    background: transparent;
                    font-size: 14px;
                    font-weight: 600;
                    color: #666;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .filter-btn:after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 2px;
                    background: #000;
                    transition: width 0.3s ease;
                }

                .filter-btn:hover,
                .filter-btn.active {
                    color: #000;
                }

                .filter-btn.active:after {
                    width: 100%;
                }

                .product-card {
                    background: #fff;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .product-card:hover {
                    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                    transform: translateY(-4px);
                }

                .product-image {
                    position: relative;
                    overflow: hidden;
                    aspect-ratio: 3/4;
                }

                .product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all 0.3s ease;
                }

                .product-image .hover-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                }

                .product-card:hover .hover-image {
                    opacity: 1;
                }

                .product-actions {
                    position: absolute;
                    bottom: 20px;
                    left: 50%;
                    transform: translateX(-50%) translateY(20px);
                    display: flex;
                    gap: 10px;
                    opacity: 0;
                    transition: all 0.3s ease;
                }

                .product-card:hover .product-actions {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }

                .action-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .action-btn:hover {
                    background: #000;
                    color: #fff;
                }

                .badge-sale {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: #ff4444;
                    color: #fff;
                    padding: 4px 12px;
                    font-size: 12px;
                    font-weight: 600;
                    border-radius: 4px;
                }

                .product-info {
                    padding: 20px;
                }

                .product-brand {
                    display: block;
                    font-size: 12px;
                    font-weight: 600;
                    color: #999;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }

                .product-title {
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 12px;
                    min-height: 40px;
                }

                .product-title a {
                    color: #333;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .product-title a:hover {
                    color: #000;
                }

                .product-price {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .price,
                .sale-price {
                    font-size: 16px;
                    font-weight: 700;
                    color: #000;
                }

                .regular-price {
                    font-size: 14px;
                    color: #999;
                    text-decoration: line-through;
                }

                @media (max-width: 991px) {
                    .section-title {
                        font-size: 28px;
                    }
                }
            `}</style>
        </section>
    );
};

export default TrendingNow;
