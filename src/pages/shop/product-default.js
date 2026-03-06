import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useProduct, useProducts } from '@/src/hooks/useProducts';
import { useCart } from '@/src/contexts/CartContext';
import { formatUSDPrice } from '@/src/lib/pricing';
import { toast } from 'react-toastify';

const htmlToPlainText = (html = '') => {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<img[^>]*>/gi, ' ')
    .replace(/<table[\s\S]*?<\/table>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const ProductDefaultPage = () => {
  const router = useRouter();
  const { addToCart } = useCart();

  const queryId = Array.isArray(router.query.id) ? router.query.id[0] : router.query.id;
  const { products: fallbackProducts } = useProducts({ per_page: 1, orderby: 'date', order: 'desc' });
  const resolvedId = queryId || fallbackProducts[0]?.id;

  const { product, loading, error } = useProduct(resolvedId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setSelectedSize(null);
  }, [resolvedId]);

  useEffect(() => {
    // Ensure page scroll remains enabled even if a previous modal left the body locked
    if (typeof document === 'undefined') return;

    const html = document.documentElement;
    const body = document.body;

    body.classList.remove('modal-open');
    body.style.overflow = '';
    body.style.overflowY = 'auto';
    body.style.paddingRight = '';

    html.style.overflow = '';
    html.style.overflowY = 'auto';
  }, []);

  const sizeOptions = useMemo(() => {
    const attrs = Array.isArray(product?.attributes) ? product.attributes : [];
    const sizeAttr = attrs.find(
      (attr) =>
        attr?.name?.toLowerCase().includes('size') ||
        attr?.slug === 'pa_size' ||
        attr?.slug === 'size'
    );

    if (Array.isArray(sizeAttr?.options) && sizeAttr.options.length > 0) {
      return sizeAttr.options;
    }

    return [];
  }, [product?.attributes]);

  const images = Array.isArray(product?.images) && product.images.length > 0
    ? product.images
    : [{ src: '/assets/img/placeholder.png', alt: product?.name || 'Product image' }];

  const currentImage = images[selectedImage] || images[0];
  const ratingCount = Number.parseInt(product?.rating_count || 0, 10);
  const ratingValue = Number.parseFloat(product?.average_rating || 0);
  const productSummary = useMemo(() => {
    const text = htmlToPlainText(product?.short_description || product?.description || '');
    if (!text) return '';
    return text.length > 260 ? `${text.slice(0, 260).trim()}...` : text;
  }, [product?.description, product?.short_description]);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    for (let i = 0; i < 5; i += 1) {
      stars.push(<i key={i} className={i < fullStars ? 'bi bi-star-fill' : 'bi bi-star'} />);
    }
    return stars;
  };

  const handleAddToCart = () => {
    if (!product) return false;

    if (sizeOptions.length > 0 && !selectedSize) {
      toast.warn('Please select a size before adding to cart.');
      return false;
    }

    const variation = selectedSize ? { size: selectedSize } : null;
    addToCart(product, quantity, variation);
    toast.success('Product added to cart.');
    return true;
  };

  const handleBuyNow = () => {
    const added = handleAddToCart();
    if (added) {
      router.push('/shop/checkout');
    }
  };

  if (loading || !resolvedId) {
    return (
      <div className="container py-5 mt-110 mb-110 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5 mt-110 mb-110">
        <div className="alert alert-danger mb-3">{error || 'Unable to load product.'}</div>
        <Link legacyBehavior href="/shop">
          <a className="primary-btn1">Back to shop</a>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="shop-details-top-section mt-110 mb-110">
        <div className="container-xl container-fluid-lg container">
          <div className="row gy-5">
            <div className="col-lg-6">
              <div className="shop-details-img">
                <div className="shop-details-tab-img product-img--main" style={{ overflow: 'hidden' }}>
                  <img src={currentImage.src} alt={currentImage.alt || product.name} />
                </div>

                {images.length > 1 && (
                  <div className="nav nav-pills product-thumbs" aria-orientation="vertical">
                    {images.map((img, index) => (
                      <button
                        key={img.id || index}
                        className={`nav-link ${selectedImage === index ? 'active' : ''}`}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                      >
                        <img src={img.src} alt={img.alt || product.name} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="shop-details-content">
                <h1>{product.name}</h1>

                <div className="rating-review">
                  <div className="rating">
                    <div className="star">{renderStars()}</div>
                    <p>({ratingCount} customer review{ratingCount > 1 ? 's' : ''})</p>
                  </div>
                </div>

                {productSummary && (
                  <p className="product-summary">{productSummary}</p>
                )}

                <div className="price-area">
                  <p className="price">
                    {product.on_sale && product.sale_price ? (
                      <>
                        {formatUSDPrice(product.sale_price)} <del>{formatUSDPrice(product.regular_price)}</del>
                      </>
                    ) : (
                      formatUSDPrice(product.price)
                    )}
                  </p>
                </div>

                <div className="quantity-color-area">
                  <div className="quantity-color">
                    <h6 className="widget-title">Quantity</h6>
                    <div className="qty-wrap">
                      <button type="button" className="qty-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                      <span>{quantity}</span>
                      <button type="button" className="qty-btn" onClick={() => setQuantity((q) => q + 1)}>+</button>
                    </div>
                  </div>

                  {sizeOptions.length > 0 && (
                    <div className="quantity-color">
                      <h6 className="widget-title">Size</h6>
                      <div className="size-options">
                        {sizeOptions.map((size) => (
                          <button
                            key={size}
                            type="button"
                            className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                            onClick={() => setSelectedSize(size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="shop-details-btn">
                  <button type="button" onClick={handleAddToCart} className="primary-btn1 hover-btn3">Add to Cart</button>
                  <button type="button" onClick={handleBuyNow} className="primary-btn1 style-3 hover-btn4">Buy Now</button>
                </div>

                <div className="product-info">
                  <ul className="product-info-list">
                    {product.sku && <li><span>SKU:</span> {product.sku}</li>}
                    {Array.isArray(product.categories) && product.categories.length > 0 && (
                      <li>
                        <span>Category:</span>{' '}
                        {product.categories.map((category, index) => (
                          <React.Fragment key={category.id || category.slug || index}>
                            <Link legacyBehavior href="/shop">
                              <a>{category.name}</a>
                            </Link>
                            {index < product.categories.length - 1 ? ', ' : ''}
                          </React.Fragment>
                        ))}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shop-details-img {
          display: grid;
          grid-template-columns: 84px minmax(0, 1fr);
          grid-template-areas: 'thumbs main';
          align-items: start;
          justify-content: stretch;
          gap: 18px;
        }

        .product-img--main {
          grid-area: main;
          width: 100%;
          float: none;
        }

        .product-img--main img {
          display: block;
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .product-thumbs {
          grid-area: thumbs;
          position: static;
          left: auto;
          top: auto;
          flex-direction: column;
          display: flex;
          gap: 10px;
          margin-top: 0;
          flex-wrap: nowrap;
          max-height: 640px;
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 4px;
          align-self: start;
          scrollbar-width: thin;
        }

        .product-thumbs .nav-link {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 4px;
          background: #fff;
          line-height: 0;
          margin-bottom: 0;
          width: 80px;
          height: 80px;
          flex: 0 0 auto;
        }

        .product-thumbs .nav-link.active {
          border-color: #111;
        }

        .product-thumbs img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 991px) {
          .shop-details-img {
            grid-template-columns: 1fr;
            grid-template-areas:
              'main'
              'thumbs';
          }

          .product-thumbs {
            flex-direction: row;
            flex-wrap: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            max-height: none;
            padding-right: 0;
            padding-bottom: 6px;
          }
        }

        @media (max-width: 576px) {
          .shop-details-img {
            gap: 12px;
          }

          .product-thumbs .nav-link {
            width: 68px;
            height: 68px;
          }
        }

        .qty-wrap {
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .product-summary {
          margin: 10px 0 18px;
          color: #666;
          line-height: 1.7;
        }

        .qty-btn {
          width: 30px;
          height: 30px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
        }

        .size-options {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .size-chip {
          border: 1px solid #ddd;
          border-radius: 4px;
          background: #fff;
          padding: 6px 10px;
          cursor: pointer;
        }

        .size-chip.active {
          border-color: #111;
          background: #111;
          color: #fff;
        }

        .shop-details-btn button {
          border: none;
          cursor: pointer;
        }
      `}</style>
      <style jsx global>{`
        html,
        body {
          overflow-y: auto !important;
        }
      `}</style>
    </>
  );
};

export default ProductDefaultPage;
