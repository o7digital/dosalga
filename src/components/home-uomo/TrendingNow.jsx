import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useProducts } from '../../hooks/useProducts';
import { useRouter } from 'next/router';
import { useCart } from '../../contexts/CartContext';

const TrendingNow = () => {
    const { products, loading, error } = useProducts({ limit: 8 });
    const { pathname } = useRouter();
    const { addToCart } = useCart();
    const isSpanish = pathname.startsWith('/es');
    const [sortKey, setSortKey] = useState('recent');
    const sortOptions = isSpanish
        ? [
            { id: 'recent', label: 'Más reciente' },
            { id: 'priceDesc', label: 'Más caro' },
            { id: 'priceAsc', label: 'Más barato' },
            { id: 'rating', label: 'Mejores calificaciones' },
          ]
        : [
            { id: 'recent', label: 'Most Recent' },
            { id: 'priceDesc', label: 'Highest Price' },
            { id: 'priceAsc', label: 'Lowest Price' },
            { id: 'rating', label: 'Top Rated' },
          ];

    const parseNumber = (value) => {
        const n = Number(value);
        return Number.isNaN(n) ? 0 : n;
    };

    const renderStars = (rating = 0) => {
        const rounded = Math.round(rating);
        return (
            <span className="stars">
                {[0, 1, 2, 3, 4].map((idx) => (
                    <i key={idx} className={`bi ${idx < rounded ? 'bi-star-fill' : 'bi-star'}`} />
                ))}
            </span>
        );
    };

    const handleShare = (product) => {
        const origin = typeof window !== 'undefined' ? window.location.origin : 'https://dosalga.com';
        const url = product?.permalink || `${origin}/shop/product/${product?.id}`;
        const shareData = {
            title: product?.name,
            text: isSpanish ? 'Comparte este producto de Dosalga' : 'Share this Dosalga product',
            url,
        };

        if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share(shareData).catch(() => {});
        } else {
            const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            window.open(fbUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const sortedProducts = useMemo(() => {
        const items = [...(products || [])];
        return items
            .sort((a, b) => {
                switch (sortKey) {
                    case 'priceDesc':
                        return parseNumber(b.price) - parseNumber(a.price);
                    case 'priceAsc':
                        return parseNumber(a.price) - parseNumber(b.price);
                    case 'rating':
                        return parseNumber(b.average_rating) - parseNumber(a.average_rating);
                    case 'recent':
                    default:
                        return new Date(b.date_created) - new Date(a.date_created);
                }
            })
            .slice(0, 8);
    }, [products, sortKey]);

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
                    <h2 className="section-title">{isSpanish ? 'Descubre' : 'Explore'}</h2>
                    <div className="category-filter mt-4">
                        {sortOptions.map((option) => (
                            <button
                                key={option.id}
                                className={`filter-btn ${sortKey === option.id ? 'active' : ''}`}
                                onClick={() => setSortKey(option.id)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="row g-4">
                    {sortedProducts && sortedProducts.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                            <div className="product-card">
                                <div className="product-image">
                                    <Link legacyBehavior href={`/shop/product/${product.id}`}>
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
                                        <Link legacyBehavior href={`/shop/product/${product.id}`}>
                                            <a>{product.name}</a>
                                        </Link>
                                    </h6>
                                    <div className="product-rating">
                                        {renderStars(parseNumber(product.average_rating))}
                                        <span className="rating-count">
                                            ({product.rating_count || 0})
                                        </span>
                                    </div>
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
                                    <div className="product-cta">
                                        <Link legacyBehavior href={`/shop/product/${product.id}`}>
                                            <a className="cta-link">
                                                {isSpanish ? 'Ver producto' : 'View product'}
                                            </a>
                                        </Link>
                                        {product.stock_status === 'instock' ? (
                                            <button 
                                                className="cta-button"
                                                onClick={() => addToCart(product, 1)}
                                            >
                                                {isSpanish ? 'Comprar' : 'Buy'}
                                            </button>
                                        ) : (
                                            <span className="cta-badge">
                                                {isSpanish ? 'Agotado' : 'Out of stock'}
                                            </span>
                                        )}
                                        <button
                                            className="share-btn"
                                            onClick={() => handleShare(product)}
                                            title={isSpanish ? 'Compartir' : 'Share'}
                                            aria-label={isSpanish ? 'Compartir producto' : 'Share product'}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M15 8C16.6569 8 18 6.65685 18 5C18 3.34315 16.6569 2 15 2C13.3431 2 12 3.34315 12 5C12 6.65685 13.3431 8 15 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M9 14C10.6569 14 12 12.6569 12 11C12 9.34315 10.6569 8 9 8C7.34315 8 6 9.34315 6 11C6 12.6569 7.34315 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M15 22C16.6569 22 18 20.6569 18 19C18 17.3431 16.6569 16 15 16C13.3431 16 12 17.3431 12 19C12 20.6569 13.3431 22 15 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M13.5 6.5L10.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M10.5 12.5L13.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
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
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
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
                    flex-wrap: wrap;
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

                .product-rating {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    color: #555;
                }

                .stars i {
                    color: #e3b341;
                    margin-right: 2px;
                    font-size: 12px;
                }

                .rating-count {
                    color: #666;
                }

                .product-cta {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 10px;
                    margin-top: 6px;
                    flex-wrap: wrap;
                }

                .cta-link {
                    flex: 1 1 auto;
                    text-decoration: none;
                    color: #0d0d0d;
                    font-weight: 600;
                    border-bottom: 1px solid #0d0d0d;
                    padding-bottom: 2px;
                    transition: all 0.2s ease;
                    font-size: 14px;
                }

                .cta-link:hover {
                    color: #555;
                    border-color: #555;
                }

                .cta-button {
                    flex-shrink: 0;
                    border: none;
                    background: linear-gradient(135deg, #0f172a, #111827);
                    color: #fff;
                    padding: 10px 14px;
                    border-radius: 999px;
                    font-weight: 700;
                    font-size: 13px;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .cta-button:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 14px rgba(0,0,0,0.12);
                }

                .share-btn {
                    border: 1px solid #ddd;
                    background: #fff;
                    color: #333;
                    border-radius: 50%;
                    width: 36px;
                    height: 36px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .share-btn:hover {
                    background: #f5f5f5;
                    border-color: #ccc;
                }

                .cta-badge {
                    background: #f4f4f4;
                    border-radius: 999px;
                    padding: 8px 12px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #555;
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
