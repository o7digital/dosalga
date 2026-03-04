import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GiftSection from '@/src/components/common/GiftSection';
import { useProduct, useProducts } from '@/src/hooks/useProducts';
import { useCart } from '@/src/contexts/CartContext';
import { toast } from 'react-toastify';

const formatUSD = (value) => {
  const numeric = Number.parseFloat(value || 0);
  if (!Number.isFinite(numeric)) return '$0.00';
  return `$${numeric.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setSelectedSize(null);
  }, [resolvedId]);

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
      router.push('/shop/cart');
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

                {product.short_description && (
                  <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
                )}

                <div className="price-area">
                  <p className="price">
                    {product.on_sale && product.sale_price ? (
                      <>
                        {formatUSD(product.sale_price)} <del>{formatUSD(product.regular_price)}</del>
                      </>
                    ) : (
                      formatUSD(product.price)
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

      <div className="shop-details-description mb-110">
        <div className="container-xl container-lg-fluid container">
          <div className="row">
            <div className="col-12">
              <div className="shop-details-description-nav mb-50">
                <nav>
                  <div className="nav nav-tabs">
                    <button className={`nav-link ${activeTab === 'description' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('description')}>Description</button>
                    <button className={`nav-link ${activeTab === 'add-info' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('add-info')}>Additional Information</button>
                    <button className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} type="button" onClick={() => setActiveTab('reviews')}>Reviews ({ratingCount})</button>
                  </div>
                </nav>
              </div>

              <div className="shop-details-description-tab">
                {activeTab === 'description' && (
                  <div className="tab-pane fade show active">
                    <div dangerouslySetInnerHTML={{ __html: product.description || 'No description available.' }} />
                  </div>
                )}

                {activeTab === 'add-info' && (
                  <div className="addithonal-information">
                    <table className="table total-table2">
                      <tbody>
                        <tr>
                          <td>SKU</td>
                          <td>{product.sku || '-'}</td>
                        </tr>
                        <tr>
                          <td>Stock</td>
                          <td>{product.stock_status || '-'}</td>
                        </tr>
                        <tr>
                          <td>Type</td>
                          <td>{product.type || '-'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="review-area">
                    <p>This product has {ratingCount} review{ratingCount > 1 ? 's' : ''}.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <GiftSection />

      <style jsx>{`
        .product-thumbs {
          display: flex;
          gap: 10px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .product-thumbs .nav-link {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 4px;
          background: #fff;
          line-height: 0;
        }

        .product-thumbs .nav-link.active {
          border-color: #111;
        }

        .product-thumbs img {
          width: 60px;
          height: 60px;
          object-fit: cover;
        }

        .qty-wrap {
          display: inline-flex;
          align-items: center;
          gap: 12px;
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
    </>
  );
};

export default ProductDefaultPage;
