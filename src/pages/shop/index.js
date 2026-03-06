import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [activeColumn, setActiveColumn] = useState('column-4');
  const [sortKey, setSortKey] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('');

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
      per_page: 24,
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
                    <Link legacyBehavior href={`/shop/product/${product.id}`}>
                      <a>
                        <img src={image} alt={product.name} />
                      </a>
                    </Link>
                  </div>
                  <div className="top-product-content">
                    <h6>
                      <Link legacyBehavior href={`/shop/product/${product.id}`}>
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
          <div className="shop-columns-title-section mb-40">
            <p>
              {loading
                ? 'Loading products...'
                : `Showing ${products.length} product${products.length > 1 ? 's' : ''}`}
            </p>

            <div className="filter-selector">
              <div
                className="filter"
                ref={sidebarBtnRef}
                onClick={() => setIsOpenSidebar((prev) => !prev)}
              >
                <div className="filter-icon">
                  <i className="bi bi-sliders" />
                </div>
                <span>Filters</span>
              </div>

              <div className="selector">
                <select
                  className="shop-sort-select"
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="price_low">Price Low to High</option>
                  <option value="price_high">Price High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              <ul className="grid-view">
                <li className={activeColumn === 'column-2' ? 'active' : ''} onClick={() => setActiveColumn('column-2')}>
                  2
                </li>
                <li className={activeColumn === 'column-3' ? 'active' : ''} onClick={() => setActiveColumn('column-3')}>
                  3
                </li>
                <li className={activeColumn === 'column-4' ? 'active' : ''} onClick={() => setActiveColumn('column-4')}>
                  4
                </li>
              </ul>
            </div>
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

              {!loading && !error && products.length === 0 && (
                <div className="col-12 text-center py-5">
                  <p>No products available.</p>
                </div>
              )}

              {!loading && !error && products.map((product, index) => (
                <div key={product.id} className={gridColumnClass}>
                  <ProductCard product={product} showCountdown={index === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProductViewModal />

      <style jsx>{`
        .shop-sort-select {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 8px 10px;
          font-size: 14px;
          min-width: 180px;
          background: #fff;
          cursor: pointer;
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
      `}</style>
    </>
  );
};

export default ShopPage;
