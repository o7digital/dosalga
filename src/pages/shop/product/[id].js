import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useProduct } from '@/src/hooks/useProducts';
import QuantityCounter from '@/src/uitils/QuantityCounter';
import { useCart } from '@/src/contexts/CartContext';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [actionStatus, setActionStatus] = useState(null);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Produit introuvable ou erreur de chargement
        </div>
      </div>
    );
  }

  const {
    name,
    price,
    regular_price,
    sale_price,
    description,
    short_description,
    attributes = [],
    default_attributes = [],
    images = [],
    categories = [],
    average_rating = 0,
    rating_count = 0,
    stock_status,
    on_sale,
    sku,
    variations = [],
    type = 'simple'
  } = product;

  const mainImages = images.length > 0 ? images : [{ src: '/assets/img/placeholder.png' }];
  const categoryName = categories[0]?.name || 'Produit';
  const variationAttributes = attributes.filter((attr) => attr.variation);

  const normalizeKey = (value) => (value || '').toLowerCase();

  useEffect(() => {
    if (variationAttributes.length === 0) {
      setSelectedOptions({});
      return;
    }

    const defaults = {};
    const firstVariation = variations?.[0];

    variationAttributes.forEach((attr) => {
      const key = normalizeKey(attr.slug || attr.name);
      const defaultAttr = default_attributes.find(
        (def) => normalizeKey(def.name) === key || normalizeKey(def.slug) === key
      );
      const variationAttr = firstVariation?.attributes?.find(
        (item) => normalizeKey(item.slug || item.name) === key
      );

      const option = defaultAttr?.option || variationAttr?.option || attr.options?.[0];
      if (option) {
        defaults[key] = option;
      }
    });

    setSelectedOptions(defaults);
    setActionStatus(null);
    setQuantity(1);
  }, [product?.id, variations]);

  const activeVariation = useMemo(() => {
    if (!variations || variations.length === 0 || variationAttributes.length === 0) {
      return null;
    }

    return (
      variations.find((variation) =>
        variationAttributes.every((attr) => {
          const key = normalizeKey(attr.slug || attr.name);
          const selectedValue = selectedOptions[key];
          if (!selectedValue) return false;

          const variationAttr = variation.attributes.find((item) => {
            const variationKey = normalizeKey(item.slug || item.name);
            return variationKey === key;
          });

          return variationAttr?.option === selectedValue;
        })
      ) || null
    );
  }, [variations, variationAttributes, selectedOptions]);

  const formatPrice = (value) => {
    const priceNumber = parseFloat(value);
    if (Number.isNaN(priceNumber)) return null;
    return `${priceNumber.toFixed(2)}€`;
  };

  const resolvedPrice = activeVariation?.price || sale_price || price || regular_price;
  const resolvedRegularPrice = activeVariation?.regular_price || regular_price;
  const showSale = resolvedRegularPrice &&
    resolvedPrice &&
    parseFloat(resolvedPrice) < parseFloat(resolvedRegularPrice);

  // Générer les étoiles
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(average_rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i key={i} className={i < fullStars ? "bi bi-star-fill" : "bi bi-star"} />
      );
    }
    return stars;
  };

  const handleOptionSelect = (attrKey, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [normalizeKey(attrKey)]: option
    }));
    setActionStatus(null);
  };

  const handleAddToCart = () => {
    if (stock_status !== 'instock') return;

    if (type === 'variable') {
      if (!activeVariation) {
        alert('Sélectionnez une combinaison avant de continuer.');
        return;
      }

      if (activeVariation.stock_status === 'outofstock') {
        alert('Cette variation est en rupture de stock.');
        return;
      }

      addToCart(
        {
          ...product,
          price: parseFloat(activeVariation.price || resolvedPrice || 0),
          stock_status: activeVariation.stock_status
        },
        quantity,
        {
          id: activeVariation.id,
          price: parseFloat(activeVariation.price || resolvedPrice || 0),
          attributes: activeVariation.attributes
        }
      );
    } else {
      addToCart(
        {
          ...product,
          price: parseFloat(resolvedPrice || price || 0)
        },
        quantity
      );
    }

    setActionStatus('added');
  };

  return (
    <>
      <Head>
        <title>{name} - DOSALGA</title>
        <meta name="description" content={short_description || description} />
      </Head>

      <div className="shop-details-page pt-120 mb-120">
        <div className="container">
          <div className="row gy-5">
            {/* Images du produit */}
            <div className="col-lg-6">
              <div className="shop-details-img">
                <div className="tab-content" id="pills-tabContent">
                  {mainImages.map((img, index) => (
                    <div
                      key={index}
                      className={`tab-pane fade ${selectedImage === index ? 'show active' : ''}`}
                      id={`pills-img${index}`}
                      role="tabpanel"
                    >
                      <div className="shop-details-tab-img">
                        <img src={img.src} alt={img.alt || name} />
                      </div>
                    </div>
                  ))}
                </div>
                
                {mainImages.length > 1 && (
                  <div className="nav nav-pills" id="pills-tab" role="tablist">
                    {mainImages.map((img, index) => (
                      <button
                        key={index}
                        className={`nav-link ${selectedImage === index ? 'active' : ''}`}
                        onClick={() => setSelectedImage(index)}
                        type="button"
                      >
                        <img src={img.src} alt={img.alt || name} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Détails du produit */}
            <div className="col-lg-6">
              <div className="shop-details-content">
                <h1>{name}</h1>
                
                {/* Note et avis */}
                {rating_count > 0 && (
                  <div className="rating-review">
                    <div className="rating">
                      <div className="star">{renderStars()}</div>
                      <p>({rating_count} avis client{rating_count > 1 ? 's' : ''})</p>
                    </div>
                  </div>
                )}

                {/* Description courte */}
                {short_description && (
                  <div
                    className="short-description"
                    dangerouslySetInnerHTML={{ __html: short_description }}
                  />
                )}

                {/* Prix */}
                <div className="price-area">
                  <p className="price">
                    {showSale ? (
                      <>
                        {formatPrice(resolvedPrice)}
                        {' '}
                        <del>{formatPrice(resolvedRegularPrice)}</del>
                      </>
                    ) : formatPrice(resolvedPrice) || (
                      <span className="text-muted">Prix indisponible</span>
                    )}
                  </p>
                </div>

                {/* Stock status */}
                {stock_status === 'outofstock' && (
                  <div className="alert alert-warning">
                    Rupture de stock
                  </div>
                )}

                {/* Quantité et variations */}
                <div className="quantity-color-area">
                  <div className="quantity-color">
                    <h6 className="widget-title">Quantité</h6>
                    <QuantityCounter value={quantity} onChange={setQuantity} />
                  </div>
                </div>

                {variationAttributes.length > 0 && (
                  <div className="variation-area mt-3">
                    {variationAttributes.map((attr) => {
                      const key = normalizeKey(attr.slug || attr.name);
                      return (
                        <div key={key} className="variation-group mb-3">
                          <h6 className="widget-title">{attr.name}</h6>
                          <div className="variation-options d-flex flex-wrap gap-2">
                            {attr.options?.map((option) => (
                              <button
                                key={option}
                                type="button"
                                className={`btn btn-outline-dark btn-sm ${selectedOptions[key] === option ? 'active' : ''}`}
                                onClick={() => handleOptionSelect(key, option)}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Boutons d'action */}
                {stock_status === 'instock' && (
                  <div className="shop-details-btn">
                    <a
                      href="#"
                      className="primary-btn1 hover-btn3"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart();
                      }}
                    >
                      *Acheter maintenant*
                    </a>
                    <a
                      href="#"
                      className="primary-btn1 style-3 hover-btn4"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart();
                      }}
                    >
                      *Ajouter au panier*
                    </a>
                  </div>
                )}
                {actionStatus === 'added' && (
                  <div className="mt-2 text-success">
                    Article ajouté au panier.
                  </div>
                )}

                {/* Informations produit */}
                <div className="product-info">
                  <ul className="product-info-list">
                    {sku && <li><span>SKU:</span> {sku}</li>}
                    {categories.length > 0 && (
                      <li>
                        <span>Catégorie:</span>{' '}
                        {categories.map((cat, index) => (
                          <React.Fragment key={cat.id}>
                            <Link legacyBehavior href={`/category/${cat.slug}`}>
                              <a>{cat.name}</a>
                            </Link>
                            {index < categories.length - 1 && ', '}
                          </React.Fragment>
                        ))}
                      </li>
                    )}
                  </ul>
                </div>

                {/* Méthodes de paiement */}
                <div className="payment-method">
                  <h6>Paiement sécurisé</h6>
                  <ul className="payment-card-list">
                    <li><img src="/assets/img/inner-page/payment-img1.svg" alt="Visa" /></li>
                    <li><img src="/assets/img/inner-page/payment-img2.svg" alt="Mastercard" /></li>
                    <li><img src="/assets/img/inner-page/payment-img3.svg" alt="PayPal" /></li>
                    <li><img src="/assets/img/inner-page/payment-img4.svg" alt="Apple Pay" /></li>
                  </ul>
                </div>

                {/* Actions wishlist */}
                <div className="compare-wishlist-area">
                  <ul>
                    <li>
                      <Link legacyBehavior href="/shop/whistlist">
                        <a>
                          <span>
                            <svg width={11} height={11} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_168_378)">
                                <path d="M16.528 2.20919C16.0674 1.71411 15.5099 1.31906 14.8902 1.04859C14.2704 0.778112 13.6017 0.637996 12.9255 0.636946C12.2487 0.637725 11.5794 0.777639 10.959 1.048C10.3386 1.31835 9.78042 1.71338 9.31911 2.20854L9.00132 2.54436L8.68352 2.20854C6.83326 0.217151 3.71893 0.102789 1.72758 1.95306C1.63932 2.03507 1.5541 2.12029 1.47209 2.20854C-0.490696 4.32565 -0.490696 7.59753 1.47209 9.71463L8.5343 17.1622C8.77862 17.4201 9.18579 17.4312 9.44373 17.1868C9.45217 17.1788 9.46039 17.1706 9.46838 17.1622L16.528 9.71463C18.4907 7.59776 18.4907 4.32606 16.528 2.20919ZM15.5971 8.82879H15.5965L9.00132 15.7849L2.40553 8.82879C0.90608 7.21113 0.90608 4.7114 2.40553 3.09374C3.76722 1.61789 6.06755 1.52535 7.5434 2.88703C7.61505 2.95314 7.68401 3.0221 7.75012 3.09374L8.5343 3.92104C8.79272 4.17781 9.20995 4.17781 9.46838 3.92104L10.2526 3.09438C11.6142 1.61853 13.9146 1.52599 15.3904 2.88767C15.4621 2.95378 15.531 3.02274 15.5971 3.09438C17.1096 4.71461 17.1207 7.2189 15.5971 8.82879Z" />
                              </g>
                            </svg>
                          </span>
                          Ajouter à la wishlist
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Description complète */}
          {description && (
            <div className="row mt-5">
              <div className="col-12">
                <div className="product-description">
                  <h3>Description</h3>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
