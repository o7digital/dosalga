import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useProducts } from '../../hooks/useProducts';
import { useRouter } from 'next/router';

const TrendingNow = () => {
    const { products, loading, error } = useProducts({ limit: 12 });
    const { pathname } = useRouter();
    const isSpanish = pathname.startsWith('/es');

    const [sortOption, setSortOption] = useState('most-expensive');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const sortOptions = isSpanish
        ? [
            { id: 'most-expensive', label: 'Más caro' },
            { id: 'least-expensive', label: 'Menos caro' },
            { id: 'top-rated', label: '+ calificaciones' }
        ]
        : [
            { id: 'most-expensive', label: 'Most expensive' },
            { id: 'least-expensive', label: 'Least expensive' },
            { id: 'top-rated', label: 'Top rated' }
        ];

    // Priorité aux 3 familles demandées
    const fallbackCategories = ['clothes', 'fitness', 'bikes'];

    const formatCategoryLabel = (value) => {
        if (!value) return '';
        const formatted = value.replace(/[-_]/g, ' ');
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    };

    const productCategories = useMemo(() => {
        const seen = new Set();
        const dynamic = (Array.isArray(products) ? products : []).flatMap((product) =>
            (product.categories || []).map((cat) => {
                const slug = cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-');
                const id = slug || 'misc';
                return {
                    id,
                    label: cat.name || formatCategoryLabel(id)
                };
            })
        );

        const ordered = [];

        // Add fallback categories first to keep requested order (Clothes, Fitness, Bikes)
        fallbackCategories.forEach((slug) => {
            if (seen.has(slug)) return;
            seen.add(slug);
            ordered.push({ id: slug, label: formatCategoryLabel(slug) });
        });

        // Add dynamic categories from WooCommerce afterwards
        dynamic.forEach((cat) => {
            if (seen.has(cat.id)) return;
            seen.add(cat.id);
            ordered.push(cat);
        });

        return [{ id: 'all', label: isSpanish ? 'Todos' : 'All' }, ...ordered];
    }, [products, isSpanish]);

    const parsePriceValue = (value) => {
        const raw = String(value ?? '').trim();
        if (!raw) return null;
        const normalized = raw.includes(',') && !raw.includes('.')
            ? raw.replace(',', '.')
            : raw.replace(/,/g, '');
        const numeric = Number(normalized);
        return Number.isFinite(numeric) ? numeric : null;
    };

    const MXN_TO_USD_RATE = 18.5;
    const formatPrice = (value) => {
        const numeric = parsePriceValue(value);
        if (numeric === null) return '';
        const usd = numeric / MXN_TO_USD_RATE;
        return `$${usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    };

    const filteredProducts = useMemo(() => {
        const source = Array.isArray(products) ? [...products] : [];

        const byCategory = selectedCategory === 'all'
            ? source
            : source.filter((product) =>
                product.categories?.some((cat) => {
                    const slug = cat.slug?.toLowerCase();
                    const name = cat.name?.toLowerCase();
                    const sel = selectedCategory.toLowerCase();
                    return slug === sel
                        || name === sel
                        || slug?.includes(sel)
                        || name?.includes(sel);
                })
            );

        const sorted = [...byCategory].sort((a, b) => {
            const priceA = parsePriceValue(a.sale_price ?? a.price ?? a.regular_price ?? 0) ?? 0;
            const priceB = parsePriceValue(b.sale_price ?? b.price ?? b.regular_price ?? 0) ?? 0;
            const ratingA = Number(a.average_rating ?? 0);
            const ratingB = Number(b.average_rating ?? 0);

            if (sortOption === 'most-expensive') return priceB - priceA;
            if (sortOption === 'least-expensive') return priceA - priceB;
            if (sortOption === 'top-rated') return ratingB - ratingA;
            return 0;
        });

        return sorted.slice(0, 12);
    }, [products, selectedCategory, sortOption]);

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
                <div className="section-header mb-4">
                    <h2 className="section-title">{isSpanish ? 'Nuestros mejores productos' : 'Our Best Products'}</h2>
                    <p className="section-subtitle">
                        {isSpanish
                            ? 'Explora nuestra selección ordenada por precio o calificaciones.'
                            : 'Explore our handpicked products sorted by price or ratings.'}
                    </p>
                </div>

                <div className="row g-4">
                    <div className="col-lg-3">
                        <div className="filters-card">
                            <h4 className="filters-title">{isSpanish ? 'Filtros' : 'Filters'}</h4>

                            <div className="filter-group">
                                <h5>{isSpanish ? 'Ordenar' : 'Sort by'}</h5>
                                <div className="filter-options">
                                    {sortOptions.map((option) => (
                                        <label key={option.id} className={`filter-option ${sortOption === option.id ? 'active' : ''}`}>
                                            <input
                                                type="radio"
                                                name="sort"
                                                value={option.id}
                                                checked={sortOption === option.id}
                                                onChange={() => setSortOption(option.id)}
                                            />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group">
                                <h5>{isSpanish ? 'Categorías' : 'Categories'}</h5>
                                <div className="category-chips">
                                    {productCategories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            className={`chip ${selectedCategory === cat.id ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory(cat.id)}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        {error && (
                            <div className="alert alert-danger mb-3" role="alert">
                                {error}
                            </div>
                        )}
                        <div className="row g-4">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="col-lg-4 col-md-6">
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
                                                <button className="action-btn" title={isSpanish ? 'Añadir a la lista de deseos' : 'Add to wishlist'}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z" fill="currentColor"/>
                                                    </svg>
                                                </button>
                                                <button className="action-btn" title={isSpanish ? 'Vista rápida' : 'Quick view'}>
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                        <path d="M10 4C4 4 1 10 1 10C1 10 4 16 10 16C16 16 19 10 19 10C19 10 16 4 10 4Z" stroke="currentColor" strokeWidth="1.5"/>
                                                        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            {product.on_sale && (
                                                <span className="badge-sale">{isSpanish ? 'OFERTA' : 'SALE'}</span>
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
                                            <div className="product-price">
                                                {product.on_sale ? (
                                                    <>
                                                        <span className="regular-price">{formatPrice(product.regular_price)}</span>
                                                        <span className="sale-price">{formatPrice(product.sale_price)}</span>
                                                    </>
                                                ) : (
                                                    <span className="price">{formatPrice(product.price)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .trending-section {
                    background: #f8f9fa;
                }

                .section-header {
                    text-align: left;
                }

                .section-title {
                    font-size: 34px;
                    font-weight: 700;
                    margin: 0;
                    letter-spacing: 0.5px;
                }

                .section-subtitle {
                    margin-top: 10px;
                    color: #666;
                    font-size: 15px;
                }

                .filters-card {
                    background: #fff;
                    border-radius: 12px;
                    padding: 24px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.06);
                    position: sticky;
                    top: 20px;
                }

                .filters-title {
                    margin: 0 0 16px 0;
                    font-size: 18px;
                    font-weight: 700;
                }

                .filter-group {
                    margin-bottom: 24px;
                }

                .filter-group h5 {
                    font-size: 14px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: #333;
                }

                .filter-options {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .filter-option {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px 12px;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 14px;
                    color: #444;
                }

                .filter-option input {
                    accent-color: #000;
                }

                .filter-option.active {
                    border-color: #000;
                    background: #f3f4f6;
                    font-weight: 700;
                }

                .category-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .chip {
                    border: 1px solid #e5e7eb;
                    background: #fff;
                    padding: 8px 14px;
                    border-radius: 20px;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .chip.active {
                    background: #000;
                    color: #fff;
                    border-color: #000;
                }

                .product-card {
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.06);
                }

                .product-card:hover {
                    box-shadow: 0 14px 40px rgba(0,0,0,0.1);
                    transform: translateY(-4px);
                }

                .product-image {
                    position: relative;
                    overflow: hidden;
                    aspect-ratio: 3/4;
                    background: #f7f7f7;
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
                    bottom: 16px;
                    right: 16px;
                    display: flex;
                    gap: 10px;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.3s ease;
                }

                .product-card:hover .product-actions {
                    opacity: 1;
                    transform: translateY(0);
                }

                .action-btn {
                    width: 38px;
                    height: 38px;
                    border-radius: 50%;
                    border: none;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
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
                    font-weight: 700;
                    border-radius: 4px;
                }

                .product-info {
                    padding: 18px;
                }

                .product-brand {
                    display: block;
                    font-size: 12px;
                    font-weight: 700;
                    color: #999;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }

                .product-title {
                    font-size: 14px;
                    font-weight: 700;
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
                    font-weight: 800;
                    color: #000;
                }

                .regular-price {
                    font-size: 14px;
                    color: #999;
                    text-decoration: line-through;
                }

                @media (max-width: 991px) {
                    .filters-card {
                        position: static;
                    }
                }
            `}</style>
        </section>
    );
};

export default TrendingNow;
