import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ProductViewModal from '@/src/components/common/ProductViewModal';
import ProductCard from '@/src/components/common/ProductCard';
import { useProducts } from '@/src/hooks/useProducts';
import { useCategories } from '@/src/hooks/useCategories';
import { formatUSDPrice } from '@/src/lib/pricing';

const SORT_PRESETS = {
  newest: { orderby: 'date', order: 'desc' },
  oldest: { orderby: 'date', order: 'asc' },
  price_low: { orderby: 'price', order: 'asc' },
  price_high: { orderby: 'price', order: 'desc' },
  popular: { orderby: 'popularity', order: 'desc' },
};

const ShopPage = () => {
  const router = useRouter();
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [activeColumn] = useState('column-4');
  const [sortKey, setSortKey] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const supportedLocales = ['es', 'de', 'fr', 'it', 'pt'];
  const localeSegment = router.pathname.split('/')[1];
  const localePrefix = supportedLocales.includes(localeSegment) ? `/${localeSegment}` : '';

  const sidebarRef = useRef(null);
  const sidebarBtnRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpenSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarBtnRef.current &&
        !sidebarBtnRef.current.contains(event.target)
      ) {
        setIsOpenSidebar(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpenSidebar]);

  const sortPreset = SORT_PRESETS[sortKey] || SORT_PRESETS.newest;

  const productParams = useMemo(() => {
    const params = {
      all: true,
      orderby: sortPreset.orderby,
      order: sortPreset.order,
    };

    if (selectedCategory) {
      params.category = selectedCategory;
    }

    return params;
  }, [selectedCategory, sortPreset.order, sortPreset.orderby]);

  const { products, loading, error } = useProducts(productParams);
  const { categories } = useCategories({ per_page: 100, hide_empty: true });

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      const haystack = [
        product.name,
        product.slug,
        product.short_description,
        product.description,
        ...(product.categories || []).map((category) => category.name || category),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [products, searchQuery]);

  const visibleCategories = useMemo(() => {
    return categories.filter((category) => Number(category.count || 0) > 0).slice(0, 8);
  }, [categories]);

  const totalCategoryCount = useMemo(() => {
    return visibleCategories.reduce((total, category) => total + Number(category.count || 0), 0);
  }, [visibleCategories]);

  const topProducts = useMemo(() => products.slice(0, 3), [products]);

  const gridColumnClass =
    activeColumn === 'column-2'
      ? 'col-sm-6'
      : activeColumn === 'column-3'
        ? 'col-md-4'
        : 'col-lg-3';

  return (
    <>
      <div className={`filter-sidebar ${isOpenSidebar ? 'slide' : ''}`} ref={sidebarRef}>
        <div className="sidebar-area">
          <div className="shop-widget mb-30">
            <div className="check-box-item">
              <h5 className="shop-widget-title">Categories</h5>
              <ul className="shop-item">
                <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory('');
                    }}
                  >
                    All Products
                  </a>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory(String(category.id));
                      }}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="shop-widget">
            <h5 className="shop-widget-title">Top Products</h5>
            {topProducts.map((product) => {
              const image = product.images?.[0]?.src || '/assets/img/placeholder.png';
              return (
                <div className="top-product-widget mb-20" key={product.id}>
                  <div className="top-product-img">
                    <Link legacyBehavior href={`${localePrefix}/shop/product/${product.id}`}>
                      <a>
                        <img src={image} alt={product.name} />
                      </a>
                    </Link>
                  </div>
                  <div className="top-product-content">
                    <h6>
                      <Link legacyBehavior href={`${localePrefix}/shop/product/${product.id}`}>
                        <a>{product.name}</a>
                      </Link>
                    </h6>
                    <span>{formatUSDPrice(product.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="shop-list-section mt-110 mb-110">
        <div className="container-lg container-fluid">
          <div className="dosalga-filter-bar mb-40">
            <p className="dosalga-filter-count">
              {loading
                ? 'Cargando productos...'
                : `Mostrando ${visibleProducts.length} producto${visibleProducts.length === 1 ? '' : 's'}`}
            </p>

            <div className="dosalga-filter-tools">
              <input
                type="search"
                className="dosalga-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar producto, categoría..."
                aria-label="Buscar productos"
              />

              <div className="selector mb-0">
                <select
                  className="shop-sort-select"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <option value="newest">Más reciente</option>
                  <option value="oldest">Más antiguo</option>
                  <option value="price_low">Precio: menor a mayor</option>
                  <option value="price_high">Precio: mayor a menor</option>
                  <option value="popular">Más populares</option>
                </select>
              </div>
            </div>
          </div>

          <div className="dosalga-category-row mb-35">
            <button
              type="button"
              className={`dosalga-chip ${selectedCategory ? '' : 'is-active'}`}
              onClick={() => setSelectedCategory('')}
            >
              Todos ({totalCategoryCount || products.length})
            </button>

            {visibleCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`dosalga-chip ${String(category.id) === selectedCategory ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(String(category.id))}
              >
                {category.name} ({category.count})
              </button>
            ))}

            <button
              type="button"
              className="dosalga-chip dosalga-chip--filter"
              ref={sidebarBtnRef}
              onClick={() => setIsOpenSidebar((prev) => !prev)}
            >
              <i className="bi bi-sliders" /> Filtros
            </button>
          </div>

          {error && (
            <div className="alert alert-danger mb-4">Error loading products: {error}</div>
          )}

          <div className="all-products list-grid-product-wrap">
            <div className="row gy-4 mb-80">
              {loading && (
                <div className="col-12 text-center py-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              {!loading && !error && visibleProducts.length === 0 && (
                <div className="col-12 text-center py-5">
                  <p>No hay productos disponibles.</p>
                </div>
              )}

              {!loading && !error && visibleProducts.map((product, index) => (
                <div key={product.id} className={`${gridColumnClass} d-flex`}>
                  <ProductCard product={product} showCountdown={index === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProductViewModal />

      <style jsx>{`
        .dosalga-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .dosalga-filter-count {
          margin: 0;
          color: #8a8a8a;
          font-size: 16px;
          font-weight: 600;
        }

        .dosalga-filter-tools {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
          flex: 1;
        }

        .dosalga-search {
          width: min(360px, 100%);
          height: 52px;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 0 18px;
          font-size: 15px;
          outline: none;
        }

        .shop-sort-select {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 0 16px;
          font-size: 15px;
          min-width: 180px;
          height: 52px;
          background: #fff;
          cursor: pointer;
        }

        .dosalga-category-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .dosalga-chip {
          border: 1px solid #ddd;
          border-radius: 999px;
          background: #fff;
          color: #454545;
          padding: 12px 20px;
          font-weight: 700;
          line-height: 1;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .dosalga-chip.is-active {
          background: #151515;
          border-color: #151515;
          color: #fff;
        }

        .dosalga-chip--filter {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .grid-view li {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid #ddd;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 600;
        }

        .grid-view li.active {
          background: #111;
          border-color: #111;
          color: #fff;
        }

        @media (max-width: 767px) {
          .dosalga-filter-bar {
            align-items: stretch;
            flex-direction: column;
          }

          .dosalga-filter-tools {
            flex-direction: column;
            align-items: stretch;
          }

          .dosalga-search,
          .shop-sort-select {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default ShopPage;
