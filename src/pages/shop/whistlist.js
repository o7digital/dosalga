import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useWishlist } from '@/src/contexts/WishlistContext';

const formatPriceUSD = (value) => {
  const numeric = Number.parseFloat(value);
  if (!Number.isFinite(numeric)) return '';
  return `$${numeric.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} USD`;
};

const Whistlist = () => {
  const { items, remove } = useWishlist();
  const router = useRouter();
  const isSpanish = router.pathname.startsWith('/es');

  return (
    <div className="whistlist-section mt-110 mb-110">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="whistlist-table">
              {items.length === 0 ? (
                <div className="text-center py-5">
                  <h4>{isSpanish ? 'Tu lista de deseos está vacía' : 'Your wishlist is empty'}</h4>
                  <p>{isSpanish ? 'Añade productos con el corazón para verlos aquí.' : 'Add products with the heart icon to see them here.'}</p>
                  <Link legacyBehavior href={isSpanish ? '/es/shop' : '/shop'}>
                    <a className="primary-btn1">{isSpanish ? 'Ver productos' : 'Browse products'}</a>
                  </Link>
                </div>
              ) : (
                <table className="eg-table2">
                  <thead>
                    <tr>
                      <th />
                      <th>Product</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const productUrl = `/shop/product/${item.id}`;
                      const mainImage = item.images?.[0]?.src || '/assets/img/placeholder.png';
                      const priceDisplay = item.sale_price
                        ? (
                          <>
                            <del>{formatPriceUSD(item.regular_price ?? item.price)}</del>
                            {formatPriceUSD(item.sale_price)}
                          </>
                        )
                        : formatPriceUSD(item.price ?? item.regular_price);

                      return (
                        <tr key={item.id}>
                          <td>
                            <button
                              className="delete-icon"
                              aria-label="Remove from wishlist"
                              onClick={() => remove(item.id)}
                            >
                              <i className="bi bi-x-lg" />
                            </button>
                          </td>
                          <td data-label="Product" className="table-product">
                            <div className="product-img">
                              <img src={mainImage} alt={item.name} />
                            </div>
                            <div className="product-content">
                              <h6>
                                <Link legacyBehavior href={productUrl}>
                                  <a>{item.name}</a>
                                </Link>
                              </h6>
                            </div>
                          </td>
                          <td data-label="Price">
                            <p className="price">
                              {priceDisplay}
                            </p>
                          </td>
                          <td data-label="Stock">
                            <span>{item.stock_status === 'instock' ? 'In Stock' : 'Out of stock'}</span>
                          </td>
                          <td>
                            <Link legacyBehavior href={productUrl}>
                              <a className="add-cart-btn hover-btn2">
                                <i className="bi bi-eye" /> View
                              </a>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whistlist;
